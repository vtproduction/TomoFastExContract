window.onload = function () {
    
    var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545/"));
    
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var fastExchangeContract = web3.eth.contract(abi);
    var contract = fastExchangeContract.at('0x364b6e7d71226f444cbe59ba7d2c13e96df69768');
    console.log((web3.eth.getBalance(contract.address) / 10**18).toString());

    for(var j = 0; j < 10; j++){
            for (var i = 1; i < 10; i++) {
                web3.eth.sendTransaction({
                    from: web3.eth.accounts[i],
                    to: contract.address,
                    value: web3.toWei(1, 'ether'),
                    gas: 1000000
                }, function (e, txId) {
                    console.log(txId);
                });
            }
            
     }  
    /* var myEvent = contract.ReceiveEth({}, {
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

    }); */

   //console.log(contract.getTransactionDetail(0));
   
    
};

// this call saves event data successfully!
/* contract.deposit('hello there', function (res) {
    console.log(arguments)
}); */