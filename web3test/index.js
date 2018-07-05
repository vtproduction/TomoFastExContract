window.onload = function () {
    
    var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545/"));
    
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var fastExchangeContract = web3.eth.contract(abi);
    var contract = fastExchangeContract.at('0xde0310df95029f2c6a230c11ea7c82cb3dc45ed8');
    var myEvent = contract.ReceiveEth({}, {
        fromBlock: 0,
        toBlock: 'latest'
    });
    myEvent.watch(function (error, result) {
        if (!error) {
            console.log("on watch ReceiveEth ========");
            console.log("from: " + result.args.from);
            console.log("index:" + result.args.transactionId.toString());
            console.log("ethValue:" + (result.args.ethValue / 10 ** 18).toString());
            console.log("\n");
            
        }

    });

    var tokenTransferEv = contract.TokenTransferred({}, {
        fromBlock: 0,
        toBlock: 'latest'
    });
    tokenTransferEv.watch(function (error, result) {
        if (!error) {
    
            console.log("on watch TokenTransferred ========");
            console.log("to: " + result.args.to);
            console.log("transactionId:" + result.args.transactionId.toString());
            console.log("tokenAmount:" + (result.args.tokenAmount / 10 ** 18).toString());
            console.log("refundEth:" + (result.args.refundEth / 10 ** 18).toString());
            console.log("tokenRate:" + result.args.tokenRate.toString());
            console.log("\n");
        }

    });

    var transactionLog = contract.TransactionLog({}, {
        fromBlock: 0,
        toBlock: 'latest'
    });
    transactionLog.watch(function (error, result) {
        if (!error) {

            console.log("on watch TransactionLog ========");
            console.log("from: " + result.args.from);
            console.log("receivedEth:" + (result.args.receivedEth / 10 ** 18).toString());
            console.log("tokenRate:" + result.args.tokenRate.toString());
            console.log("tokenAmount:" + (result.args.tokenAmount / 10 ** 18).toString());
            console.log("createdAt:" + result.args.createdAt.toString());
            console.log("transferredAt:" + result.args.transferredAt.toString());
            console.log("\n");
        }

    });

   console.log(contract.getTransactionDetail(0));
   web3.eth.sendTransaction({
       from: web3.eth.accounts[1],
       to: contract.address,
       value: web3.toWei(0.5, 'ether'),
       gas: 1000000
   }, function(e,txId){
        console.log(e);
        console.log(txId);
        
        
   });
    
};

// this call saves event data successfully!
/* contract.deposit('hello there', function (res) {
    console.log(arguments)
}); */