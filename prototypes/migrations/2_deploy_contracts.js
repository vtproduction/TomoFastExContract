var FastExchange = artifacts.require("./FastExchange.sol");
var VenusToken = artifacts.require("./VenusToken.sol");
module.exports = function (deployer) {
    deployer.deploy(VenusToken).then(function () {
        return deployer.deploy(FastExchange, VenusToken.address, "0x86F696DEfEa9EDCbbB16c06BE61Fb6b7FcbFB362");
    });
};