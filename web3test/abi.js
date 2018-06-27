var abi =  [
	{
		"constant": true,
		"inputs": [],
		"name": "minEther",
		"outputs": [
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
		"inputs": [],
		"name": "maxEther",
		"outputs": [
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
		"inputs": [],
		"name": "expriedTime",
		"outputs": [
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
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "a",
				"type": "uint256"
			},
			{
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeSub",
		"outputs": [
			{
				"name": "c",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			}
		],
		"name": "canCreateNewTransaction",
		"outputs": [
			{
				"name": "b",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "a",
				"type": "uint256"
			},
			{
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeDiv",
		"outputs": [
			{
				"name": "c",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "maxRateChange",
		"outputs": [
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
		"constant": false,
		"inputs": [
			{
				"name": "_ethValue",
				"type": "uint256"
			},
			{
				"name": "_estimateTokenRate",
				"type": "uint256"
			}
		],
		"name": "CreatePendingTransaction",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "a",
				"type": "uint256"
			},
			{
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeMul",
		"outputs": [
			{
				"name": "c",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "newOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "a",
				"type": "uint256"
			},
			{
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeAdd",
		"outputs": [
			{
				"name": "c",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
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
		"inputs": [
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			}
		],
		"name": "ReceivePendingTransaction",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"name": "from",
						"type": "address"
					},
					{
						"name": "ethValue",
						"type": "uint256"
					},
					{
						"name": "estimatedTokenRate",
						"type": "uint256"
					},
					{
						"name": "statusTime",
						"type": "uint256[5]"
					},
					{
						"name": "status",
						"type": "uint256"
					}
				],
				"indexed": false,
				"name": "_transaction",
				"type": "tuple"
			}
		],
		"name": "UpdateTransactionStatus",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "mess",
				"type": "string"
			}
		],
		"name": "CannotCreateNewTransaction",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "mes",
				"type": "string"
			}
		],
		"name": "Log",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "LogTime",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "status",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "t1",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "t2",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "t3",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "t4",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "t5",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "t6",
				"type": "uint256"
			}
		],
		"name": "LogTransaction",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
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
	}
]