module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      from: '0x84225cb622a619E41488BA3e8B9aA95c39B3f6Ee'
    }
  }
};