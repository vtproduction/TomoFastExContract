module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      from: '0x61ED09862e2846dC5d22D18dABC7Cf7b054e60d5'
    }
  }
};