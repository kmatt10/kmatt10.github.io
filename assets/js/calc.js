/*
	operation = {
		String a = first operand;
		String op = operation;
		String b = second operand;
	}
*/

//Input: Operation; Output: String
function operate(operation){
	switch(operation.op){
		case "+":
			return (parseFloat(operation.a) + parseFloat(operation.b)).toString();
		break;
		case "-":
			return (parseFloat(operation.a) - parseFloat(operation.b)).toString();
		break;
		case "*":
			return (parseFloat(operation.a) * parseFloat(operation.b)).toString();
		break;
		case "/":
			if(operation.b == 0){
				return "Nope";
			}
			return (Math.round((parseFloat(operation.a) / parseFloat(operation.b)) * 1000) / 1000).toString()
		break;
	}
}

function toggleOpButtons(){
		for (let i = 0; i < opButtons.length; i++){
			opButtons[i].disabled = (opButtons[i].disabled) ? false : true;
	}
}

function numericInput(e){
	let ele = e.target;
	if (ele.id == "decimal"){
		dispBoxEle.value+=ele.innerHTML;
		ele.disabled = true;
	}
	else if (dispBoxEle.value == "0" || isNaN(parseFloat(dispBoxEle.value))){
		dispBoxEle.value = ele.innerHTML;
	} else {
		dispBoxEle.value += ele.innerHTML;
	}
}

function opInput(e){
	let ele = e.target;
	if (isNaN(parseFloat(dispBoxEle.value))){
		//Pass
	} else{
		calcOperation.a = dispBoxEle.value;
		dispBoxEle.value = "0";
		calcOperation.op = ele.value;
		console.table(calcOperation);
		toggleOpButtons();
		document.getElementById("decimal").disabled = false;
	}
}

function clear(){
	calcOperation.a = null;
	calcOperation.op = null;
	calcOperation.b = null;
	dispBoxEle.value = "0";
	document.getElementById("decimal").disabled = false;
	if (opButtons[0].disabled){
		toggleOpButtons();
	}
}

function processCalc(){
	if(calcOperation.a === null || calcOperation.op === null){
		return
	} else{
		calcOperation.b = dispBoxEle.value;
		dispBoxEle.value = operate(calcOperation);
		calcOperation.a = (isNaN(parseFloat(dispBoxEle.value))) ? null : dispBoxEle.value;
		calcOperation.op = null;
		calcOperation.b = null;
		toggleOpButtons();
	}
}

function backSpace(){
	dispBoxEle.value = dispBoxEle.value.slice(0,-1);
	if(dispBoxEle.value.length == 0){
		dispBoxEle.value = "0";
	}
}

function getKey(e){
	let pressed = e.key;
	if(isNaN(parseInt(pressed))){
		//pass
	} else if (dispBoxEle.value == "0" || isNaN(parseFloat(dispBoxEle.value))){
		dispBoxEle.value = parseInt(pressed);
	} else {
		dispBoxEle.value += parseInt(pressed);
	}
}


//Getting page elements
const dispBoxEle = document.getElementById("calcDispArea");
const opButtons = document.getElementsByClassName("operator_inp");
const numButtons = document.getElementsByClassName("number_inp");
const equalEle = document.getElementById("equal");
const clearEle = document.getElementById("clear");
const backEle = document.getElementById("back");
var calcOperation = {
	a: null,
	op: null,
	b: null,
}

//Setting click elements
for (let i = 0; i < numButtons.length; i++){
	numButtons[i].onclick = numericInput;
}

for (let i = 0; i < opButtons.length; i++){
	opButtons[i].onclick = opInput;
}

equalEle.onclick = processCalc;
clearEle.onclick = clear;
backEle.onclick = backSpace;

//set key element
document.body.addEventListener("keypress", getKey);