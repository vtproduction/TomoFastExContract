var abi = [{
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "name": "_tokenAddress",
                "type": "address"
            },
            {
                "name": "_faucetAddress",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": false,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "transactionId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "ethValue",
                "type": "uint256"
            }
        ],
        "name": "ReceiveEth",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": false,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "transactionId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "tokenAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "refundEth",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "tokenRate",
                "type": "uint256"
            }
        ],
        "name": "TokenTransfered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": false,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "receivedEth",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "tokenRate",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "tokenAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "createdAt",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "transferredAt",
                "type": "uint256"
            }
        ],
        "name": "TransactionLog",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "_transactionId",
            "type": "uint256"
        }],
        "name": "getTransactionDetail",
        "outputs": [{
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "_user",
            "type": "address"
        }],
        "name": "getUserTransactionIndexes",
        "outputs": [{
            "name": "",
            "type": "uint256[]"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
            "name": "_from",
            "type": "address"
        }],
        "name": "logAllTransactions",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "_transactionId",
                "type": "uint256"
            },
            {
                "name": "_tokenRate",
                "type": "uint256"
            }
        ],
        "name": "sendToken",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]