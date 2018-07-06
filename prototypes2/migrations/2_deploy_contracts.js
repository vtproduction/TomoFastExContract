var FastExchange = artifacts.require("./FastExchange.sol");
var VenusToken = artifacts.require("./VenusToken.sol");
module.exports = function (deployer) {
    return deployer.deploy(FastExchange);
};