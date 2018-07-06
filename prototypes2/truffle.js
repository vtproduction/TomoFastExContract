'use strict'
const HDWalletProvider = require('truffle-hdwallet-provider')

module.exports = {
  networks: {
    tomo: {
      provider: function () {
        return new HDWalletProvider(process.env.MNEMONIC, 'https://testnet.tomochain.com')
      },
      network_id: 89,
      gasPrice: 1 // 1 wei
    }
  }
}
