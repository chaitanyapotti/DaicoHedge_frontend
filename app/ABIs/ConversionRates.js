export default [
  {
    "constant": false,
    "inputs": [
      {
        "name": "alerter",
        "type": "address"
      }
    ],
    "name": "removeAlerter",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x01a12fd3"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "validRateDurationInBlocks",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x16265694"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "pendingAdmin",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x26782247"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getOperators",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x27a099d8"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "sendTo",
        "type": "address"
      }
    ],
    "name": "withdrawToken",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x3ccdbb28"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newAlerter",
        "type": "address"
      }
    ],
    "name": "addAlerter",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x408ee7fe"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "numTokensInCurrentCompactData",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x5085c9f1"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "transferAdmin",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x75829def"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "claimAdmin",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x77f50f97"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "transferAdminQuickly",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x7acc8678"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getAlerters",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x7c423f54"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOperator",
        "type": "address"
      }
    ],
    "name": "addOperator",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x9870d7fe"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "reserveContract",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xa7f43acd"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tokenImbalanceData",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xa80c609e"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "removeOperator",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xac8a584a"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "minimalRecordResolution",
        "type": "uint256"
      },
      {
        "name": "maxPerBlockImbalance",
        "type": "uint256"
      },
      {
        "name": "maxTotalImbalance",
        "type": "uint256"
      }
    ],
    "name": "setTokenControlInfo",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xbfee3569"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "sendTo",
        "type": "address"
      }
    ],
    "name": "withdrawEther",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xce56c454"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      }
    ],
    "name": "getTokenControlInfo",
    "outputs": [
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
    "type": "function",
    "signature": "0xe7d4fd91"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xf851a440"
  },
  {
    "inputs": [
      {
        "name": "_admin",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "sendTo",
        "type": "address"
      }
    ],
    "name": "TokenWithdraw",
    "type": "event",
    "signature": "0x72cb8a894ddb372ceec3d2a7648d86f17d5a15caae0e986c53109b8a9a9385e6"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "sendTo",
        "type": "address"
      }
    ],
    "name": "EtherWithdraw",
    "type": "event",
    "signature": "0xec47e7ed86c86774d1a72c19f35c639911393fe7c1a34031fdbd260890da90de"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "pendingAdmin",
        "type": "address"
      }
    ],
    "name": "TransferAdminPending",
    "type": "event",
    "signature": "0x3b81caf78fa51ecbc8acb482fd7012a277b428d9b80f9d156e8a54107496cc40"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "newAdmin",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "previousAdmin",
        "type": "address"
      }
    ],
    "name": "AdminClaimed",
    "type": "event",
    "signature": "0x65da1cfc2c2e81576ad96afb24a581f8e109b7a403b35cbd3243a1c99efdb9ed"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "newAlerter",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "isAdd",
        "type": "bool"
      }
    ],
    "name": "AlerterAdded",
    "type": "event",
    "signature": "0x5611bf3e417d124f97bf2c788843ea8bb502b66079fbee02158ef30b172cb762"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "newOperator",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "isAdd",
        "type": "bool"
      }
    ],
    "name": "OperatorAdded",
    "type": "event",
    "signature": "0x091a7a4b85135fdd7e8dbc18b12fabe5cc191ea867aa3c2e1a24a102af61d58b"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      }
    ],
    "name": "addToken",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xd48bfca7"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "buy",
        "type": "bytes14[]"
      },
      {
        "name": "sell",
        "type": "bytes14[]"
      },
      {
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "name": "indices",
        "type": "uint256[]"
      }
    ],
    "name": "setCompactData",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x64887334"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "tokens",
        "type": "address[]"
      },
      {
        "name": "baseBuy",
        "type": "uint256[]"
      },
      {
        "name": "baseSell",
        "type": "uint256[]"
      },
      {
        "name": "buy",
        "type": "bytes14[]"
      },
      {
        "name": "sell",
        "type": "bytes14[]"
      },
      {
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "name": "indices",
        "type": "uint256[]"
      }
    ],
    "name": "setBaseRate",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x1a4813d7"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "xBuy",
        "type": "int256[]"
      },
      {
        "name": "yBuy",
        "type": "int256[]"
      },
      {
        "name": "xSell",
        "type": "int256[]"
      },
      {
        "name": "ySell",
        "type": "int256[]"
      }
    ],
    "name": "setQtyStepFunction",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x80d8b380"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "xBuy",
        "type": "int256[]"
      },
      {
        "name": "yBuy",
        "type": "int256[]"
      },
      {
        "name": "xSell",
        "type": "int256[]"
      },
      {
        "name": "ySell",
        "type": "int256[]"
      }
    ],
    "name": "setImbalanceStepFunction",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xbc9cbcc8"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "duration",
        "type": "uint256"
      }
    ],
    "name": "setValidRateDurationInBlocks",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x6c6295b8"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      }
    ],
    "name": "enableTokenTrade",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x1d6a8bda"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      }
    ],
    "name": "disableTokenTrade",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x158859f7"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "reserve",
        "type": "address"
      }
    ],
    "name": "setReserveAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x14673d31"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "buyAmount",
        "type": "int256"
      },
      {
        "name": "rateUpdateBlock",
        "type": "uint256"
      },
      {
        "name": "currentBlock",
        "type": "uint256"
      }
    ],
    "name": "recordImbalance",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xc6fd2103"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "currentBlockNumber",
        "type": "uint256"
      },
      {
        "name": "buy",
        "type": "bool"
      },
      {
        "name": "qty",
        "type": "uint256"
      }
    ],
    "name": "getRate",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xb8e9c22e"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "buy",
        "type": "bool"
      }
    ],
    "name": "getBasicRate",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xcf8fee11"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      }
    ],
    "name": "getCompactData",
    "outputs": [
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
        "type": "bytes1"
      },
      {
        "name": "",
        "type": "bytes1"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xe4a2ac62"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      }
    ],
    "name": "getTokenBasicData",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      },
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x721bba59"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "command",
        "type": "uint256"
      },
      {
        "name": "param",
        "type": "uint256"
      }
    ],
    "name": "getStepFunctionData",
    "outputs": [
      {
        "name": "",
        "type": "int256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x62674e93"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "token",
        "type": "address"
      }
    ],
    "name": "getRateUpdateBlock",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8036d757"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getListedTokens",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x2ba996a5"
  }
]