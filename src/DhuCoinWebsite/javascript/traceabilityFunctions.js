$(document).ready(function () {
	//Change address to the database address in use////////////////////////////////////////////////////////
	var DatabaseAddr = '0x2129ccd950dee7c62e9ae87306ac6a14fd8b4632';

	//Initiating web3 provider
	if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
	} else {
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	}

	//Set the default account (Makes the executer in MetaMask as default)
	web3.eth.defaultAccount = web3.eth.accounts[0];

	///////////////////////////////////Seminar contract//////////////////////////////////////////////

	//ABI for contract
	var Seminar = web3.eth.contract([
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

	//Change address to the Seminar address in use////////////////////////////////////////////////////////////////
	var _Seminar = Seminar.at('0x156eccd5984a4fdcacceeac31fbac6a63a273b98');

	//button to use createProduct function of the product factory
	$("#createProductCat").click(function () {
		Showloader();
		var _productName = $("#productCatName").val();
		var _info = $("#info").val();
		var _ownerName = $("#ownerName").val();
		var _ownerInfo = $("#ownerInfo").val();

		_Seminar.createProduct(_productName, _info, DatabaseAddr, _ownerName, _ownerInfo, (err, res) => {
			if (err) {
				hideloader();
			} else {
				hideloader();
			}
		});

	});

	///////////////////////////////////Database contract///////////////////////////////////////////////

	//ABI for contract
	var DatabaseContract = web3.eth.contract([
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

	var _DatabaseContract = DatabaseContract.at(DatabaseAddr);

	//Get all the products list from the database contract
	// function getProductData() {
	// 	_DatabaseContract.getAllSeminars((err, res) => {
	// 		if (err) {
	// 			console.log(res);
	// 		} else {
	// 			loadProductData(res);
	// 		}
	// 	});
	// }

	function getIndividualseminar(seminarAddress) {
		Showloader();
		_DatabaseContract.getSeminar(seminarAddress, (err, res) => {
			if (err) {} else {
				loadSeminarInfo(res);
				if (res[0] === "") {
					alert("オーナーが見つかりませんでした。");
				}
				hideloader();
			}
		});
	}

	function loadSeminarInfo(seminar) {
		document.getElementById('seminarName').value = seminar[0];

		var studentsInSeminar = seminar[3];
		var div = document.getElementById('studentsInSeminarList');
		removeTextInputs(div.children);

		for (i = 0; i < studentsInSeminar.length; i++) {
			var input = document.createElement("input");
			input.type = "text";
			input.className = "form-control";
			input.value = studentsInSeminar[i];
			div.appendChild(input);
		}
	}

	function removeTextInputs(element) {
		var allInputs = [];

		for (i = 0; i < element.length; i++) {
			if (element[i].tagName == "INPUT") {
				allInputs.push(element[i]);
			}
		}

		for (i = 0; i < allInputs.length; i++) {
			allInputs[i].parentNode.removeChild(allInputs[i]);
		}
	}

	$('#btnSearchSeminar').click(function () {
		var _seminarToSearch = $('#seminarToSearch').val();
		if (_seminarToSearch.length > 0) {
			getIndividualseminar(_seminarToSearch);
		}
	});

	//Reload the seminars list table
	$("#reloadSeminarInfo").click(function () {
		getSeminarData();
	});

	//Get all the seminars list from the database contract
	function getSeminarData() {
		_DatabaseContract.getAllSeminars((err, res) => {
			if (err) {
				console.log(res);
			} else {
				loadSeminarDataData(res);
			}
		});
	}

	//populate the seminars table
	function loadSeminarDataData(seminars) {
		for (i = 0; i < seminars.length; i++) {
			populateSeminarTable((i + 1).toString(), seminars[i]);
		}
	}

	function populateSeminarTable(number, seminar) {
		tabBody = document.getElementById("seminarTable");
		row = document.createElement("tr");

		//first cell
		cell1 = document.createElement("td");
		textnode1 = document.createTextNode(number);
		cell1.appendChild(textnode1);

		//second cell
		cell2 = document.createElement("td");
		var link = document.createElement("a");
		link.className = "hoverLink";
		link.setAttribute('onclick', 'getIndividualseminar(this.innerHTML);');
		textnode2 = document.createTextNode(seminar);
		link.appendChild(textnode2);
		cell2.appendChild(link);

		row.appendChild(cell1);
		row.appendChild(cell2);
		tabBody.appendChild(row);
	}

	///////////////////////////////////Student contract/////////////////////////////////////////////////

	//ABI for contract
	var studentContract = web3.eth.contract([
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

	//Get the information of a product by deploying
	//the product contract at the product address
	$("#createStudent").click(function () {
		var _studentName = $("#studentName").val();
		var _studentId = $("#studentId").val();
		var _GPA = $("#GPA").val();
		var _seminarName = $("#seminarName").val();
		var _seminarAddress = $("#seminarAddress").val();
		var _actionDescription = $("#actionDescription").val();
		var _dataBaseAddr = $("#dataBaseAddr").val();

		//Input check
		if (isEmpty(_seminarAddress) || !isNumbe(_seminarAddress)) {
			InvalidAddressAlert();
			return;
		}

		if (isEmpty(_dataBaseAddr) || !isNumber(_dataBaseAddr)) {
			InvalidAddressAlert();
			return;
		}

		Showloader();
		var student = studentContract.new(
			_actionDescription + '.' + _studentName + '.' + _studentId + '.' + _seminarName,
			_seminarAddress,
			_dataBaseAddr,
			_GPA * 100, {
				from: web3.eth.accounts[0],
				data: getStudentContractData(),
				gas: '4700000'
			},
			function (e, contract) {
				console.log(e, contract);
				if (typeof contract.address !== 'undefined') {
					console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
				}
			})
	});

	//Reload the products list table
	$("#reload").click(function () {
		getProductData();
	});

	//populate the products table
	// function loadProductData(products) {
	// 	for (i = 0; i < products.length; i++) {
	// 		populateProductTable((i + 1).toString(), products[i]);
	// 	}
	// }

	// function populateProductTable(number, product) {
	// 	tabBody = document.getElementById("productsTable");
	// 	row = document.createElement("tr");

	// 	//first cell
	// 	cell1 = document.createElement("td");
	// 	textnode1 = document.createTextNode(number);
	// 	cell1.appendChild(textnode1);

	// 	//second cell
	// 	cell2 = document.createElement("td");
	// 	var link = document.createElement("a");
	// 	link.className = "hoverLink";
	// 	link.setAttribute('onclick', 'getIndividualProduct(this.innerHTML);');
	// 	textnode2 = document.createTextNode(product);
	// 	link.appendChild(textnode2);
	// 	cell2.appendChild(link);

	// 	row.appendChild(cell1);
	// 	row.appendChild(cell2);
	// 	tabBody.appendChild(row);
	// }

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

	function Showloader() {
		$("#loadingImg").show();
	}

	function hideloader() {
		$("#loadingImg").hide();
	}
});