$(document).ready(function () {
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
		},
		{
			"constant": false,
			"inputs": [
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
				}
			],
			"name": "addStudent",
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
				}
			],
			"name": "airDropTokens",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
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
			"constant": false,
			"inputs": [
				{
					"name": "student",
					"type": "address"
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
					"name": "student",
					"type": "address"
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
				}
			],
			"name": "Verification",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"name": "addr",
					"type": "address"
				}
			],
			"name": "DigitalSignature",
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
			"constant": false,
			"inputs": [],
			"name": "enableTrading",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "msgHash",
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
			"name": "findAddress",
			"outputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
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
			"inputs": [
				{
					"name": "_addr",
					"type": "address"
				},
				{
					"name": "msgHash",
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
					"name": "student",
					"type": "address"
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
					"name": "_studentAddress",
					"type": "address"
				}
			],
			"name": "removeStudent",
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
				}
			],
			"name": "removeVerifiedParticipant",
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
			"constant": false,
			"inputs": [
				{
					"name": "participant",
					"type": "address"
				}
			],
			"name": "verifyParticipant",
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
			"constant": true,
			"inputs": [],
			"name": "registeredStudent",
			"outputs": [
				{
					"name": "studentAddress",
					"type": "address"
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
					"name": "",
					"type": "address"
				}
			],
			"name": "students",
			"outputs": [
				{
					"name": "studentAddress",
					"type": "address"
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
		}
	]);

	var _DHUCoinContract = DHUCoinContract.at('0xe4e839f5cd939af8be5642da51e38bf7ce1524d2');

	//Creates an instance of the contract
	//$("#btnDeployAdd").click(function () {
	//    var _addContract = $("#addContract").val();

	//    //Input check
	//    if (isEmpty(_addContract) || !isNumber(_addContract)) {
	//        InvalidAddressAlert();
	//        return;
	//    }

	//    _DHUCoinContract = DHUCoinContract.at(_addContract);
	//});

	//$("#btnDeploy").click(function () {
	//    var _startBlock = $("#startBlock").val();
	//    var _endBlock = $("#endBlock").val();

	//    _DHUCoinContract = DHUCoinContract.new(
	// '0x134b28CA4cb091A1ac887737dBb47F3D729a5FB8',
	// 800000,
	// _startBlock,
	// _endBlock,
	// {
	//     from: web3.eth.accounts[0],
	//     data: '0x60806040526040805190810160405280600781526020017f444855436f696e00000000000000000000000000000000000000000000000000815250600390805190602001906200005192919062000374565b506040805190810160405280600381526020017f4448550000000000000000000000000000000000000000000000000000000000815250600490805190602001906200009f92919062000374565b506012600555610e10600a556000600b55662386f26fc1000060135560006014806101000a81548160ff0219169083151502179055506000601460156101000a81548160ff0219169083151502179055506000601460166101000a81548160ff0219169083151502179055503480156200011857600080fd5b506040516080806200618e83398101806040528101908080519060200190929190805190602001909291908051906020019092919080519060200190929190505050600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141515156200019757600080fd5b8181111515620001a657600080fd5b600083111515620001b657600080fd5b33600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160176000600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600160176000600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060408051908101604052808481526020016103e8815250600c600082015181600001556020820151816001015590505081600681905550806007819055505050505062000423565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620003b757805160ff1916838001178555620003e8565b82800160010185558215620003e8579182015b82811115620003e7578251825591602001919060010190620003ca565b5b509050620003f79190620003fb565b5090565b6200042091905b808211156200041c57600081600090555060010162000402565b5090565b90565b615d5b80620004336000396000f3006080604052600436106102e0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630138e31b1461032557806306fdde031461038b578063095ea7b31461041b5780630db065f414610480578063129caa18146104db57806312ea965d1461050a578063133f44dc1461053557806318160ddd1461057857806318e23a56146105a35780631998524c146105fa5780631e9fb6af146106275780631ecfe64d1461065257806323b62b75146106b857806323b872dd1461070f57806328c0585614610794578063313ce567146107ef5780633437c9aa1461081a578063347820eb1461091957806334e91a1c146109445780633b233a4b14610adf57806347d70f7414610c815780634a9bc9c914610cac57806357b1960b14610cfe5780635b76481114610d5a5780635b8738c714610dc05780635c10fe0814610e2d5780635dd20b6d14610e5a5780635f972df814610e87578063660c3ba514610eed5780636bd2329314610f535780636f842b8014610fa257806370a0823114610fcf57806371b7d5c41461102657806378c4798c146110515780637c519ffb146110945780638677ebe8146110c35780638940aebe146111555780638a8c523c1461119d5780638ac2c680146111b45780638cecf66e146111df578063913f424c1461122057806391552b411461128d5780639281cd65146112d057806395d89b411461133f5780639d1b464a146113cf578063a6c807a914611401578063a6f2ae3a146115cf578063a9059cbb146115d9578063b7b6b1311461163e578063bc31c1c114611655578063ccb6cbe81461169d578063d1f1dc59146116c8578063d84dbdc31461170b578063db3188331461174e578063dcf72c10146117cf578063dd62ed3e14611805578063e241c1d91461187c578063e746ac8d146118d8578063e9e309271461191b578063eb8b860e14611987578063f47289e114611a21578063f66a79a014611a84575b3373ffffffffffffffffffffffffffffffffffffffff163273ffffffffffffffffffffffffffffffffffffffff1614151561031a57600080fd5b61032333611adb565b005b34801561033157600080fd5b5061036e60048036038101908080359060200190929190803590602001909291908035906020019092919080359060200190929190505050611cc6565b604051808381526020018281526020019250505060405180910390f35b34801561039757600080fd5b506103a0611d8c565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103e05780820151818401526020810190506103c5565b50505050905090810190601f16801561040d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561042757600080fd5b50610466600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611e2a565b604051808215151515815260200191505060405180910390f35b34801561048c57600080fd5b506104c1600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611fcb565b604051808215151515815260200191505060405180910390f35b3480156104e757600080fd5b506104f0611feb565b604051808215151515815260200191505060405180910390f35b34801561051657600080fd5b5061051f611ffe565b6040518082815260200191505060405180910390f35b34801561054157600080fd5b50610576600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612004565b005b34801561058457600080fd5b5061058d612156565b6040518082815260200191505060405180910390f35b3480156105af57600080fd5b506105b861215c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561060657600080fd5b5061062560048036038101908080359060200190929190505050612182565b005b34801561063357600080fd5b5061063c612283565b6040518082815260200191505060405180910390f35b34801561065e57600080fd5b5061069b60048036038101908080359060200190929190803590602001909291908035906020019092919080359060200190929190505050612290565b604051808381526020018281526020019250505060405180910390f35b3480156106c457600080fd5b506106cd612378565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561071b57600080fd5b5061077a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061239e565b604051808215151515815260200191505060405180910390f35b3480156107a057600080fd5b506107d5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061247f565b604051808215151515815260200191505060405180910390f35b3480156107fb57600080fd5b5061080461249f565b6040518082815260200191505060405180910390f35b34801561082657600080fd5b50610917600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001909291905050506124a5565b005b34801561092557600080fd5b5061092e612b86565b6040518082815260200191505060405180910390f35b34801561095057600080fd5b50610985600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612b8c565b60405180806020018060200180602001858152602001848103845288818151815260200191508051906020019080838360005b838110156109d35780820151818401526020810190506109b8565b50505050905090810190601f168015610a005780820380516001836020036101000a031916815260200191505b50848103835287818151815260200191508051906020019080838360005b83811015610a39578082015181840152602081019050610a1e565b50505050905090810190601f168015610a665780820380516001836020036101000a031916815260200191505b50848103825286818151815260200191508051906020019080838360005b83811015610a9f578082015181840152602081019050610a84565b50505050905090810190601f168015610acc5780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b348015610aeb57600080fd5b50610af4612e7f565b604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001806020018060200180602001858152602001848103845288818151815260200191508051906020019080838360005b83811015610b74578082015181840152602081019050610b59565b50505050905090810190601f168015610ba15780820380516001836020036101000a031916815260200191505b50848103835287818151815260200191508051906020019080838360005b83811015610bda578082015181840152602081019050610bbf565b50505050905090810190601f168015610c075780820380516001836020036101000a031916815260200191505b50848103825286818151815260200191508051906020019080838360005b83811015610c40578082015181840152602081019050610c25565b50505050905090810190601f168015610c6d5780820380516001836020036101000a031916815260200191505b509850505050505050505060405180910390f35b348015610c8d57600080fd5b50610c9661308b565b6040518082815260200191505060405180910390f35b348015610cb857600080fd5b50610ce16004803603810190808035906020019092919080359060200190929190505050613091565b604051808381526020018281526020019250505060405180910390f35b348015610d0a57600080fd5b50610d3d6004803603810190808035906020019092919080359060200190929190803590602001909291905050506130af565b604051808381526020018281526020019250505060405180910390f35b348015610d6657600080fd5b50610da360048036038101908080359060200190929190803590602001909291908035906020019092919080359060200190929190505050613151565b604051808381526020018281526020019250505060405180910390f35b348015610dcc57600080fd5b50610deb600480360381019080803590602001909291905050506131bf565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b348015610e3957600080fd5b50610e58600480360381019080803590602001909291905050506131fd565b005b348015610e6657600080fd5b50610e8560048036038101908080359060200190929190505050613362565b005b348015610e9357600080fd5b50610ed060048036038101908080359060200190929190803590602001909291908035906020019092919080359060200190929190505050613408565b604051808381526020018281526020019250505060405180910390f35b348015610ef957600080fd5b50610f3660048036038101908080359060200190929190803590602001909291908035906020019092919080359060200190929190505050613476565b604051808381526020018281526020019250505060405180910390f35b348015610f5f57600080fd5b50610f886004803603810190808035906020019092919080359060200190929190505050613824565b604051808215151515815260200191505060405180910390f35b348015610fae57600080fd5b50610fcd6004803603810190808035906020019092919050505061398e565b005b348015610fdb57600080fd5b50611010600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050613ae0565b6040518082815260200191505060405180910390f35b34801561103257600080fd5b5061103b613b29565b6040518082815260200191505060405180910390f35b34801561105d57600080fd5b50611092600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050613b2f565b005b3480156110a057600080fd5b506110a9613f3d565b604051808215151515815260200191505060405180910390f35b3480156110cf57600080fd5b5061113b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035600019169060200190929190803560ff16906020019092919080356000191690602001909291908035600019169060200190929190505050613f50565b604051808215151515815260200191505060405180910390f35b34801561116157600080fd5b506111806004803603810190808035906020019092919050505061400c565b604051808381526020018281526020019250505060405180910390f35b3480156111a957600080fd5b506111b26140de565b005b3480156111c057600080fd5b506111c9614167565b6040518082815260200191505060405180910390f35b3480156111eb57600080fd5b5061120a6004803603810190808035906020019092919050505061416d565b6040518082815260200191505060405180910390f35b34801561122c57600080fd5b5061126960048036038101908080359060200190929190803590602001909291908035906020019092919080359060200190929190505050614261565b60405180848152602001838152602001828152602001935050505060405180910390f35b34801561129957600080fd5b506112ce600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050614329565b005b3480156112dc57600080fd5b50611325600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019092919050505061447b565b604051808215151515815260200191505060405180910390f35b34801561134b57600080fd5b50611354614611565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015611394578082015181840152602081019050611379565b50505050905090810190601f1680156113c15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156113db57600080fd5b506113e46146af565b604051808381526020018281526020019250505060405180910390f35b34801561140d57600080fd5b50611442600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506146c1565b604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001806020018060200180602001858152602001848103845288818151815260200191508051906020019080838360005b838110156114c25780820151818401526020810190506114a7565b50505050905090810190601f1680156114ef5780820380516001836020036101000a031916815260200191505b50848103835287818151815260200191508051906020019080838360005b8381101561152857808201518184015260208101905061150d565b50505050905090810190601f1680156115555780820380516001836020036101000a031916815260200191505b50848103825286818151815260200191508051906020019080838360005b8381101561158e578082015181840152602081019050611573565b50505050905090810190601f1680156115bb5780820380516001836020036101000a031916815260200191505b509850505050505050505060405180910390f35b6115d76148df565b005b3480156115e557600080fd5b50611624600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506148ea565b604051808215151515815260200191505060405180910390f35b34801561164a57600080fd5b506116536149c9565b005b34801561166157600080fd5b50611680600480360381019080803590602001909291905050506149cb565b604051808381526020018281526020019250505060405180910390f35b3480156116a957600080fd5b506116b26149ef565b6040518082815260200191505060405180910390f35b3480156116d457600080fd5b50611709600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050614a6a565b005b34801561171757600080fd5b5061174c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050614bda565b005b34801561175a57600080fd5b506117ab600480360381019080803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190505050614d2c565b60405180848152602001838152602001828152602001935050505060405180910390f35b611803600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611adb565b005b34801561181157600080fd5b50611866600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050614f4f565b6040518082815260200191505060405180910390f35b34801561188857600080fd5b506118bb600480360381019080803590602001909291908035906020019092919080359060200190929190505050614fd6565b604051808381526020018281526020019250505060405180910390f35b3480156118e457600080fd5b50611919600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061506b565b005b34801561192757600080fd5b506119306151bd565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015611973578082015181840152602081019050611958565b505050509050019250505060405180910390f35b34801561199357600080fd5b506119df6004803603810190808035600019169060200190929190803560ff1690602001909291908035600019169060200190929190803560001916906020019092919050505061524b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b348015611a2d57600080fd5b50611a606004803603810190808035906020019092919080359060200190929190803590602001909291905050506152d8565b60405180848152602001838152602001828152602001935050505060405180910390f35b348015611a9057600080fd5b50611a99615300565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600080601760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515611b3657600080fd5b601460159054906101000a900460ff16151515611b5257600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515611b8e57600080fd5b6013543410151515611b9f57600080fd5b6006544310158015611bb2575060075443105b1515611bbd57600080fd5b611bc56149ef565b9150611bdf611bd934600c60000154615326565b83615361565b9050611beb8382615377565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015611c53573d6000803e3d6000fd5b508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f89f5adc174562e07c9c9b1cae7109bbecb21cf9d1b2847e550042b8653c54a0e3484604051808381526020018281526020019250505060405180910390a3505050565b6000807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f801515611cf357fe5b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f801515611d1d57fe5b8686097ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f801515611d4a57fe5b888609087ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f801515611d7857fe5b848709809250819350505094509492505050565b60038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015611e225780601f10611df757610100808354040283529160200191611e22565b820191906000526020600020905b815481529060010190602001808311611e0557829003601f168201915b505050505081565b6000600260046020820201600036905010151515611e4457fe5b6000831480611ecf57506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054145b1515611eda57600080fd5b82600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925856040518082815260200191505060405180910390a3600191505092915050565b60176020528060005260406000206000915054906101000a900460ff1681565b601460159054906101000a900460ff1681565b60065481565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806120ad5750600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b15156120b857600080fd5b6000601760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f38f4e6c50264e8bca08019bebb0ae5ed2a0fbf11d410a70d1996397ea993b7ca60405160405180910390a250565b60005481565b601460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156121de57600080fd5b600754431115156121ee57600080fd5b6000811115156121fd57600080fd5b80600c60010181905550600c60166000600b548152602001908152602001600020600082015481600001556001820154816001015590505042600b819055507ffa752e70ce40ef219f6b3772af7cd518a667f83c488b9db14283985a3bb0f001600c6000015482604051808381526020018281526020019250505060405180910390a150565b6000601580549050905090565b6000807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f8015156122bd57fe5b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f8015156122e757fe5b86867ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f03097ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561233657fe5b888609087ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561236457fe5b848709809250819350505094509492505050565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000601460169054906101000a900460ff16806124085750600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b806124605750601460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561246b57600080fd5b612476848484615537565b90509392505050565b60196020528060005260406000206000915054906101000a900460ff1681565b60055481565b60008060006001601760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550601860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209250600090505b6015805490508110156127b35760158181548110151561256457fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156127a65780915060156001601580549050038154811015156125dc57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660158381548110151561261657fe5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060158281548110151561266d57fe5b9060005260206000200160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055601860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160006127119190615c16565b6002820160006127219190615c16565b6003820160006127319190615c16565b6004820160009055505060158054809190600190036127509190615c5e565b5086836001019080519060200190612769929190615c8a565b5085836002019080519060200190612782929190615c8a565b508483600301908051906020019061279b929190615c8a565b508383600401819055505b8080600101915050612548565b868360010190805190602001906127cb929190615c8a565b50858360020190805190602001906127e4929190615c8a565b50848360030190805190602001906127fd929190615c8a565b50838360040181905550600160153390806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050600383600401541015801561288a57506004836004015411155b156128ec576001601960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550612945565b6000601960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b3373ffffffffffffffffffffffffffffffffffffffff167f38f4e6c50264e8bca08019bebb0ae5ed2a0fbf11d410a70d1996397ea993b7ca60405160405180910390a23373ffffffffffffffffffffffffffffffffffffffff167f758e08d0a7e4fd941ca3f1e9282b5a37adc67d0489d9e377f57eea1593c38b5a60405160405180910390a27f5edc7f098fc28261e50bb3c348e0971f66bf543eac0cfea01f29355c813f8b3c3388888888604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001806020018060200180602001858152602001848103845288818151815260200191508051906020019080838360005b83811015612a71578082015181840152602081019050612a56565b50505050905090810190601f168015612a9e5780820380516001836020036101000a031916815260200191505b50848103835287818151815260200191508051906020019080838360005b83811015612ad7578082015181840152602081019050612abc565b50505050905090810190601f168015612b045780820380516001836020036101000a031916815260200191505b50848103825286818151815260200191508051906020019080838360005b83811015612b3d578082015181840152602081019050612b22565b50505050905090810190601f168015612b6a5780820380516001836020036101000a031916815260200191505b509850505050505050505060405180910390a150505050505050565b600b5481565b60608060606000601860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101601860008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201601860008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600301601860008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040154838054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015612d315780601f10612d0657610100808354040283529160200191612d31565b820191906000526020600020905b815481529060010190602001808311612d1457829003601f168201915b50505050509350828054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015612dcd5780601f10612da257610100808354040283529160200191612dcd565b820191906000526020600020905b815481529060010190602001808311612db057829003601f168201915b50505050509250818054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015612e695780601f10612e3e57610100808354040283529160200191612e69565b820191906000526020600020905b815481529060010190602001808311612e4c57829003601f168201915b5050505050915093509350935093509193509193565b600e8060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015612f3f5780601f10612f1457610100808354040283529160200191612f3f565b820191906000526020600020905b815481529060010190602001808311612f2257829003601f168201915b505050505090806002018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015612fdd5780601f10612fb257610100808354040283529160200191612fdd565b820191906000526020600020905b815481529060010190602001808311612fc057829003601f168201915b505050505090806003018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561307b5780601f106130505761010080835404028352916020019161307b565b820191906000526020600020905b81548152906001019060200180831161305e57829003601f168201915b5050505050908060040154905085565b60075481565b6000806130a084848686613476565b80925081935050509250929050565b6000806000806000806000899450889350879250600091506000905060008a14156130e65760008081915080905096509650613144565b5b600085141515613139576000600186161415156131135761310a82828686613476565b80925081935050505b60028581151561311f57fe5b04945061312c8484613091565b80945081955050506130e7565b818180975081985050505b5050505050935093915050565b6000807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561317e57fe5b8487097ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f8015156131ab57fe5b848709809250819350505094509492505050565b6015818154811015156131ce57fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6007544311151561320d57600080fd5b601960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151561326557600080fd5b61326e81613362565b680d8d726b7177a80000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055506000601960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff167f758e08d0a7e4fd941ca3f1e9282b5a37adc67d0489d9e377f57eea1593c38b5a60405160405180910390a250565b600080600080600080600080600060016005426040518082815260200191505060405180910390206001900481151561339757fe5b060198506133a48a61400c565b975097506133b38989896130af565b95509550600193505b6001600501841115156133fc576133d48489896130af565b9250925085831480156133e657508482145b156133ef578390505b83806001019450506133bc565b50505050505050505050565b6000807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561343557fe5b8387097ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561346257fe5b858709809250819350505094509492505050565b60008060008060008814801561348c5750600087145b1561349c57858593509350613819565b6000861480156134ac5750600085145b156134bc57878793509350613819565b8588141561358b5784871415613586577ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f8015156134f657fe5b60007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561352257fe5b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561354c57fe5b8b8c096003090891507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561357f57fe5b8760020990505b61362e565b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f8015156135b557fe5b877ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f03860891507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561360657fe5b887ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f03870890505b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561365857fe5b867ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f037ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f8015156136a557fe5b8a7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f037ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f8015156136f257fe5b6136fb8661416d565b87026137068761416d565b880209080893507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561373757fe5b877ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f037ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561378457fe5b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f8015156137ae57fe5b877ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f036137da8661416d565b8702097ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561380757fe5b8c6138118761416d565b880209080892505b505094509492505050565b6000806000846000148061385757507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f85145b806138625750836000145b8061388c57507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f84145b1561389a5760009250613986565b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f8015156138c457fe5b84850991507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f8015156138f357fe5b60077ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561391f57fe5b600088027ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561394d57fe5b897ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561397857fe5b8b8c09090808905080821492505b505092915050565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480613a375750600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515613a4257600080fd5b600081111515613a5157600080fd5b613a5a816158fe565b80600c60000181905550600c60166000600b548152602001908152602001600020600082015481600001556001820154816001015590505042600b819055507ffa752e70ce40ef219f6b3772af7cd518a667f83c488b9db14283985a3bb0f00181600c60010154604051808381526020018281526020019250505060405180910390a150565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600a5481565b600080600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480613bdb5750600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515613be657600080fd5b6000601760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506000601960008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600090505b601580549050811015613d2657601581815481101515613cb757fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415613d19578091505b8080600101915050613c9b565b6015600160158054905003815481101515613d3d57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16601583815481101515613d7757fe5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550601582815481101515613dce57fe5b9060005260206000200160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055601860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000613e729190615c16565b600282016000613e829190615c16565b600382016000613e929190615c16565b600482016000905550506015805480919060019003613eb19190615c5e565b508273ffffffffffffffffffffffffffffffffffffffff167f38f4e6c50264e8bca08019bebb0ae5ed2a0fbf11d410a70d1996397ea993b7ca60405160405180910390a28273ffffffffffffffffffffffffffffffffffffffff167f758e08d0a7e4fd941ca3f1e9282b5a37adc67d0489d9e377f57eea1593c38b5a60405160405180910390a2505050565b601460169054906101000a900460ff1681565b60008573ffffffffffffffffffffffffffffffffffffffff16600186868686604051600081526020016040526040518085600019166000191681526020018460ff1660ff1681526020018360001916600019168152602001826000191660001916815260200194505050505060206040516020810390808403906000865af1158015613fe0573d6000803e3d6000fd5b5050506020604051035173ffffffffffffffffffffffffffffffffffffffff1614905095945050505050565b6000806000806000614061867f79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f817987f483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b86001614261565b8093508194508295505050506140768161416d565b90507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f8015156140a257fe5b81840994507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f8015156140d157fe5b8183099350505050915091565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561413a57600080fd5b6007544311151561414a57600080fd5b6001601460166101000a81548160ff021916908315150217905550565b60135481565b60008060008060008060009450600193507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f92508691505b6000821415156142545781838115156141ba57fe5b049050837ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f8015156141e857fe5b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561421257fe5b8684097ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f038708809550819650505081828202840380935081945050506141a5565b8495505050505050919050565b6000806000806000806000806000808d96508c95508b94508a935060009250600091506001905060008e14156142aa576000806001829250819150809050995099509950614318565b5b600087141515614308576000600188161415156142dd576142d0838383898989614d2c565b8093508194508295505050505b6002878115156142e957fe5b0496506142f78686866152d8565b8096508197508298505050506142ab565b828282809a50819b50829c505050505b505050505050509450945094915050565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806143d25750600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b15156143dd57600080fd5b6001601960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f758e08d0a7e4fd941ca3f1e9282b5a37adc67d0489d9e377f57eea1593c38b5a60405160405180910390a250565b600060036004602082020160003690501015151561449557fe5b83600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414151561451f57600080fd5b82600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925856040518082815260200191505060405180910390a360019150509392505050565b60048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156146a75780601f1061467c576101008083540402835291602001916146a7565b820191906000526020600020905b81548152906001019060200180831161468a57829003601f168201915b505050505081565b600c8060000154908060010154905082565b60186020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156147935780601f1061476857610100808354040283529160200191614793565b820191906000526020600020905b81548152906001019060200180831161477657829003601f168201915b505050505090806002018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156148315780601f1061480657610100808354040283529160200191614831565b820191906000526020600020905b81548152906001019060200180831161481457829003601f168201915b505050505090806003018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156148cf5780601f106148a4576101008083540402835291602001916148cf565b820191906000526020600020905b8154815290600101906020018083116148b257829003601f168201915b5050505050908060040154905085565b6148e833611adb565b565b6000601460169054906101000a900460ff16806149545750600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b806149ac5750601460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b15156149b757600080fd5b6149c183836159a7565b905092915050565b565b60166020528060005260406000206000915090508060000154908060010154905082565b6000806000614a0043600654615bdf565b91506064821015614a1857600c600101549250614a65565b60c8821015614a4557614a3b614a34600c60010154606e615326565b6064615361565b9050809250614a65565b614a5f614a58600c600101546078615326565b6064615361565b90508092505b505090565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515614ac657600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515614b0257600080fd5b80601460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160176000601460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060016014806101000a81548160ff02191690831515021790555050565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480614c835750600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515614c8e57600080fd5b6001601760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f38f4e6c50264e8bca08019bebb0ae5ed2a0fbf11d410a70d1996397ea993b7ca60405160405180910390a250565b6000806000806000806000808d148015614d46575060008c145b15614d5957898989965096509650614f3f565b60008a148015614d695750600089145b15614d7c578c8c8c965096509650614f3f565b898d148015614d8a5750888c145b15614dea57614d9b8d8c8f8e613151565b8094508195505050614db1848460036001613151565b8094508195505050614dc7848460006001611cc6565b8094508195505050614ddd8c8c60026001613151565b8092508193505050614e13565b614df689898e8e612290565b8094508195505050614e0a8a898f8e612290565b80925081935050505b614e1f84848484613408565b8094508195505050614e3384848686613151565b8093508198505050614e4787838f8e612290565b8093508198505050614e5b87838c8b612290565b8093508198505050614e6f8d8c8985612290565b8092508197505050614e8386828686613151565b8092508197505050614e9786828e8e612290565b80925081975050508082141515614f3a577ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f801515614ed257fe5b81880996507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f801515614f0157fe5b82870995507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f801515614f3057fe5b8183099450614f3e565b8194505b5b5050505096509650969350505050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6000806000806000614feb8888886001614261565b8093508194508295505050506150008161416d565b90507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561502c57fe5b81840994507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f80151561505b57fe5b8183099350505050935093915050565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806151145750600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561511f57600080fd5b6000601960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f758e08d0a7e4fd941ca3f1e9282b5a37adc67d0489d9e377f57eea1593c38b5a60405160405180910390a250565b6060601580548060200260200160405190810160405280929190818152602001828054801561524157602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116151f7575b5050505050905090565b6000600185858585604051600081526020016040526040518085600019166000191681526020018460ff1660ff1681526020018360001916600019168152602001826000191660001916815260200194505050505060206040516020810390808403906000865af11580156152c4573d6000803e3d6000fd5b505050602060405103519050949350505050565b60008060006152eb868686898989614d2c565b80935081945082955050505093509350939050565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600084141561533b576000915061535a565b828402905082848281151561534c57fe5b0414151561535657fe5b8091505b5092915050565b6000818381151561536e57fe5b04905092915050565b6000806014809054906101000a900460ff16151561539457600080fd5b6153b56153a884660644fd9b402d2d615326565b662386f26fc10000615361565b91506153c18383615bf8565b90506153cf60005482615bf8565b60008190555061541e600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205484615bf8565b600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506154cc60016000601460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205483615bf8565b60016000601460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050505050565b600060036004602082020160003690501015151561555157fe5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415151561558d57600080fd5b82600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410158015615658575082600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b80156156645750600083115b151561566f57600080fd5b6156b8600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205484615bdf565b600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550615744600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205484615bf8565b600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061580d600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205484615bdf565b600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a360019150509392505050565b6000600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156159a35781600c600001548111156159a15760009150615981615976846064615326565b600c60000154615361565b915061598e826064615bdf565b9150601482111515156159a057600080fd5b5b505b5050565b60006002600460208202016000369050101515156159c157fe5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141515156159fd57600080fd5b82600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410158015615a4c5750600083115b1515615a5757600080fd5b615aa0600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205484615bdf565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550615b2c600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205484615bf8565b600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a3600191505092915050565b6000828211151515615bed57fe5b818303905092915050565b6000808284019050838110151515615c0c57fe5b8091505092915050565b50805460018160011615610100020316600290046000825580601f10615c3c5750615c5b565b601f016020900490600052602060002090810190615c5a9190615d0a565b5b50565b815481835581811115615c8557818360005260206000209182019101615c849190615d0a565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10615ccb57805160ff1916838001178555615cf9565b82800160010185558215615cf9579182015b82811115615cf8578251825591602001919060010190615cdd565b5b509050615d069190615d0a565b5090565b615d2c91905b80821115615d28576000816000905550600101615d10565b5090565b905600a165627a7a72305820e4a5f001969dc8c8632fc0f6c046903fb1de1af3b9b1ca3032e037eb28ff50f50029',
	//     gas: '7300000'
	// }, function (e, contract) {
	//     console.log(e, contract);
	//     if (typeof contract.address !== 'undefined') {
	//         $("#transactionResult").html('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
	//     }
	// })
	//});

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

	function toHex(str) {
		var hex = '';
		for (var i = 0; i < str.length; i++) {
			hex += '' + str.charCodeAt(i).toString(16);
		}
		return hex;
	};

	//button to whitelist an address
	$("#btnVerify").click(function () {
		ResetNavbar();
		showHideLoader(0);

		var _toVerifyAdd = $("#toVerifyAdd").val();

		var addr = web3.eth.accounts[0];
		var hex_msg = '0x' + toHex(_toVerifyAdd);



		web3.eth.accounts.sign(hex_msg,'xD', function (err, res) {
			if (err) {
				alert('something went wrong puta');
			} else {

				var signature = res.toString().substring(2);
				var r = '0x' + signature.slice(0, 64);
				var s = '0x' + signature.slice(64, 128);
				var v = '0x' + signature.slice(128, 130);
				var v_decimal = web3.toDecimal(v);
				if (v_decimal != 27 || v_decimal != 28) {
					v_decimal += 27
				}
				// var fixed_msg = `\x19Ethereum Signed Message:\n${_toVerifyAdd.length}${_toVerifyAdd}`;
				var fixed_msg = _toVerifyAdd;
				var fixed_msg_sha = web3.sha3(fixed_msg);

				_DHUCoinContract.findAddress(fixed_msg_sha, v_decimal, r, s, (err, res) => {
					if (err) {
						showHideLoader(0);
					} else {
						ResetNavbar();
						// var result = res.toString();
						$("#transactionResult").html(res.toString() + '<br/>/ ' + fixed_msg_sha + '<br/>/ ' + v_decimal + '<br/>/ ' + r + '<br/>/ ' + s);
					}

				});
			}
		});

	});

	var digitalSignatureEvent = _DHUCoinContract.DigitalSignature({}, 'latest');

	digitalSignatureEvent.watch(function (error, result) {
		if (!error) {
			TransactionComplete(result);
					$("#transactionResult").html('Address signed: ' + result.args.addr);

		} else {
			alert("Something went wrong!");
			showHideLoader(0);
		}
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
		_DHUCoinContract.removeVerifiedInvestor(_addToRemove, (err, res) => {
			if (err) {
				showHideLoader(0);
			}
		});
		curEvent = Events["InvalidateEvent"];
	});

	//Common event for verifation
	var verificationEvent = _DHUCoinContract.Verification({}, 'latest');

	verificationEvent.watch(function (error, result) {
		if (!error) {
			TransactionComplete(result);
			switch (curEvent) {
				case Events["ValidateEvent"]:
					$("#transactionResult").html('Address verified: ' + result.args.investor);
					break;
				case Events["InvalidateEvent"]:
					$("#transactionResult").html('Address removed: ' + result.args.investor);
					break;
			}

		} else {
			alert("Something went wrong!");
			showHideLoader(0);
		}
	});

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
		_DHUCoinContract.authorizeStudent(_toAuthorizeAdd, (err, res) => {
			if (err) {
				showHideLoader(0);
			}
		});
		curEvent = Events["AuthorizeEvent"];
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
		_DHUCoinContract.removeAuthorizedStudent(_addToUnauthorize, (err, res) => {
			if (err) {
				showHideLoader(0);
			}
		});
		curEvent = Events["UnauthorizeEvent"];
	});


	//event for authorization
	var AuthorizationEvent = _DHUCoinContract.Authorization({}, 'latest');

	AuthorizationEvent.watch(function (error, result) {
		if (!error) {
			TransactionComplete(result);
			switch (curEvent) {
				case Events["AuthorizeEvent"]:
					$("#transactionResult").html('Student address authorized: ' + result.args.student);
					break;
				case Events["UnauthorizeEvent"]:
					$("#transactionResult").html('Student address unauthorized: ' + result.args.student);
					break;
			}

		} else {
			alert("Something went wrong!");
			showHideLoader(0);
		}
	});

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

	//button to add student to applicable list for mining
	$("#btnAddStudent").click(function () {
		ResetNavbar();
		var _studentId = $("#studentId").val();
		var _firstname = $("#firstname").val();
		var _lastname = $("#lastname").val();
		var _gpa = $("#gpa").val();

		showHideLoader(1);

		_DHUCoinContract.addStudent(_studentId, _firstname, _lastname, _gpa, (err, res) => {
			if (err) {
				showHideLoader(0);
			} else {
				curEvent = Events["AddStudentEvent"];
			}
		});
	});

	//event for adding student
	var AddStudentEvent = _DHUCoinContract.StudentInfo({}, 'latest');

	AddStudentEvent.watch(function (error, result) {
		if (!error) {
			TransactionComplete(result);
			switch (curEvent) {
				case Events["AddStudentEvent"]:
					$("#transactionResult").html('<br/>Student address: ' + result.args.studentAddress + ', <br/>StudentId: ' + result.args.studentID + ', <br/>Student firstName: ' + result.args.firstName + ', <br/>Student lastname: ' + result.args.lastName + ', <br/>Student gpa: ' + result.args.gpa);
					break;
			}

		} else {
			alert("Something went wrong!");
			showHideLoader(0);
		}
	});

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
				showHideLoader(0);
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
					if (j == 0) {
						studentStr += '<br/>Student ID: ' + students[j];
					} else if (j == 1) {
						studentStr += '<br/>Firstname: ' + students[j];
					} else if (j == 2) {
						studentStr += '<br/>Lastname: ' + students[j];
					} else {
						studentStr += '<br/>gpa: ' + students[j];
					}
				}

				$("#transactionResult").html('Student Info: ' + studentStr);
			}
		});
	});

	//button to mine tokens
	$("#btnMine").click(function () {
		ResetNavbar();
		var _privateKey = $("#privateKey").val();

		showHideLoader(1);
		_DHUCoinContract.proofOfWork(_privateKey, (err, res) => {
			if (err) {
				curEvent = Events["AuthorizeEvent"];
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
				$("#TransHash").html('Transaction Hash: ' + res);
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
				$("#TransHash").html('Transaction Hash: ' + res);
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
				$("#TransHash").html('Transaction Hash: ' + res);
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
			$("#transactionResult").html('Price updated: priceNumerator: ' + result.args.topInteger + ', priceDenominator: ' + result.args.bottomInteger);
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