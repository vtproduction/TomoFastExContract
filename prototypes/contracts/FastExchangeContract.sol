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
// ERC20 contract start
// ----------------------------------------------------------------------------
contract VenusToken {
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}
// ----------------------------------------------------------------------------
// ERC20 contract end
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
    uint public constant maxEther = 5 ether;
    uint public constant maxRateChange = 15; //no bigger than 5%
    uint public constant expriedTime = 5 minutes; //5 mins
    address tokenAddress;
    address faucetAddress;

    mapping (address => FTransaction[]) transactionBook;
    mapping (address => uint) transactionCount;
    //mapping (address => Transaction) lastestTransaction;

    //events
    event ReceivePendingTransaction(address from);
    event UpdateTransactionStatus(FTransaction _transaction);
    event CannotCreateNewTransaction(string mess);
    event Log(string mes);
    event LogTime(uint time);
    event LogTransaction(uint status, uint t1, uint t2, uint t3, uint t4, uint t5, uint t6);
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
        require(safeAdd(transactionBook[_from][transactionCount[_from] - 1].statusTime[0],expriedTime) > now);
        _;
    }
    //modifiers
   

    function changeLastestTransactionStatus(address _from, uint _status) private HasTransaction(_from) {
        transactionBook[_from][transactionCount[_from] - 1].status = _status;
        transactionBook[_from][transactionCount[_from] - 1].statusTime[_status] = now;
    }

    function getLastestTransaction(address _from) public {
        FTransaction memory ft = transactionBook[_from][transactionCount[_from] - 1];
        emit LogTransaction(ft.status,ft.statusTime[0],ft.statusTime[1],ft.statusTime[2],ft.statusTime[3],ft.statusTime[4],now);
    }

    function canCreateNewTransaction(address _from) public constant onlyOwner returns (bool b) {
        if(transactionCount[_from] == 0) {
            b = true;
            //emit LogTransaction(9999,0,0,0,0,0,now);
            return b;
        }
        FTransaction storage ft = transactionBook[_from][transactionCount[_from] - 1];
        if(ft.status != 4 && ft.statusTime[4] < now ){
            changeLastestTransactionStatus(_from, 4);
            b = true;
        }
        if(ft.status == 0 || ft.status == 1) {
            b = false;
        }
        //emit LogTransaction(ft.status,ft.statusTime[0],ft.statusTime[1],ft.statusTime[2],ft.statusTime[3],ft.statusTime[4],now);
        return b;
    }
    
    
    function CreatePendingTransaction(uint _ethValue, uint _estimateTokenRate) 
        public onlyOwner AccepableEther(_ethValue) {
        if (canCreateNewTransaction(msg.sender)) {
            transactionBook[msg.sender].push(FTransaction(msg.sender, _ethValue, _estimateTokenRate, [now, 0, 0, 0, safeAdd(now, expriedTime)],0));
            transactionCount[msg.sender]++;
            emit ReceivePendingTransaction(msg.sender);    
        }else{
            emit Log("can not creat new transaction at 0");
            revert();
        }
    } 

    //constructor
    constructor(address _tokenAddress, address _faucetAddress) public {
        tokenAddress = _tokenAddress;
        faucetAddress = _faucetAddress;
    }

    function () public payable {
        _processIncomingEther(msg.sender, msg.value);
    }

    


    function _processIncomingEther(address _sender, uint _ethValue) private AccepableEther(_ethValue) LastestTransactionIsPending(_sender){
        changeLastestTransactionStatus(_sender, 1);
        VenusToken venusToken = VenusToken(tokenAddress);
        uint maxEth = transactionBook[_sender][transactionCount[_sender] - 1].ethValue;
        uint paybackEth = 0;
        if (_ethValue < maxEth) {
            revert();
        } else {
            uint tokenAmount = transactionBook[_sender][transactionCount[_sender] - 1].estimatedTokenRate * _ethValue;
            uint maxToken = venusToken.allowance(faucetAddress, this);
            if (maxToken < tokenAmount) {
                paybackEth = (tokenAmount - maxToken) / transactionBook[_sender][transactionCount[_sender] - 1].estimatedTokenRate;
                tokenAmount = maxToken;
                
            }
            if (_ethValue > maxEth) {
                paybackEth = paybackEth + _ethValue - maxEth;
            }
            if (paybackEth > 0) {
                _sender.transfer(paybackEth);
            }
            venusToken.transferFrom(faucetAddress, _sender, tokenAmount);
        }

    }
}




// ----------------------------------------------------------------------------
// FastExchange contract end
// ----------------------------------------------------------------------------