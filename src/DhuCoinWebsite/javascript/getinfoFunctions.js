//Initiating web3 provider
if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

//Set the default account (Makes the executer in MetaMask as default)
web3.eth.defaultAccount = web3.eth.accounts[0];

//from external js
var DHUCoinContract = getDHUCoinABI();

//set contract address
var contractAddr = '0x0db3355e94fe02d6fe953d3256a3be7a7d42c179';
// $('#ContractAddress').html('Contract Address: ' + contractAddr);

//get the contract at the address
var _DHUCoinContract = DHUCoinContract.at(contractAddr);

function getSymbol() {
	_DHUCoinContract.symbol((err, res) => {
		if (err) {
			$("#contractSymbol").html('N/A');
		} else {
			$("#contractSymbol").html(res);
		}
	});
}

function getDecimal() {
	_DHUCoinContract.decimals((err, res) => {
		if (err) {
			$("#tokenDecimal").html('N/A');
		} else {
			$("#tokenDecimal").html('' + res);
		}
	});
}

function getContractName() {
	_DHUCoinContract.name((err, res) => {
		if (err) {
			$("#contractName").html('N/A');
		} else {
			$("#contractName").html('デジコ');
		}
	});
}

function getTotalSupply() {
	_DHUCoinContract.totalSupply((err, res) => {
		if (err) {
			$("#totalSupply").html('N/A');
		} else {
			$("#totalSupply").html(Math.round(res / Math.pow(10, 18)) + ' DHU');
		}
	});
}

function getPrice() {
	_DHUCoinContract.currentPrice((err, res) => {
		if (err) {
			$("#tokenPrice").html('N/A');
		} else {
			$("#tokenPrice").html(Math.round(res[0] / res[1]) + ' DHU/ETH');
		}
	});
}

// function getBlockInfo() {
// 	_DHUCoinContract.tgeStartBlock((err, res1) => {
// 		if (err) {} else {
// 			_DHUCoinContract.tgeEndBlock((err, res2) => {
// 				if (err) {} else {
// 					$("#blockPeriod").html(res1 + ' ~ ' + res2 + ' (≈' + (res2 - res1) / 10 / 60 + 'hrs)');
// 				}
// 			});
// 		}
// 	});
// }

function getAdminWallets() {
	_DHUCoinContract.mainWallet((err, res1) => {
		if (err) {} else {
			_DHUCoinContract.secondaryWallet((err, res2) => {
				if (err) {} else {
					$("#adminWallets").html('メインウオレット: ' + res1 + '<br/>' + 'セカンダリウオレット: ' + res2);
				}
			});
		}
	});
}