window.onload = function () {
    
    var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545/"));
    
    web3.eth.defaultAccount = web3.eth.accounts[3];
    var fastExchangeContract = web3.eth.contract(abi);
    var contract = fastExchangeContract.at('0x487869218eeff7cf1e379ce3479d798b2e0e5061');
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
            console.log("tokenAmount:" + result.args.tokenAmount.toString());
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
            console.log("createdAt:" + result.args.createdAt.toString());
            console.log("transferredAt:" + result.args.transferredAt.toString());
            console.log("\n");
        }

    });

    
    
};

// this call saves event data successfully!
/* contract.deposit('hello there', function (res) {
    console.log(arguments)
}); */