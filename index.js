// Source code to interact with smart contract

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
// contractAddress and abi are setted after contract deploy
var contractAddress = '0xF516765931Eeb5B21BC03aca136cff030a8da7D9';
var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_age",
				"type": "uint256"
			},
			{
				"name": "_sexo",
				"type": "string"
			}
		],
		"name": "setUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUser",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
//contract instance
contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function (err, accounts) {
	if (err != null) {
		alert("Falha ao obter conta");
		return;
	}
	if (accounts.length == 0) {
		alert("Não foi possível acessar contas");
		return;
	}
	account = accounts[0];
	console.log('Conta: ' + account);
	web3.eth.defaultAccount = account;
});

//Smart contract functions
function setUser() {
	name = $("#userName").val();
	age = $("#userAge").val();
	sexo = $("#userSexo").val();
	contract.methods.setUser(name, age, sexo).send({ from: account }).then(function (tx) {
		console.log("Usuário registrado na transação: ", tx);
	});
	$("#userName").val('');
	$("#userAge").val('');
	$("#userSexo").val('')
}

function getUser() {
	contract.methods.getUser().call().then(function (result) {
		console.log(result[0], result[1], result[2])
		document.getElementById('user').innerHTML = ("Nome: " + result[0] + " " + "<br>Idade:  " + result[1] + "<br>Sexo: " + result[2]);
	});
}
