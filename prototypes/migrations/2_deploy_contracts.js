var FastExchange = artifacts.require("./FastExchange.sol");
var VenusToken = artifacts.require("./VenusToken.sol");
module.exports = function (deployer) {
    deployer.deploy(VenusToken,'0x6c94518C3499AE8ED3829045212cF9CA71F3536C').then(function () {
        return deployer.deploy(FastExchange, VenusToken.address, '0x6c94518C3499AE8ED3829045212cF9CA71F3536C');
    });
};