//Initiating web3 provider
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

//gets the abi for contract
function getDHUCoinABI() {
    var contract = web3.eth.contract([
        {
            "constant": true,
            "inputs": [
                {
                    "name": "x1",
                    "type": "uint256"
                },
                {
                    "name": "z1",
                    "type": "uint256"
                },
                {
                    "name": "x2",
                    "type": "uint256"
                },
                {
                    "name": "z2",
                    "type": "uint256"
                }
            ],
            "name": "_jAdd",
            "outputs": [
                {
                    "name": "x3",
                    "type": "uint256"
                },
                {
                    "name": "z3",
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
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
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
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
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
            "name": "grantVestedDHUContract",
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
            "constant": false,
            "inputs": [
                {
                    "name": "newBottomInteger",
                    "type": "uint256"
                }
            ],
            "name": "updatePriceBottomInteger",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "x1",
                    "type": "uint256"
                },
                {
                    "name": "z1",
                    "type": "uint256"
                },
                {
                    "name": "x2",
                    "type": "uint256"
                },
                {
                    "name": "z2",
                    "type": "uint256"
                }
            ],
            "name": "_jSub",
            "outputs": [
                {
                    "name": "x3",
                    "type": "uint256"
                },
                {
                    "name": "z3",
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
            "name": "mainWallet",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "success",
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
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "applicableStudents",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
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
            "name": "previousUpdateTime",
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
                    "name": "newMainWallet",
                    "type": "address"
                }
            ],
            "name": "changeMainWallet",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "hash",
                    "type": "bytes32"
                },
                {
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "isSigned",
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
                    "name": "x1",
                    "type": "uint256"
                },
                {
                    "name": "y1",
                    "type": "uint256"
                }
            ],
            "name": "ellipticCurveDoublingAffine",
            "outputs": [
                {
                    "name": "x3",
                    "type": "uint256"
                },
                {
                    "name": "y3",
                    "type": "uint256"
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
                    "name": "k",
                    "type": "uint256"
                },
                {
                    "name": "x1",
                    "type": "uint256"
                },
                {
                    "name": "y1",
                    "type": "uint256"
                }
            ],
            "name": "ellipticCurveMultiplicationAffine",
            "outputs": [
                {
                    "name": "x3",
                    "type": "uint256"
                },
                {
                    "name": "y3",
                    "type": "uint256"
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
                    "name": "x1",
                    "type": "uint256"
                },
                {
                    "name": "z1",
                    "type": "uint256"
                },
                {
                    "name": "x2",
                    "type": "uint256"
                },
                {
                    "name": "z2",
                    "type": "uint256"
                }
            ],
            "name": "_jMul",
            "outputs": [
                {
                    "name": "x3",
                    "type": "uint256"
                },
                {
                    "name": "z3",
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
                    "name": "privKey",
                    "type": "uint256"
                }
            ],
            "name": "ellipticCurveDiscreteLogarithmAffine",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "x1",
                    "type": "uint256"
                },
                {
                    "name": "z1",
                    "type": "uint256"
                },
                {
                    "name": "x2",
                    "type": "uint256"
                },
                {
                    "name": "z2",
                    "type": "uint256"
                }
            ],
            "name": "_jDiv",
            "outputs": [
                {
                    "name": "x3",
                    "type": "uint256"
                },
                {
                    "name": "z3",
                    "type": "uint256"
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
                    "name": "x1",
                    "type": "uint256"
                },
                {
                    "name": "y1",
                    "type": "uint256"
                },
                {
                    "name": "x2",
                    "type": "uint256"
                },
                {
                    "name": "y2",
                    "type": "uint256"
                }
            ],
            "name": "ellipticCurveAdditionAffine",
            "outputs": [
                {
                    "name": "x3",
                    "type": "uint256"
                },
                {
                    "name": "y3",
                    "type": "uint256"
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
                    "name": "x1",
                    "type": "uint256"
                },
                {
                    "name": "y1",
                    "type": "uint256"
                }
            ],
            "name": "onCurveChecker",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
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
                    "name": "newTopInteger",
                    "type": "uint256"
                }
            ],
            "name": "updatePriceDHU",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "balance",
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
            "name": "priceUpdateWaitingTime",
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
            "name": "setTrading",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
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
                    "name": "privKey",
                    "type": "uint256"
                }
            ],
            "name": "publicKey",
            "outputs": [
                {
                    "name": "qx",
                    "type": "uint256"
                },
                {
                    "name": "qy",
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
            "name": "enableTrading",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "minInvestment",
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
            "inputs": [
                {
                    "name": "x",
                    "type": "uint256"
                }
            ],
            "name": "_inverse",
            "outputs": [
                {
                    "name": "invA",
                    "type": "uint256"
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
                    "name": "d",
                    "type": "uint256"
                },
                {
                    "name": "x1",
                    "type": "uint256"
                },
                {
                    "name": "y1",
                    "type": "uint256"
                },
                {
                    "name": "z1",
                    "type": "uint256"
                }
            ],
            "name": "_ecMul",
            "outputs": [
                {
                    "name": "x3",
                    "type": "uint256"
                },
                {
                    "name": "y3",
                    "type": "uint256"
                },
                {
                    "name": "z3",
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
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_oldValue",
                    "type": "uint256"
                },
                {
                    "name": "_newValue",
                    "type": "uint256"
                }
            ],
            "name": "changeApproval",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "currentPrice",
            "outputs": [
                {
                    "name": "topInteger",
                    "type": "uint256"
                },
                {
                    "name": "bottomInteger",
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
            "name": "buy",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "newPriceUpdateWaitingTime",
                    "type": "uint256"
                }
            ],
            "name": "changePriceUpdateWaitingTime",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "EllipticCurve",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "participant",
                    "type": "address"
                },
                {
                    "name": "amountTokens",
                    "type": "uint256"
                },
                {
                    "name": "id",
                    "type": "string"
                }
            ],
            "name": "airDropTokens",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "prices",
            "outputs": [
                {
                    "name": "topInteger",
                    "type": "uint256"
                },
                {
                    "name": "bottomInteger",
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
                    "name": "newSecondaryWallet",
                    "type": "address"
                }
            ],
            "name": "changeSecondaryWallet",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "x1",
                    "type": "uint256"
                },
                {
                    "name": "y1",
                    "type": "uint256"
                },
                {
                    "name": "z1",
                    "type": "uint256"
                },
                {
                    "name": "x2",
                    "type": "uint256"
                },
                {
                    "name": "y2",
                    "type": "uint256"
                },
                {
                    "name": "z2",
                    "type": "uint256"
                }
            ],
            "name": "_ecAdd",
            "outputs": [
                {
                    "name": "x3",
                    "type": "uint256"
                },
                {
                    "name": "y3",
                    "type": "uint256"
                },
                {
                    "name": "z3",
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
                    "name": "participant",
                    "type": "address"
                }
            ],
            "name": "buyTo",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "remaining",
                    "type": "uint256"
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
                    "name": "privKey",
                    "type": "uint256"
                },
                {
                    "name": "pubX",
                    "type": "uint256"
                },
                {
                    "name": "pubY",
                    "type": "uint256"
                }
            ],
            "name": "deriveKey",
            "outputs": [
                {
                    "name": "qx",
                    "type": "uint256"
                },
                {
                    "name": "qy",
                    "type": "uint256"
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
                    "name": "x1",
                    "type": "uint256"
                },
                {
                    "name": "y1",
                    "type": "uint256"
                },
                {
                    "name": "z1",
                    "type": "uint256"
                }
            ],
            "name": "_ecDouble",
            "outputs": [
                {
                    "name": "x3",
                    "type": "uint256"
                },
                {
                    "name": "y3",
                    "type": "uint256"
                },
                {
                    "name": "z3",
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
            "name": "secondaryWallet",
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
            "constant": false,
            "inputs": [
                {
                    "name": "privKey",
                    "type": "address"
                }
            ],
            "name": "proofOfWork",
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
                    "indexed": true,
                    "name": "participant",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "id",
                    "type": "string"
                }
            ],
            "name": "Verification",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "student",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "id",
                    "type": "string"
                }
            ],
            "name": "Authorization",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "participant",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "beneficiary",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "ethValue",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "amountTokens",
                    "type": "uint256"
                }
            ],
            "name": "Buy",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "topInteger",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "bottomInteger",
                    "type": "uint256"
                }
            ],
            "name": "PriceDHUUpdate",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "participant",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "amountTokens",
                    "type": "uint256"
                }
            ],
            "name": "AirDrop",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "studentAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "studentID",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "firstName",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "lastName",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "gpa",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "id",
                    "type": "string"
                }
            ],
            "name": "StudentInfo",
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
                },
                {
                    "indexed": false,
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        }
    ]);
    return contract;
}