function Book(title, author, pages, read=false){
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		
		this.info = function() {
			return `${title} by ${author}, ${pages}, ${hasRead()}`
		}
		
		this.hasRead = function(){
			return (this.read) ? "read" : "not read yet";
		}
}

function buildBookBlock(book, idx){
	//create new elements
	let newList = document.createElement("ul");
	let bookTitle = document.createElement("li");
	let bookAuthor = document.createElement("li");
	let bookPages = document.createElement("li");
	let readToggle = document.createElement("li");
	let deleteButton = document.createElement("li");
	
	//set classes	
	newList.id = `book_${idx}`;
	newList.classList.add("bookDetails");
	bookTitle.classList.add("bookTitle");
	bookAuthor.classList.add("bookAuthor");
	bookPages.classList.add("bookPages");
	readToggle.classList.add("editLink");
	deleteButton.classList.add("editLink");
	
	//set inner content
	bookTitle.innerHTML = book.title;
	bookAuthor.innerHTML = book.author;
	bookPages.innerHTML = book.pages;
	readToggle.innerHTML = book.hasRead();
	deleteButton.innerHTML = "delete";
	
	//set edit button functions
	readToggle.onclick = toggleRead;
	deleteButton.onclick = deleteEntry;
	
	//append to list
	newList.appendChild(bookTitle);
	newList.appendChild(bookAuthor);
	newList.appendChild(bookPages);
	newList.appendChild(readToggle);
	newList.appendChild(deleteButton);
	
	//append to bookblock
	newBlock = document.createElement("div");
	newBlock.classList.add("bookBlock");
	newBlock.appendChild(newList);
	
	//append to booklist
	bookListEle.appendChild(newBlock);
}

function buildBookList(){
	bookListEle.innerHTML = "";
	for (idx in myLibrary){
		buildBookBlock(myLibrary[idx], idx);
	}
}

function toggleRead(e){
	var ele = e.target;
	var bookIdx = parseInt(ele.parentNode.id.split('_')[1]);
	if(!isNaN(bookIdx)){
		myLibrary[bookIdx].read = myLibrary[bookIdx].read ? false : true;
		saveLibrary();
		ele.innerHTML = myLibrary[bookIdx].hasRead();
	} else {
		console.log("toggleRead: error parsing index");
		return
	}
}

function deleteEntry(e){
	var ele = e.target;
	var bookIdx = parseInt(ele.parentNode.id.split('_')[1]);
	if(!isNaN(bookIdx)){
		myLibrary.splice(bookIdx,1);
		saveLibrary();
		buildBookList();
	} else {
		console.log("deleteEntry: error parsing index");
		return
	}
}

function saveLibrary(){
	localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
	console.log(JSON.stringify(myLibrary))
	return
}

function loadLibrary(){
	var storedArray = localStorage.getItem('myLibrary');
	var newBooks = [];
	if(storedArray){
		let objArray = JSON.parse(storedArray);
		for (x of objArray){
			newBooks.push(new Book(x.title,x.author,x.pages,x.read));
		}
	} else{
		//Pass
	}
	return newBooks;
}

function addBookRecord(e){
	let inputTitle = document.getElementById("inpTitle");
	let inputAuthor = document.getElementById("inpAuthor");
	let inputPages = document.getElementById("inpPages");
	let inputRead = document.getElementById("inpRead");
	
	if(inputTitle.value == ""){
		inputTitle.style.borderColor = "red";
	} else if (inputAuthor.value == ""){
		inputTitle.style.borderColor = "gray";
		inputAuthor.style.borderColor = "red";
	} else if (inputPages.value == ""){
		inputTitle.style.borderColor = "gray";
		inputAuthor.style.borderColor = "gray";
		inputPages.style.borderColor = "red";
	}	else{
		inputTitle.style.borderColor = "gray";
		inputAuthor.style.borderColor = "gray";
		inputPages.style.borderColor = "gray";
		
		myLibrary.push(new Book(inputTitle.value,inputAuthor.value,inputPages.value,inputRead.value));
		saveLibrary();
		buildBookList();
		
		//clear out vals
		inputTitle.value = "";
		inputAuthor.value = "";
		inputPages.value = "";
		inputRead.checked = false;
	}
}

function toggleNewForm(e){
	infoFormEle.classList.toggle("open");
}

var bookListEle = document.getElementById("bookListArea");
var saveButton = document.getElementById("infoFormButton");
var hideShowButton = document.getElementById("toggleFormButton");
var infoFormEle = document.getElementById("infoForm");
hideShowButton.onclick = toggleNewForm;
saveButton.onclick = addBookRecord;

var myLibrary = loadLibrary();
buildBookList();

/* let quickBook = new Book("titletitletitletitletitletitletitletitletitletitletitle","author","pages")
let nextBook = new Book("title2","author2","16",true);

myLibrary.push(quickBook);
buildBookList();
myLibrary.push(nextBook);
buildBookList(); */