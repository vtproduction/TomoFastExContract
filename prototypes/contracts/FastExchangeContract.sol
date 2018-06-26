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

    struct FTransaction {
        address from;
        uint ethValue;
        uint estimatedTokenRate;
        uint[5] statusTime;
        uint status; //0: pending; 1: processing; 2: success; 3: canceled ; 4: expried
    }
    
    uint public constant minEther = 0.1 ether;
    uint public constant maxEther = 1 ether;
    uint public constant maxRateChange = 15; //no bigger than 5%
    uint public constant expriedTime = 5000; //5 secs

    mapping (address => FTransaction[]) transactionBook;
    mapping (address => uint) transactionCount;
    //mapping (address => Transaction) lastestTransaction;

    //events
    event ReceivePendingTransaction(address from);
    event UpdateTransactionStatus(FTransaction _transaction);
    event CannotCreateNewTransaction(string mess);
    event Log(string mes);
    event LogTime(uint time);
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

    modifier HasTransaction(address _from) { 
        require(transactionCount[_from] > 0);
        _;
    }

    modifier LastestTransactionIsPending(address _from) {
        require(transactionCount[_from] > 0);
        require(transactionBook[_from][transactionCount[_from] - 1].status == 0);
        require(safeAdd(transactionBook[_from][transactionCount[_from] - 1].statusTime[0],expriedTime) < now);
        _;
    }
    //modifiers
   

    function changeLastestTransactionStatus(address _from, uint _status) private HasTransaction(_from) {
        transactionBook[_from][transactionCount[_from] - 1].status = _status;
        transactionBook[_from][transactionCount[_from] - 1].statusTime[_status] = now;
    }
    function canCreateNewTransaction(address _from) public returns (bool) {
        if(transactionCount[_from] == 0) {
            emit Log("count = 0");
            return true;
        }

        FTransaction storage ft = transactionBook[_from][transactionCount[_from] - 1];
        if(ft.status != 4 && ft.statusTime[4] < now ){
            emit Log("transaction expried! ");
            emit LogTime(ft.statusTime[4]);
            emit LogTime(now);
            changeLastestTransactionStatus(_from, 4);
            return true;
        }
        if(ft.status == 0 || ft.status == 1) {
            emit CannotCreateNewTransaction("transaction status == 0 or 1");
            return false;
        }
        return true;
    }
    
    
    function CreatePendingTransaction(uint _ethValue, uint _estimateTokenRate) 
        public AccepableEther(_ethValue) {
        if (canCreateNewTransaction(msg.sender)) {
            transactionBook[msg.sender].push(FTransaction(msg.sender, _ethValue, _estimateTokenRate, [now, 0, 0, 0, safeAdd(now, expriedTime)],0));
            transactionCount[msg.sender]++;
            emit ReceivePendingTransaction(msg.sender);    
        }else{
            emit Log("can not creat new transaction at 0");
            //revert();
        }
    } 

    //constructor
    constructor() public {

    }

    function () public payable {

    }
}




// ----------------------------------------------------------------------------
// FastExchange contract end
// ----------------------------------------------------------------------------