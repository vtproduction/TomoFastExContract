var FastExchange = artifacts.require("./FastExchange.sol");
var VenusToken = artifacts.require("./VenusToken.sol");
module.exports = function (deployer) {
    deployer.deploy(VenusToken).then(function () {
        return deployer.deploy(FastExchange);
    }); 
};