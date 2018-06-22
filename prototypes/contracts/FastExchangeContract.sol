pragma solidity ^0.4.19;


// ----------------------------------------------------------------------------
// Safe maths start
// ----------------------------------------------------------------------------
contract SafeMath {
    function safeAdd(uint a, uint b) public pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }
    function safeSub(uint a, uint b) public pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }
    function safeMul(uint a, uint b) public pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }
    function safeDiv(uint a, uint b) public pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}
// ----------------------------------------------------------------------------
// Safe maths end
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// Owned contract start
// ----------------------------------------------------------------------------
contract Owned {
    address public owner;
    address public newOwner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        require(_newOwner != address(0));
        newOwner = _newOwner;
    }
    function acceptOwnership() public {
        require(msg.sender == newOwner);
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        newOwner = address(0);
    }
}
// ----------------------------------------------------------------------------
// Owned contract end
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// FastExchange contract start
// ----------------------------------------------------------------------------
contract FastExchange is Owned, SafeMath {

    struct Transaction {
        address from;
        uint ethValue;
        uint estimatedTokenRate;
        uint receiveTime;
        uint executedTime;
        uint status; //0: pending; 1: processing; 2: success; -1: canceled ; -2: expried
    }
    
    uint public constant minEther = 0.1 ether;
    uint public constant maxEther = 1 ether;
    uint8 public constant maxRateChange = 5; //no bigger than 5%
    uint public constant expriedTime = 5 * 60  * 1000; //5 minute

    mapping (address => Transaction[]) transactionBook;
    mapping (address => uint) transactionCount;
    mapping (address => Transaction) lastestTransaction;

    //events
    event ReceivePendingTransaction(Transaction _transaction);
    event UpdateTransactionStatus(Transaction _transaction);
    //events

    //modifiers
    modifier AccepableEther(uint _etherValue) {
        require(_etherValue >= minEther);
        require(_etherValue <= maxEther);
        _;
    } 

    modifier TransactionNotExpried(uint _transactionTime) {
        require(safeAdd(_transactionTime,expriedTime) < now);
        _;
    }
    //modifiers


    //constructor
    constructor() public {

    }

    function () public payable {
        executeWhenReceiveEther(msg.sender, msg.value);
    }

    function getTransactionBookCount(address _from) public returns (uint){
        return transactionBook[_from].length;
    }

    function getLastestTransaction(address _from) public returns (address, uint, uint, uint, uint, uint) {
        require(getTransactionBookCount(_from) > 0);
        Transaction storage t = safeSub(transactionBook[_from][getTransactionBookCount(_from)],1);
        return (t.from, t.ethValue, t.estimatedTokenRate, t.receiveTime, t.executedTime, t.status);
    }

    function _changeLastestTransactionStatus(address _from, uint _newStatus) private {
        Transaction storage transaction = getLastestTransaction(_from);
        transaction.status = _newStatus;
        emit UpdateTransactionStatus(transaction);
    }

    function createNewTransaction(uint _ethValue, uint _estimatedTokenRate) public {
        uint transBookLength = transactionBook[msg.sender].length;
        require(transBookLength == 0 
            || transactionBook[msg.sender][safeSub(transBookLength,1)].status == 2 
            || transactionBook[msg.sender][safeSub(transBookLength,1)].status == -1);
        transactionBook[msg.sender].push(Transaction(msg.sender, _ethValue, _estimatedTokenRate, now, 0, 0));
        emit ReceivePendingTransaction(transactionBook[msg.sender][transBookLength]);
    }

    function executeWhenReceiveEther(address _sender, uint _ethValue) internal AccepableEther(_ethValue){
        Transaction storage transaction
            = getLastestTransaction(_sender);
        if(safeAdd(transaction.receiveTime,expriedTime) <= now){
            _changeLastestTransactionStatus(_sender, -2);
            _sender.send(_ethValue);
            return;
        }
    }

}




// ----------------------------------------------------------------------------
// FastExchange contract end
// ----------------------------------------------------------------------------