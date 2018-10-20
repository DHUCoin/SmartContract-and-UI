$(document).ready(function () {

	var curUserId = makeid();
	$('#UserId').html('UserId: ' + curUserId);

	function makeid() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 15; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	// const qr = new EthereumQRPlugin();
	// const qrCode = qr.toCanvas({
	// 	"to": "0x074b420fbc61bcca59e1a370733330fe5bc9f8bd",
	// 	"from": "0xda261f1d3b1ee75a3423525757442781d4df50d9",
	// 	"value": 1,
	// 	"gas": 100000,
	// 	"mode": "contract_function",
	// 	"functionSignature": {
	// 	  "name": "transfer",
	// 	  "payable": false,
	// 	  "name": "symbol",
	// 		"outputs": [
	// 			{
	// 			"name": "",
	// 			"type": "string"
	// 		}
	// 	]
	// 	},
	// 	"argsDefaults": [
	// 	  {
	// 		"name": "to",
	// 		"value": "0xtokensrecipient"
	// 	  },
	// 	  {
	// 		"name": "value",
	// 		"value": 1000000000000000000
	// 	  }
	// 	]
	//   }, {
	// 	selector: '#ethereum-qr-code',
	//   })

	//   qrCode.then((code) => {
	// 	console.log('Your QR is generated!')
	// 	console.log(code.value)
	//   });

	//Initiating web3 provider
	if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
	} else {
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	}

	//Set the default account (Makes the executer in MetaMask as default)
	web3.eth.defaultAccount = web3.eth.accounts[0];

	//ABI for contract
	var DHUCoinContract = web3.eth.contract([
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
			"inputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"name": "verified",
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
			"constant": false,
			"inputs": [
				{
					"name": "participant",
					"type": "address"
				},
				{
					"name": "id",
					"type": "string"
				}
			],
			"name": "removeVerifiedParticipant",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "studentsNumber",
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
			"name": "tgeStartBlock",
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
			"constant": true,
			"inputs": [
				{
					"name": "_address",
					"type": "address"
				}
			],
			"name": "getOneStudent",
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
					"type": "string"
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
			"constant": false,
			"inputs": [
				{
					"name": "participant",
					"type": "address"
				},
				{
					"name": "id",
					"type": "string"
				}
			],
			"name": "verifyParticipant",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "newTgeStartBlock",
					"type": "uint256"
				}
			],
			"name": "changeTgeStartBlock",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
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
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "studentsAccounts",
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
					"type": "uint256"
				}
			],
			"name": "proofOfWork",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
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
			"constant": false,
			"inputs": [
				{
					"name": "_signature",
					"type": "string"
				},
				{
					"name": "_studentID",
					"type": "string"
				},
				{
					"name": "_firstName",
					"type": "string"
				},
				{
					"name": "_lastName",
					"type": "string"
				},
				{
					"name": "_gpa",
					"type": "uint256"
				},
				{
					"name": "id",
					"type": "string"
				}
			],
			"name": "addStudent",
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
			"constant": true,
			"inputs": [],
			"name": "tgeEndBlock",
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
					"name": "",
					"type": "address"
				}
			],
			"name": "students",
			"outputs": [
				{
					"name": "signature",
					"type": "string"
				},
				{
					"name": "studentID",
					"type": "string"
				},
				{
					"name": "firstName",
					"type": "string"
				},
				{
					"name": "lastName",
					"type": "string"
				},
				{
					"name": "gpa",
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
			"inputs": [],
			"name": "haltTGE",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "unhaltTGE",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
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
			"constant": true,
			"inputs": [],
			"name": "tgeBottomIntegerPrice",
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
					"name": "student",
					"type": "address"
				},
				{
					"name": "id",
					"type": "string"
				}
			],
			"name": "authorizeStudent",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "newTgeEndBlock",
					"type": "uint256"
				}
			],
			"name": "changeTgeEndBlock",
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
					"name": "student",
					"type": "address"
				},
				{
					"name": "id",
					"type": "string"
				}
			],
			"name": "removeAuthorizedStudent",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
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
			"constant": false,
			"inputs": [
				{
					"name": "grantVestedDHUContractInput",
					"type": "address"
				}
			],
			"name": "setGrantVestedDHUContract",
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
			"constant": false,
			"inputs": [
				{
					"name": "_studentAddress",
					"type": "address"
				},
				{
					"name": "id",
					"type": "string"
				}
			],
			"name": "removeStudent",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
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

	var contractAddr = '0xef3ff3527ab3850d9d461ffe62e757d7a5cc9d50';
	$('#ContractAddress').html('Contract Address: ' + contractAddr);
	var _DHUCoinContract = DHUCoinContract.at(contractAddr);

	var curEvent;
	var Events = {
		"ValidateEvent": 1,
		"InvalidateEvent": 2,
		"StartBlockChangeEvent": 3,
		"EndBlockChangeEvent": 4,
		"MainWalletChangeEvent": 5,
		"SecondaryWalletChangeEvent": 6,
		"AuthorizeEvent": 7,
		"UnauthorizeEvent": 8,
		"AddStudentEvent": 9
	}

	//button to whitelist an address
	$("#btnVerify").click(function () {
		ResetNavbar();

		var _toVerifyAdd = $("#toVerifyAdd").val();
		//Input check
		if (isEmpty(_toVerifyAdd) || !isNumber(_toVerifyAdd)) {
			InvalidAddressAlert();
			return;
		}
		showHideLoader(1);

		web3.eth.getTransactionCount(web3.eth.accounts[0], "pending", (err, res) => {
			console.log(res);
			_DHUCoinContract.Verification({}, 'latest').watch((err, response) => {
				if (response.args.id == curUserId) {
					TransactionComplete(response);
					$("#transactionResult").html('Address verified: ' + response.args.participant);
				}
			});

			_DHUCoinContract.verifyParticipant.sendTransaction(_toVerifyAdd, curUserId, {
				nonce: res + 1
			}, (err, res) => {
				if (err) {
					showHideLoader(0);
				}
			});
		});
	});

	//button for blacklist an address
	$("#btnRemoveAdd").click(function () {
		ResetNavbar();
		var _addToRemove = $("#addToRemove").val();

		//Input check
		if (isEmpty(_addToRemove) || !isNumber(_addToRemove)) {
			InvalidAddressAlert();
			return;
		}
		showHideLoader(1);

		web3.eth.getTransactionCount(web3.eth.accounts[0], "pending", (err, res) => {
			console.log(res);
			_DHUCoinContract.Verification({}, 'latest').watch((err, response) => {
				if (response.args.id == curUserId) {
					TransactionComplete(response);
					$("#transactionResult").html('Address Removed: ' + response.args.participant);
				}
			});

			_DHUCoinContract.removeVerifiedParticipant.sendTransaction(_addToRemove, curUserId, {
				nonce: res + 1
			}, (err, res) => {
				if (err) {
					showHideLoader(0);
				}
			});
		});
	});

	//Common event for verifation
	// var verificationEvent = _DHUCoinContract.Verification({}, 'latest');

	// verificationEvent.watch(function (error, result) {
	// 	if (!error) {
	// 		TransactionComplete(result);

	// 		///////////////////////////@
	// 		// switch (curEvent) {
	// 		// 	case Events["ValidateEvent"]:
	// 		// 		$("#transactionResult").html('Address verified: ' + result.args.investor);
	// 		// 		break;
	// 		// 	case Events["InvalidateEvent"]:
	// 		// 		$("#transactionResult").html('Address removed: ' + result.args.investor);
	// 		// 		break;
	// 		// }

	// 	} else {
	// 		alert("Something went wrong!");
	// 		showHideLoader(0);
	// 	}
	// });

	//button to authorize students
	$("#btnAuthorize").click(function () {
		ResetNavbar();
		var _toAuthorizeAdd = $("#toAuthorizeAdd").val();

		//Input check
		if (isEmpty(_toAuthorizeAdd) || !isNumber(_toAuthorizeAdd)) {
			InvalidAddressAlert();
			return;
		}
		showHideLoader(1);

		web3.eth.getTransactionCount(web3.eth.accounts[0], "pending", (err, res) => {
			console.log(res);
			_DHUCoinContract.Authorization({}, 'latest').watch((err, response) => {
				if (response.args.id == curUserId) {
					TransactionComplete(response);
					$("#transactionResult").html('Address authorized: ' + response.args.student);
				}
			});

			_DHUCoinContract.authorizeStudent.sendTransaction(_toAuthorizeAdd, curUserId, {
				nonce: res + 1
			}, (err, res) => {
				if (err) {
					showHideLoader(0);
				}
			});
		});
	});

	//button to unauthorize student
	$("#btnUnauthorize").click(function () {
		ResetNavbar();
		var _addToUnauthorize = $("#addToUnauthorize").val();

		//Input check
		if (isEmpty(_addToUnauthorize) || !isNumber(_addToUnauthorize)) {
			InvalidAddressAlert();
			return;
		}
		showHideLoader(1);

		web3.eth.getTransactionCount(web3.eth.accounts[0], "pending", (err, res) => {
			console.log(res);
			_DHUCoinContract.Authorization({}, 'latest').watch((err, response) => {
				if (response.args.id == curUserId) {
					TransactionComplete(response);
					$("#transactionResult").html('Address unauthorized: ' + response.args.student);
				}
			});

			_DHUCoinContract.authorizeStudent.sendTransaction(_addToUnauthorize, curUserId, {
				nonce: res + 1
			}, (err, res) => {
				if (err) {
					showHideLoader(0);
				}
			});
		});
	});


	//event for authorization
	// var AuthorizationEvent = _DHUCoinContract.Authorization({}, 'latest');

	// AuthorizationEvent.watch(function (error, result) {
	// 	if (!error) {
	// 		TransactionComplete(result);

	// 		/////////////////////////@
	// 		switch (curEvent) {
	// 			case Events["AuthorizeEvent"]:
	// 				$("#transactionResult").html('Student address authorized: ' + result.args.student);
	// 				break;
	// 			case Events["UnauthorizeEvent"]:
	// 				$("#transactionResult").html('Student address unauthorized: ' + result.args.student);
	// 				break;
	// 		}

	// 	} else {
	// 		alert("Something went wrong!");
	// 		showHideLoader(0);
	// 	}
	// });

	//button for checking if a student is applicable or not
	$("#btnCheckAuthorization").click(function () {
		ResetNavbar();
		var _addToChkAuth = $("#addToChkAuth").val();
		//Input check
		if (isEmpty(_addToChkAuth) || !isNumber(_addToChkAuth)) {
			InvalidAddressAlert();
			return;
		}
		showHideLoader(1);

		_DHUCoinContract.applicableStudents(_addToChkAuth, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Applicable Student: ' + res);
			}
		});
	});

	//button to add student 
	$("#btnAddStudent").click(function () {
		ResetNavbar();
		var _studentId = $("#studentId").val();
		var _firstname = $("#firstname").val();
		var _lastname = $("#lastname").val();
		var _gpa = $("#gpa").val() * 100; //to allow decimals multiply by 100 and when displaying divide by 100

		showHideLoader(1);

		var studentInfo = _studentId + '\n' + _firstname + '\n' + _lastname + '\n' + _gpa;

		// Sign student info
		var addr = web3.eth.accounts[0];
		var hex_msg = web3.sha3(studentInfo);
		// var hex_msg = '0x' + toHex(studentInfo);

		web3.personal.sign(hex_msg, addr, function (err, res) {
			if (err) {
				alert('Could not sign information provided. Please try again.');
				showHideLoader(0);
				return;
			} else {

				// var proceed = confirm('Would you like to proceed to registration?');

				// if (proceed) {
				// } else {
				// 	ResetNavbar();
				// 	return;
				// }

				web3.eth.getTransactionCount(web3.eth.accounts[0], "pending", (err, res) => {
					console.log(res);
					_DHUCoinContract.StudentInfo({}, 'latest').watch((err, response) => {
						if (response.args.id == curUserId) {
							$("#transactionResult").html('<br/>Student address: ' + result.args.studentAddress +
								', <br/>StudentId: ' + result.args.studentID +
								', <br/>Student firstName: ' + result.args.firstName +
								', <br/>Student lastname: ' + result.args.lastName +
								', <br/>Student gpa: ' + result.args.gpa);
						}
					});

					// Save signature public key to the contract 
					signature = res.toString();

					_DHUCoinContract.addStudent.sendTransaction(signature, _studentId, _firstname, _lastname, _gpa, curUserId, {
						nonce: res + 1
					}, (err, res) => {
						if (err) {
							showHideLoader(0);
						}
					});
				});
			}
		});
	});

	//event for adding student
	// var AddStudentEvent = _DHUCoinContract.StudentInfo({}, 'latest');

	// AddStudentEvent.watch(function (error, result) {
	// 	if (!error) {
	// 		TransactionComplete(result);

	// 		///////////////////////@
	// 		switch (curEvent) {
	// 			case Events["AddStudentEvent"]:
	// 				$("#transactionResult").html('<br/>Student address: ' + result.args.studentAddress +
	// 					', <br/>StudentId: ' + result.args.studentID +
	// 					', <br/>Student firstName: ' + result.args.firstName +
	// 					', <br/>Student lastname: ' + result.args.lastName +
	// 					', <br/>Student gpa: ' + result.args.gpa);
	// 				break;
	// 		}

	// 	} else {
	// 		alert("Something went wrong!");
	// 		showHideLoader(0);
	// 	}
	// });

	//Button to remove student from applicable list
	$("#btnRemoveStudent").click(function () {
		ResetNavbar();
		var _addtoRemoveAuth = $("#addtoRemoveAuth").val();

		//Input check
		if (isEmpty(_addtoRemoveAuth) || !isNumber(_addtoRemoveAuth)) {
			InvalidAddressAlert();
			return;
		}

		showHideLoader(1);
		_DHUCoinContract.removeStudent(_addtoRemoveAuth, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				$("#TransHash").html('Transaction Hash: ' + res);
			}
		});
	});

	//button for getting all students
	$("#btnGetAllStudents").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.getAllStudents((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				var students = res.toString().split(',');
				var studentStr = "";

				for (i = 0; i < students.length; i++) {
					studentStr += '<br/>Student ' + (i + 1).toString() + ': ' + students[i];
				}

				$("#transactionResult").html('Total No. of students: ' + students.length + studentStr);
			}
		});
	});

	//button for getting one students
	$("#btnGetOneStudent").click(function () {
		ResetNavbar();
		var _addOneStudent = $("#addOneStudent").val();

		//Input check
		if (isEmpty(_addOneStudent) || !isNumber(_addOneStudent)) {
			InvalidAddressAlert();
			return;
		}

		showHideLoader(1);
		_DHUCoinContract.getOneStudent(_addOneStudent, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				var students = res.toString().split(',');
				var studentStr = "";

				for (j = 0; j < students.length; j++) {
					if (j == 1) {
						studentStr += '<br/>Student ID: ' + students[j];
					} else if (j == 2) {
						studentStr += '<br/>Firstname: ' + students[j];
					} else if (j == 3) {
						studentStr += '<br/>Lastname: ' + students[j];
					} else if (j == 4) {
						studentStr += '<br/>gpa: ' + students[j] / 100;
					}
				}

				$("#transactionResult").html('Student Info: ' + studentStr);
			}
		});
	});

	// Check if student info is signed or not button
	$("#btnCheckIfSigned").click(function () {
		ResetNavbar();
		showHideLoader(1);
		var _studentAddr = $("#checkIfSigned").val();

		//Input check
		if (isEmpty(_studentAddr) || !isNumber(_studentAddr)) {
			InvalidAddressAlert();
			ResetNavbar();
			return;
		}

		// Get student info from the contract 
		_DHUCoinContract.getOneStudent(_studentAddr, (err, res) => {
			if (err) {
				showHideLoader(0);
				alert('Something went wrong');
			} else {
				var students = res.toString().split(',');
				var studentStr = "";

				var signature = '';
				var studentId = '';
				var firstName = '';
				var lastName = '';
				var gpa = '';

				for (j = 0; j < students.length; j++) {
					if (j == 0) {
						studentStr += "\nStudent signature: " + students[j];
						signature = students[j];
					} else if (j == 1) {
						studentStr += "\nStudent ID: " + students[j];
						studentId = students[j];
					} else if (j == 2) {
						studentStr += "\nFirstname: " + students[j];
						firstName = students[j];
					} else if (j == 3) {
						studentStr += "\nLastname: " + students[j];
						lastName = students[j];
					} else {
						studentStr += "\ngpa: " + students[j] / 100;
						gpa = students[j];
					}
				}

				if (signature === '') {
					ResetNavbar();
					alert('No such student');
					return;
				}

				var proceed = confirm("Proceed with the following information? \nStudent Info: " + studentStr);
				if (proceed) {

					var studentInfo = studentId + '\n' + firstName + '\n' + lastName + '\n' + gpa;
					var hex_msg = web3.sha3(studentInfo);

					var r = signature.slice(0, 66);
					var s = '0x' + signature.slice(66, 130);
					var v = '0x' + signature.slice(130, 132);
					v = web3.toDecimal(v);

					// Check if the student signed the info or not
					_DHUCoinContract.isSigned(hex_msg, v, r, s, (err, res) => {
						if (err) {
							ResetNavbar();
							alert('Something went wrong');
							return;
						} else {
							showHideLoader(0);
							var response = res.toString() === _studentAddr ? 'true' : 'false';
							$("#transactionResult").html('Is signed: ' + response);
						}
					});
				} else {
					ResetNavbar();
					return;
				}
			}
		});

	});

	//button to mint tokens
	$("#btnMine").click(function () {
		ResetNavbar();
		var _privateKey = $("#privateKey").val();

		showHideLoader(1);
		_DHUCoinContract.proofOfWork(_privateKey, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				$("#transactionResult").html('Transaction Hash: ' + res);
				showHideLoader(0);
			}
		});
	});

	//Button to update main wallet
	$("#btnNewMW").click(function () {
		ResetNavbar();
		var _addMW = $("#addMW").val();

		//Input check
		if (isEmpty(_addMW) || !isNumber(_addMW)) {
			InvalidAddressAlert();
			return;
		}

		showHideLoader(1);
		_DHUCoinContract.changeMainWallet(_addMW, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				$("#transactionResult").html('Transaction Hash: ' + res);
				showHideLoader(0);
			}
		});
	});

	//Button to update secondary wallet
	$("#btnNewSW").click(function () {
		ResetNavbar();
		var _addSW = $("#addSW").val();

		//Input check
		if (isEmpty(_addSW) || !isNumber(_addSW)) {
			InvalidAddressAlert();
			return;
		}

		showHideLoader(1);
		_DHUCoinContract.changeSecondaryWallet(_addSW, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				$("#transactionResult").html('Transaction Hash: ' + res);
				showHideLoader(0);
			}
		});
	});

	//Event for checking start/end block
	//var WalletChangeEvent = _DHUCoinContract.WalletChanged({}, 'latest');

	//WalletChangeEvent.watch(function (error, result) {
	//    if (!error) {
	//        TransactionComplete(result);

	//        switch (curEvent) {
	//            case Events["MainWalletChangeEvent"]:
	//                $("#transactionResult").html('New Main Wallet: ' + result.args.newAddress);
	//                break;
	//            case Events["SecondaryWalletChangeEvent"]:
	//                $("#transactionResult").html('New Secondary Wallet: ' + result.args.newAddress);
	//                break;
	//            default:
	//                alert("Something went wrong!");
	//        }

	//    } else {
	//        alert("Something went wrong!");
	//        showHideLoader(0);
	//    }
	//});

	//Button to update tge start block
	$("#btnNewStartBlock").click(function () {
		ResetNavbar();
		var _newStartBlock = $("#newStartBlock").val();
		showHideLoader(1);

		_DHUCoinContract.changeTgeStartBlock(_newStartBlock, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				$("#transactionResult").html('Transaction Hash: ' + res);
				showHideLoader(0);
			}
		});
	});

	//Button to update tge End block
	$("#btnNewEndBlock").click(function () {
		ResetNavbar();
		var _newEndBlock = $("#newEndBlock").val();
		showHideLoader(1);

		_DHUCoinContract.changeTgeEndBlock(_newEndBlock, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				$("#TransHash").html('Transaction Hash: ' + res);
				showHideLoader(0);
			}
		});
	});

	//Event for checking start/end block
	//var ICOBlockChangeEvent = _DHUCoinContract.ICOBlockChanged({}, 'latest');

	//ICOBlockChangeEvent.watch(function (error, result) {
	//    if (!error) {
	//        TransactionComplete(result);

	//        switch (curEvent) {
	//            case Events["StartBlockChangeEvent"]:
	//                $("#transactionResult").html('New ICO start block: ' + result.args.block);
	//                break;
	//            case Events["EndBlockChangeEvent"]:
	//                $("#transactionResult").html('New ICO end block: ' + result.args.block);
	//                break;
	//            default:
	//                alert("Something went wrong!");
	//        }

	//    } else {
	//        alert("Something went wrong!");
	//        showHideLoader(0);
	//    }
	//});

	//Button to enable trading
	$("#btnEnableTrading").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.enableTrading((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				$("#TransHash").html('Transaction Hash: ' + res);
				showHideLoader(0);
			}
		});
	});

	//Button to liquidate
	$("#btnLiquidate").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.liquidate((err, res) => {
			if (err) {
				showHideLoader(0);
			}
		});
	});

	//Event for liquidation
	//var LiquidateEvent = _DHUCoinContract.Liquidations({}, 'latest');

	//LiquidateEvent.watch(function (error, result) {
	//    if (!error) {
	//        TransactionComplete(result);
	//        $("#transactionResult").html('Investor: ' + result.args.investor + ', Amount of tokens: ' + result.args.amountTokens + ', Amount of Ether: ' + result.args.etherAmount);
	//    } else {
	//        alert("Something went wrong!");
	//        showHideLoader(0);
	//    }
	//});

	//button to halt ICO
	//$("#btnHaltICO").click(function () {
	//    ResetNavbar();
	//    showHideLoader(1);
	//    _DHUCoinContract.haltICO((err, res) => {
	//        if (err) {
	//            showHideLoader(0);
	//        } else {
	//            $("#TransHash").html('Transaction Hash: ' + res);
	//            showHideLoader(0);
	//        }
	//    });
	//});

	//button to unhalt ICO
	//$("#btnUnhaltICO").click(function () {
	//    ResetNavbar();
	//    showHideLoader(1);
	//    _DHUCoinContract.unhaltICO((err, res) => {
	//        if (err) {
	//            showHideLoader(0);
	//        } else {
	//            $("#TransHash").html('Transaction Hash: ' + res);
	//            showHideLoader(0);
	//        }
	//    });
	//});

	//Button to Request liquidation
	$("#btnRequestLiquidation").click(function () {
		ResetNavbar();
		var _tokensToLiquidate = $("#tokensToLiquidate").val();
		showHideLoader(1);
		_DHUCoinContract.requestLiquidation(_tokensToLiquidate, (err, res) => {
			if (err) {
				showHideLoader(0);
			}
		});
	});

	//Event for liquidation request
	//var RequestLiquidateEvent = _DHUCoinContract.LiquidationCall({}, 'latest');

	//RequestLiquidateEvent.watch(function (error, result) {
	//    if (!error) {
	//        TransactionComplete(result);
	//        $("#transactionResult").html('Investor: ' + result.args.investor + ', Amount of tokens: ' + result.args.amountTokens);
	//    } else {
	//        alert("Something went wrong!");
	//        showHideLoader(0);
	//    }
	//});


	//Button to add liquidity
	//$("#btnAddLiquidity").click(function () {
	//    ResetNavbar();
	//    showHideLoader(1);
	//    _DHUCoinContract.addLiquidity((err, res) => {
	//        if (err) {
	//            showHideLoader(0);
	//        }
	//    });
	//});

	//Event for adding liquidity
	//var Addliquidity = _DHUCoinContract.AddLiquidity({}, 'latest');

	//Addliquidity.watch(function (error, result) {
	//    if (!error) {
	//        TransactionComplete(result);
	//        $("#transactionResult").html('Amount of ether: ' + result.args.etherAmount);
	//    } else {
	//        alert("Something went wrong!");
	//        showHideLoader(0);
	//    }
	//});

	//Button to remove liquidity
	//$("#btnRemoveLiquidity").click(function () {
	//    ResetNavbar();
	//    var _tokensToRemoveLiq = $("#tokensToRemoveLiq").val();
	//    showHideLoader(1);
	//    _DHUCoinContract.removeLiquidity(_tokensToRemoveLiq, (err, res) => {
	//        if (err) {
	//            showHideLoader(0);
	//        }
	//    });
	//});

	//Event for removing liquidity
	//var RemoveLiquidityEvent = _DHUCoinContract.RemoveLiquidity({}, 'latest');

	//RemoveLiquidityEvent.watch(function (error, result) {
	//    if (!error) {
	//        TransactionComplete(result);
	//        $("#transactionResult").html('Amount of ether: ' + result.args.etherAmount);
	//    } else {
	//        alert("Something went wrong!");
	//        showHideLoader(0);
	//    }
	//});

	//button for setting grant vested contract
	$("#btnSetVestedContract").click(function () {
		ResetNavbar();
		var _vestedContractAdd = $("#vestedContractAdd").val();
		//Input check
		if (isEmpty(_vestedContractAdd) || !isNumber(_vestedContractAdd)) {
			InvalidAddressAlert();
			return;
		}
		showHideLoader(1);
		_DHUCoinContract.setGrantVestedDHUContract(_vestedContractAdd, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				$("#TransHash").html('Transaction Hash: ' + res);
				showHideLoader(0);
			}
		});
	});

	//button to update top price integer
	$("#btnUpdatePrice").click(function () {
		ResetNavbar();
		showHideLoader(1);
		var _updatePriceTop = $("#updatePriceTop").val();
		_DHUCoinContract.updatePriceDHU(_updatePriceTop, (err, res) => {
			if (err) {
				showHideLoader(0);
			}
		});
	});

	//button to update bottom price integer
	$("#btnUpdateBtmPrice").click(function () {
		ResetNavbar();
		showHideLoader(1);
		var _updatePriceBtm = $("#updatePriceBtm").val();
		_DHUCoinContract.updatePriceBottomInteger(_updatePriceBtm, (err, res) => {
			if (err) {
				showHideLoader(0);
			}
		});
	});

	//Common event for getting updated price
	var updatePriceEvent = _DHUCoinContract.PriceDHUUpdate({}, 'latest');

	updatePriceEvent.watch(function (error, result) {
		if (!error) {
			TransactionComplete(result);

			////////////////////@
			// $("#transactionResult").html('Price updated: priceNumerator: ' + result.args.topInteger + ', priceDenominator: ' + result.args.bottomInteger);
		} else {
			alert("Something went wrong!");
			showHideLoader(0);
		}
	});

	//button for checking if verified or not
	$("#btnCheckVer").click(function () {
		ResetNavbar();
		var _addToChk = $("#addToChk").val();
		//Input check
		if (isEmpty(_addToChk) || !isNumber(_addToChk)) {
			InvalidAddressAlert();
			return;
		}
		showHideLoader(1);

		_DHUCoinContract.verified(_addToChk, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Verified: ' + res);
			}
		});
	});

	//button for checking total supply
	$("#btnCheckSup").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.totalSupply((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Total supply: ' + res / Math.pow(10, 18) + ' DHU');
			}
		});
	});

	//Button for checking symbol
	$("#btnCheckSym").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.symbol((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Current symbol: ' + res);
			}
		});
	});

	//Button to check contract name
	$("#btnCheckName").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.name((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Contract name: ' + res);
			}
		});
	});

	//Button for checking tge start block
	$("#btnCheckSBlk").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.tgeStartBlock((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Crowd sale starts at block No. ' + res);
			}
		});
	});

	//Button for checking tge end block
	$("#btnCheckEBlk").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.tgeEndBlock((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Crowd sale ends at block No. ' + res);
			}
		});
	});

	//Button for checking balance of people
	$("#btnCheckBal").click(function () {
		ResetNavbar();
		var _addToChkBal = $("#addToChkBal").val();
		//Input check
		if (isEmpty(_addToChkBal) || !isNumber(_addToChkBal)) {
			InvalidAddressAlert();
			return;
		}
		showHideLoader(1);

		_DHUCoinContract.balanceOf(_addToChkBal, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Balance: ' + res / Math.pow(10, 18) + ' DHU');
			}
		});
	});

	//Button to check liquidation
	$("#btnCheckLiq").click(function () {
		ResetNavbar();
		var _valLiquidChk = $("#valLiquidChk").val();
		showHideLoader(1);
		_DHUCoinContract.checkLiquidationValue(_valLiquidChk, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Liquidation value: ' + res);
			}
		});
	});

	//Button for checking Max supply
	//$("#btnMaxSupply").click(function () {
	//    ResetNavbar();
	//    showHideLoader(1);
	//    _DHUCoinContract.maxSupply((err, res) => {
	//        if (err) {
	//            showHideLoader(0);
	//        } else {
	//            ResetNavbar();
	//            $("#transactionResult").html('Max Supply: ' + res / Math.pow(10, 18) + ' DHU');
	//        }
	//    });
	//});

	//Button for checking set trading status 
	$("#btnSetTrading").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.setTrading((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Set Trading: ' + res);
			}
		});
	});

	//button for checking liquidation request status
	$("#btnChkLiqReqSta").click(function () {
		ResetNavbar();
		var _addLiquidations = $("#addLiquidations").val();
		//Input check
		if (isEmpty(_addLiquidations) || !isNumber(_addLiquidations)) {
			InvalidAddressAlert();
			return;
		}
		showHideLoader(1);

		_DHUCoinContract.liquidations(_addLiquidations, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Tokens: ' + res[0] + ', Time: ' + res[1]);
			}
		});
	});

	//Button for checking secondary wallet
	$("#btnChkSecWallet").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.secondaryWallet((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Secondary wallet: ' + res);
			}
		});
	});

	//Button for checking main wallet
	$("#btnChkMainWallet").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.mainWallet((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Main wallet: ' + res);
			}
		});
	});

	//Button for checking granted vesting contract address
	$("#btnChkGVCA").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.grantVestedDHUContract((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Grant vested DHU contract address: ' + res);
			}
		});
	});

	//Button for checking price update waiting time
	$("#btnChkPriceUp").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.priceUpdateWaitingTime((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Price update wait time: ' + res + ' sec' + ' (' + res / 60 / 60 + ' hr/hrs)');
			}
		});
	});

	//button for checking DHU price
	//$("#btnChkDHUPri").click(function () {
	//    ResetNavbar();
	//    var _valDHUPrice = $("#valDHUPrice").val();
	//    showHideLoader(1);

	//    _DHUCoinContract.prices(_valDHUPrice, (err, res) => {
	//        if (err) {
	//            showHideLoader(0);
	//        } else {
	//            ResetNavbar();
	//            $("#transactionResult").html('Top Integer: ' + res[0] + ', Bottom Integer: ' + res[1]);
	//        }
	//    });
	//});

	//Button for checking min investment value
	$("#btnChkMinInv").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.minInvestment((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Min investment value: ' + res / Math.pow(10, 18) + ' ETH');
			}
		});
	});

	//Button for checking tge bottom Integer
	$("#btnChkICOBtm").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.tgeBottomIntegerPrice((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('TGE bottom integer: ' + res);
			}
		});
	});

	//Button for checking decimals
	$("#btnChkDecimals").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.decimals((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Decimals: ' + res);
			}
		});
	});

	//Button for checking current price
	$("#btnChkCurPrice").click(function () {
		ResetNavbar();
		showHideLoader(1);
		_DHUCoinContract.currentPrice((err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				ResetNavbar();
				$("#transactionResult").html('Top Integer: ' + res[0] + ', Bottom Integer: ' + res[1]);
			}
		});
	});

	//button for changing price update wait time
	$("#btnChngPriUpdTime").click(function () {
		ResetNavbar();
		var _valChngPriUpdTime = $("#valChngPriUpdTime").val();
		showHideLoader(1);

		_DHUCoinContract.changePriceUpdateWaitingTime(_valChngPriUpdTime, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				$("#TransHash").html('Transaction Hash: ' + res);
				showHideLoader(0);
			}
		});
	});

	//Clear navbar
	function ResetNavbar() {
		showHideLoader(0);
		$("#insTrans").html('');
		$("#transBlock").html('');
		$("#TransHash").html('');
		$("#transactionResult").html('');
	}

	//Common info function (only on successful transaction)
	function TransactionComplete(block) {
		if (block.blockHash != $("#insTrans").html())
			showHideLoader(0);
		$("#insTrans").html('Block hash: ' + block.blockHash);
		$("#transBlock").html('Transaction Block: ' + block.blockNumber);
	}

	//Alert if no address is found
	function InvalidAddressAlert() {
		alert('Please enter a valid address');
	}

	//Empty string check
	function isEmpty(str) {
		return (!str || 0 === str.length);
	}

	//Loading image switch (0: off, 1: on)
	function showHideLoader(onOff) {
		if (onOff == 1) {
			var sLoader = $("#loader").show();
		} else {
			var hLoader = $("#loader").hide();
		}
	}

	//Check if input is a number (address)
	function isNumber(str) {
		if (isNaN(str)) {
			return false;
		} else {
			return true;
		}
	}

});