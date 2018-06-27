

var web3;


if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}
console.log(web3.isConnected());
var contract = new web3.eth.contract(abi).at(0xd0676c69bb80366bbb9b2db751eebdf82b6ddf57);
var myEvent = contract.LogTransaction({},{fromBlock: 0, toBlock: 'latest'});
myEvent.watch(function(error, result){
    console.log("on watch"); 
    console.log(arguments);
});