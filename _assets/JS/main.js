let myImage = document.querySelector('img');

myImage.onclick = function() {
	let mySrc = myImage.getAttribute('src');
	if(mySrc === 'images/coffee-logo.png'){
		myImage.setAttribute('src','images/burger-logo.jpg');
	} else {
		myImage.setAttribute('src','images/coffee-logo.png');
	}
}

let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

function setUserName() {
	let myName = prompt('Please enter your name.');
	if(!myName){
		setUserName();
	} else {
	localStorage.setItem('name', myName);
	myHeading.textContent = 'Welcome aboard, ' + myName + '!';
	}
}

if(!localStorage.getItem('name')){
	setUserName();
} else {
	let storedName = localStorage.getItem('name');
	myHeading.textContent = 'Welcome aboard, ' + storedName + '!';
}

myButton.onclick = function() {
	setUserName();
}
