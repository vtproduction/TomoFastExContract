
var VenusToken = artifacts.require("./VenusToken.sol");
module.exports = function (deployer) {
    deployer.deploy(VenusToken);
};