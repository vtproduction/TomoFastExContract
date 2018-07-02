var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}


var contract = web3.eth.contract(abi).at('0x487869218eeff7cf1e379ce3479d798b2e0e5061');
var token = web3.eth.contract(venusAbi).at('0x993e8a0b8a99df4d803158ca77bb4d5688a27edf');
var myEvent = contract.LogTransaction({},{fromBlock: 0, toBlock: 'latest'});
token.balanceOf('0x86F696DEfEa9EDCbbB16c06BE61Fb6b7FcbFB362', function(e,r) {
    console.log(r.toNumber()); 
});
token.totalSupply(function(e,r){
    console.log(r.toNumber())
})
myEvent.watch(function(error, result){
    console.log("on watch"); 
    console.log(arguments);
});