const drawEle = document.getElementById("drawArea");
//push() and shift() FIFO
function createGrid(box = 16, buttonName = ''){
	let divArray = [];
	let drawBox = document.createElement("DIV");
	let boxSize = Math.floor(400/box);
	for(let i = 0; i < box; i++){
		divArray.push(document.createElement("DIV"));
		for(let j = 0; j < box; j++){
			let divSquare = document.createElement("DIV");
			divSquare.className = "etchSquare notPassed";
			if(buttonName.includes("Color")){
				divSquare.addEventListener("mouseover", setPassedColor);
			} else{
				divSquare.addEventListener("mouseover", setPassed);
			}
			
			divSquare.style.width = boxSize + "px";
			divSquare.style.height = boxSize + "px";
			divArray[i].appendChild(divSquare);
		}
		divArray[i].className = "etchRow";
		divArray[i].style.height = boxSize + "px";
		drawBox.appendChild(divArray[i]);
	}
	drawBox.style.width = "400px";
	drawBox.style.height = "400px";
	drawEle.appendChild(drawBox);
}


function randColor(){
	const white = 16777215;
	let decColor = Math.floor(Math.random() * Math.floor(white));
	return "#" + decColor.toString(16);
}


function setPassedColor(e){
	let ele = e.target;
	if(ele.classList.contains("notPassed")){
		ele.classList.remove("notPassed");
		ele.classList.add("passed")
		ele.style.backgroundColor = randColor();
	} else {
		let curColorString = ele.style.backgroundColor;
		let curColorArr = curColorString.substring(4,curColorString.length-1).split(",");
		curColorArr = curColorArr.map(x => x.trim());
		curColorArr = curColorArr.map(x => x - Math.floor(x/10));
		ele.style.backgroundColor = "rgb(" + curColorArr[0] + "," + curColorArr[1] + "," +  curColorArr[2] + ")";
	}
}
function setPassed(e){
	let ele = e.target;
	ele.classList.remove("notPassed");
	ele.classList.add("passed");
}


//400 x 400 grid right now
function newGrid(e){
	var pressedButton = e.target.innerHTML;
	drawEle.innerHTML= "";
	do{
		var newSize = prompt("Enter a number for the grid size [0,75]", 16);
	}
	while(!(/^[0-9.,]+$/.test(newSize)) || newSize > 75);
	createGrid(newSize,pressedButton);
}

function reset(){
	let currentSize = document.getElementsByClassName("etchRow").length;
	drawEle.innerHTML= "";
	createGrid(currentSize);
}

createGrid()
let newGridEle = document.getElementsByTagName("Button")[0];
let resetGridEle = document.getElementsByTagName("Button")[1];
let ColorGridEle = document.getElementsByTagName("Button")[2];
newGridEle.onclick = newGrid;
resetGridEle.onclick = reset;
ColorGridEle.onclick = newGrid;