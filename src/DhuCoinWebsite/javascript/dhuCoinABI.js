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

function getDatabaseABI() {
    var contract = web3.eth.contract([
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "students",
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
                    "name": "_studentAddress",
                    "type": "address"
                },
                {
                    "name": "_seminar",
                    "type": "address"
                },
                {
                    "name": "_seminarName",
                    "type": "string"
                },
                {
                    "name": "_seminarTeacher",
                    "type": "string"
                },
                {
                    "name": "_seminarInfo",
                    "type": "string"
                }
            ],
            "name": "storeStudentReference",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "getSeminar",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getAllSeminars",
            "outputs": [
                {
                    "name": "",
                    "type": "address[]"
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
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "seminars",
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
            "inputs": [],
            "name": "getAllStudents",
            "outputs": [
                {
                    "name": "",
                    "type": "address[]"
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
                    "name": "newOwner",
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
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "fallback"
        }
    ]);
    return contract;
}

function getSeminarABI() {
    var contract = web3.eth.contract([
        {
            "inputs": [
                {
                    "name": "databaseAddr",
                    "type": "address"
                },
                {
                    "name": "name",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "fallback"
        }
    ]);
    return contract;
}

function getStudentABI() {
    var contract = web3.eth.contract([
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "studentInfo",
            "outputs": [
                {
                    "name": "description",
                    "type": "string"
                },
                {
                    "name": "actionAdmin",
                    "type": "address"
                },
                {
                    "name": "DATABASE_CONTRACT",
                    "type": "address"
                },
                {
                    "name": "studentName",
                    "type": "string"
                },
                {
                    "name": "studentId",
                    "type": "string"
                },
                {
                    "name": "gpa",
                    "type": "uint256"
                },
                {
                    "name": "seminarName",
                    "type": "string"
                },
                {
                    "name": "seminarAddress",
                    "type": "address"
                },
                {
                    "name": "timestamp",
                    "type": "uint256"
                },
                {
                    "name": "blockNumber",
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
                    "name": "newStudentInfo",
                    "type": "string"
                },
                {
                    "name": "seminarAddr",
                    "type": "address"
                },
                {
                    "name": "databaseAddr",
                    "type": "address"
                },
                {
                    "name": "newGpa",
                    "type": "uint256"
                }
            ],
            "name": "updateStudentInfo",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "getMiningStatus",
            "outputs": [
                {
                    "name": "",
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
                    "name": "_studentInfo",
                    "type": "string"
                },
                {
                    "name": "seminarAddr",
                    "type": "address"
                },
                {
                    "name": "databaseAddr",
                    "type": "address"
                },
                {
                    "name": "newGpa",
                    "type": "uint256"
                }
            ],
            "name": "InsertStudentInfo",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "canMine",
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
                    "name": "status",
                    "type": "bool"
                }
            ],
            "name": "updateMiningStatus",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_studentInfo",
                    "type": "string"
                },
                {
                    "name": "seminarAddr",
                    "type": "address"
                },
                {
                    "name": "databaseAddr",
                    "type": "address"
                },
                {
                    "name": "newGpa",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "fallback"
        }
    ]);
    return contract;
}

function getStudentContractData(){
    var data = '0x60806040523480156200001157600080fd5b5060405162001d9938038062001d99833981018060405281019080805182019291906020018051906020019092919080519060200190929190805190602001909291905050506060600062000078868686866200020a640100000000026401000000009004565b91508390508073ffffffffffffffffffffffffffffffffffffffff16633b0d02333087856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156200017557808201518184015260208101905062000158565b50505050905090810190601f168015620001a35780820380516001836020036101000a031916815260200191505b508481038352600081526020016020018481038252600081526020016020019650505050505050600060405180830381600087803b158015620001e557600080fd5b505af1158015620001fa573d6000803e3d6000fd5b5050505050505050505062000ba1565b60606200021662000a42565b6200022062000a42565b606060006200022e62000a5c565b6200024d8a620006e56401000000000262000d77176401000000009004565b9450620002a36040805190810160405280600181526020017f2e00000000000000000000000000000000000000000000000000000000000000815250620006e56401000000000262000d77176401000000009004565b93506001620002ca8587620007156401000000000262000da5179091906401000000009004565b016040519080825280602002602001820160405280156200030057816020015b6060815260200190600190039081620002ea5790505b509250600091505b82518210156200037d5762000353620003398587620007b06401000000000262000e1c179091906401000000009004565b620007dd6401000000000262000e36176401000000009004565b83838151811015156200036257fe5b90602001906020020181905250818060010192505062000308565b600483511415156200038e57600080fd5b8260008151811015156200039e57fe5b90602001906020020151816000018190525033816020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505087816040019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508260018151811015156200043057fe5b9060200190602002015181606001819052508260028151811015156200045257fe5b9060200190602002015181608001819052508260038151811015156200047457fe5b906020019060200201518160c00181905250868160a0018181525050888160e0019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050428161010001818152505043816101200181815250506001819080600181540180825580915050906001820390600052602060002090600a02016000909192909190915060008201518160000190805190602001906200052a92919062000af2565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506060820151816003019080519060200190620005d792919062000af2565b506080820151816004019080519060200190620005f692919062000af2565b5060a0820151816005015560c08201518160060190805190602001906200061f92919062000af2565b5060e08201518160070160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506101008201518160080155610120820151816009015550505061012c87101580156200069557506101908711155b15620006bb5760016000806101000a81548160ff021916908315150217905550620006bc565b5b826003815181101515620006cc57fe5b9060200190602002015195505050505050949350505050565b620006ef62000a42565b600060208301905060408051908101604052808451815260200182815250915050919050565b60008082600001516200074a856000015186602001518660000151876020015162000851640100000000026401000000009004565b0190505b836000015184602001510181111515620007a95781806001019250508260000151620007a085602001518303866000015103838660000151876020015162000851640100000000026401000000009004565b0190506200074e565b5092915050565b620007ba62000a42565b620007d683838362000942640100000000026401000000009004565b5092915050565b606080600083600001516040519080825280601f01601f1916602001820160405280156200081a5781602001602082028038833980820191505090505b509150602082019050620008478185602001518660000151620009f5640100000000026401000000009004565b8192505050919050565b60008060008060008060008060008b97508c8b1115156200092c5760208b111515620008e25760018b60200360080260020a03196001029550858a511694508a8d8d010393508588511692505b84600019168360001916141515620008d9578388101515620008c5578c8c01985062000932565b87806001019850508588511692506200089e565b87985062000932565b8a8a209150600096505b8a8d03871115156200092b578a88209050806000191682600019161415620009175787985062000932565b6001880197508680600101975050620008ec565b5b8c8c0198505b5050505050505050949350505050565b6200094c62000a42565b60006200097b856000015186602001518660000151876020015162000851640100000000026401000000009004565b90508460200151836020018181525050846020015181038360000181815250508460000151856020015101811415620009bf576000856000018181525050620009ea565b8360000151836000015101856000018181510391508181525050836000015181018560200181815250505b829150509392505050565b60005b60208210151562000a1f57825184526020840193506020830192506020820391506'+
               '20009f8565b6001826020036101000a0390508019835116818551168181178652505050505050565b604080519081016040528060008152602001600081525090565b6101406040519081016040528060608152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160608152602001606081526020016000815260200160608152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062000b3557805160ff191683800117855562000b66565b8280016001018555821562000b66579182015b8281111562000b6557825182559160200191906001019062000b48565b5b50905062000b75919062000b79565b5090565b62000b9e91905b8082111562000b9a57600081600090555060010162000b80565b5090565b90565b6111e88062000bb16000396000f300608060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806327cf29f01461008a578063399bf0c8146103225780634c069a33146103d5578063d901dbc414610404578063e171b84714610530578063f53f25df1461055f575b34801561008457600080fd5b50600080fd5b34801561009657600080fd5b506100b56004803603810190808035906020019092919050505061058e565b60405180806020018b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200180602001898152602001806020018873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200187815260200186815260200185810385528f818151815260200191508051906020019080838360005b838110156101a957808201518184015260208101905061018e565b50505050905090810190601f1680156101d65780820380516001836020036101000a031916815260200191505b5085810384528c818151815260200191508051906020019080838360005b8381101561020f5780820151818401526020810190506101f4565b50505050905090810190601f16801561023c5780820380516001836020036101000a031916815260200191505b5085810383528b818151815260200191508051906020019080838360005b8381101561027557808201518184015260208101905061025a565b50505050905090810190601f1680156102a25780820380516001836020036101000a031916815260200191505b50858103825289818151815260200191508051906020019080838360005b838110156102db5780820151818401526020810190506102c0565b50505050905090810190601f1680156103085780820380516001836020036101000a031916815260200191505b509e50505050505050505050505050505060405180910390f35b34801561032e57600080fd5b506103d3600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506108b1565b005b3480156103e157600080fd5b506103ea6108d6565b604051808215151515815260200191505060405180910390f35b34801561041057600080fd5b506104b5600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506108ec565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104f55780820151818401526020810190506104da565b50505050905090810190601f1680156105225780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561053c57600080fd5b50610545610d49565b604051808215151515815260200191505060405180910390f35b34801561056b57600080fd5b5061058c600480360381019080803515159060200190929190505050610d5b565b005b60018181548110151561059d57fe5b90600052602060002090600a0201600091509050806000018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106495780601f1061061e57610100808354040283529160200191610649565b820191906000526020600020905b81548152906001019060200180831161062c57829003601f168201915b5050505050908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806003018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107335780601f1061070857610100808354040283529160200191610733565b820191906000526020600020905b81548152906001019060200180831161071657829003601f168201915b505050505090806004018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107d15780601f106107a6576101008083540402835291602001916107d1565b820191906000526020600020905b8154815290600101906020018083116107b457829003601'+
               'f168201915b505050505090806005015490806006018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108755780601f1061084a57610100808354040283529160200191610875565b820191906000526020600020905b81548152906001019060200180831161085857829003601f168201915b5050505050908060070160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806008015490806009015490508a565b6001808054905010156108c357600080fd5b6108cf848484846108ec565b5050505050565b60008060009054906101000a900460ff16905090565b60606108f6611067565b6108fe611067565b6060600061090a611081565b6109138a610d77565b94506109536040805190810160405280600181526020017f2e00000000000000000000000000000000000000000000000000000000000000815250610d77565b9350600161096a8587610da590919063ffffffff16565b0160405190808252806020026020018201604052801561099e57816020015b60608152602001906001900390816109895790505b509250600091505b82518210156109f2576109ca6109c58587610e1c90919063ffffffff16565b610e36565b83838151811015156109d857fe5b9060200190602002018190525081806001019250506109a6565b60048351141515610a0257600080fd5b826000815181101515610a1157fe5b90602001906020020151816000018190525033816020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505087816040019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050826001815181101515610aa257fe5b906020019060200201518160600181905250826002815181101515610ac357fe5b906020019060200201518160800181905250826003815181101515610ae457fe5b906020019060200201518160c00181905250868160a0018181525050888160e0019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050428161010001818152505043816101200181815250506001819080600181540180825580915050906001820390600052602060002090600a0201600090919290919091506000820151816000019080519060200190610b98929190611117565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506060820151816003019080519060200190610c43929190611117565b506080820151816004019080519060200190610c60929190611117565b5060a0820151816005015560c0820151816006019080519060200190610c87929190611117565b5060e08201518160070160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506101008201518160080155610120820151816009015550505061012c8710158015610cfc57506101908711155b15610d205760016000806101000a81548160ff021916908315150217905550610d21565b5b826003815181101515610d3057fe5b9060200190602002015195505050505050949350505050565b6000809054906101000a900460ff1681565b806000806101000a81548160ff02191690831515021790555050565b610d7f611067565b600060208301905060408051908101604052808451815260200182815250915050919050565b6000808260000151610dc98560000151866020015186600001518760200151610e98565b0190505b836000015184602001510181111515610e155781806001019250508260000151610e0d856020015183038660000151038386600001518760200151610e98565b019050610dcd565b5092915050565b610e24611067565b610e2f838383610f7e565b5092915050565b606080600083600001516040519080825280601f01601f191660200182016040528015610e725781602001602082028038833980820191505090505b509150602082019050610e8e818560200151866000015161101c565b8192505050919050565b60008060008060008060008060008b97508c8b111515610f685760208b111515610f225760018b60200360080260020a03196001029550858a511694508a8d8d010393508588511692505b84600019168360001916141515610f1a578388101515610f07578c8c019850610f6e565b8780600101985050858851169250610ee3565b879850610f6e565b8a8a209150600096505b8a8d0387111515610f67578a88209050806000191682600019161415610f5457879850610f6e565b6001880197508680600101975050610f2c565b5b8c8c0198505b5050505050505050949350505050565b610f86611067565b6000610fa48560000151866020015186600001518760200151610e98565b90508460200151836020018181525050846020015181038360000181815250508460000151856020015101811415610fe6576000856000018181525050611011565b8360000151836000015101856000018181510391508181525050836000015181018560200181815250505b829150509392505050565b60005b602082101515611044578251845260208401935060208301925060208203915061101f565b6001826020036101000a0390508019835116818551168181178652505050505050565b604080519081016040528060008152602001600081525090565b6101406040519081016040528060608152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160608152602001606081526020016000815260200160608152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061115857805160ff1916838001178555611186565b82800160010185558215611186579182015b8281111561118557825182559160200191906001019061116a565b5b5090506111939190611197565b5090565b6111b991905b808211156111b557600081600090555060010161119d565b5090565b905600a165627a7a723058208c0c6c9ebd27ce6dfcd80d1d2b55de8336f0913e7bb304b851ccf12b7a51b92a0029';
    return data;           
}