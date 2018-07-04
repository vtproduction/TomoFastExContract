var abi = [{
        "constant": true,
        "inputs": [],
        "name": "maxEth",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "acceptOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
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
        "constant": true,
        "inputs": [{
                "name": "a",
                "type": "uint256"
            },
            {
                "name": "b",
                "type": "uint256"
            }
        ],
        "name": "safeSub",
        "outputs": [{
            "name": "c",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
                "name": "a",
                "type": "uint256"
            },
            {
                "name": "b",
                "type": "uint256"
            }
        ],
        "name": "safeDiv",
        "outputs": [{
            "name": "c",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
                "name": "a",
                "type": "uint256"
            },
            {
                "name": "b",
                "type": "uint256"
            }
        ],
        "name": "safeMul",
        "outputs": [{
            "name": "c",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "newOwner",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
                "name": "a",
                "type": "uint256"
            },
            {
                "name": "b",
                "type": "uint256"
            }
        ],
        "name": "safeAdd",
        "outputs": [{
            "name": "c",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "minEth",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
            "name": "_newOwner",
            "type": "address"
        }],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
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
            "name": "mess",
            "type": "string"
        }],
        "name": "CannotCreateNewTransaction",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "name": "mes",
            "type": "string"
        }],
        "name": "Log",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "name": "time",
            "type": "uint256"
        }],
        "name": "LogTime",
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
                "name": "maxToken",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "refundEth",
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
        "constant": false,
        "inputs": [{
            "name": "from",
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
                "name": "_sender",
                "type": "address"
            },
            {
                "name": "_transactionId",
                "type": "uint256"
            },
            {
                "name": "_tokenRate",
                "type": "uint256"
            },
            {
                "name": "_maxToken",
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