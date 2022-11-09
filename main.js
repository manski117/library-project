let myLibrary = [];




function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

Book.prototype.info = function(){
    //this will be a method you can call on the book objects, but because they are in the prototype and not in the obj itself, they will not populate in the table.

    if (this.read === true){
        return `${this.title} by ${this.author}, ${this.pages} pages, has been read`;
    } else if (this.read === false){
        return `${this.title} by ${this.author}, ${this.pages} pages, not read`;
    } else{
        return "ERROR";
    }
}


function addBookToLibrary(title, author, pages, read) {
   let newBook = new Book(title, author, pages, read);
   myLibrary.push(newBook);
   //adds the newly created Book object to the main array. 
}

function displayBooksOnPage() {
    //successfully gets book objects from the main array to populate the dom by looping through them. 

    //find the readout area in the web page and make a variable to contain it in memory
    let readout = document.querySelector("#readout");

    //loop over library array
    myLibrary.forEach(myLibrary =>{
        //for each item in the array, create a div container with a class "card"
        let card = document.createElement("div");
        card.classList.add('card');
        //add these cards to the readout area so we can see them on the page.
        readout.appendChild(card);
        //for each object in myLibrary, let that key represented by "key" as you loop through them.
        for (let key in myLibrary) {
            //create a p element inside your cards to get the info to appear
            let bookText = document.createElement('p');
            //IMPORTANT
            //because we are iterating through each object key, 'key' represents the key/property we are actually currently on.
            //therefore when we put 'key' in [], it calls the VALUE of itself in that itterable.
            bookText.innerText = (`${key}: ${myLibrary[key]}`);
            card.appendChild(bookText);
        }



    });
}



function clearForm(){
    //clears form
    document.getElementById('book-form').reset();
}

//the submit-button calls a function that gets the form data when it is clicked.
const submitButton = document.querySelector("#submit-button");
submitButton.addEventListener('click', validateUserInput);
//the submitButton can tell if it is being focused on
let submitIsFocused = false;
submitButton.addEventListener('focus', function(event){
    submitIsFocused = true;
    
})
submitButton.addEventListener('focusout', function(event){
    submitIsFocused = false;
    
})

//override default behavior of submitButton to send data to server
//this enables your data to be free to be sent to the javascript
submitButton.addEventListener('click', function(event){
  event.preventDefault();
});


//ensure that hitting enter does not submit form prematurely
document.getElementById("book-form").onkeypress = function(e) {
    var key = e.charCode || e.keyCode || 0;     
    if (key == 13) {
        e.preventDefault();
    }
    //if user is tabbing through the form, hitting enter will still allow keyboard only users to submit the form, assuming all feilds are filled out and they focus on the submit button.
    if (key == 13 && submitIsFocused === true) {
        e.preventDefault();
        validateUserInput();
    }
} 

function validateUserInput(){
    let form = document.querySelector('#book-form');
    let titleInput = document.querySelector('#title-input');
    let titleError = document.querySelector('.title-val');
    let authorInput = document.querySelector('#author-input');
    let authorError = document.querySelector('.author-val');
    let pagesInput = document.querySelector('#pages-input');
    let pagesError = document.querySelector('.pages-val');
    let formError = document.querySelector(".form-val");

    //validate individually for user feedback
    if (titleInput.value === ''){
        titleError.style.display = "block";
    } else{
        titleError.style.display = "none";
    }
    if (authorInput.value === ''){
        authorError.style.display = "block";
    } else{
        authorError.style.display = "none";
    }
    //filter out non-integer or negative results as well as blank ones.
    if (pagesInput.value === '' || pagesInput.value < 0 || pagesInput.value.match(/[^1-9]/)){
        pagesError.style.display = "block";
    }else{
        pagesError.style.display = "none";
    }

    //make sure all three of them are valid before constructing the actual object
    if(titleInput.value !=='' && authorInput.value !== '' && pagesInput.value !== '' && pagesInput.value > 0 ){
        formError.style.display = "none";
        
        getFormData();

    } else{
        formError.style.display = "block";
        
        return

    }
}

//get form data from page so that js can use it:
function getFormData(){
    //.value grabs whatever data is actually IN the form box that the user has typed. 
    let fTitle=document.getElementById("title-input").value;
    let fAuthor=document.getElementById("author-input").value;
    let fPages=document.getElementById("pages-input").value;
    let numPages = parseInt(fPages);

   
    let fRead;
    if (document.getElementById("read-input").checked){
        fRead = true;
    } else if (!document.getElementById("read-input").checked){
        fRead = false;
    } else {
        fRead = "error";
    }

    //then use this data to create an object and add it to the library array
    addBookToLibrary(fTitle, fAuthor, numPages, fRead);

    //clear the form upon submission
    document.getElementById('book-form').reset();

    //update table
    clearTable();
    document.getElementById('table-container').appendChild(buildTable(myLibrary));

}



///test stuff
function buildTable(data) {
    var node = document.createElement("table");
    node.setAttribute('id', 'book-table');
  
    var tr = document.createElement("tr");
    //fill the headers var with an array of the keys of the object in the 0 index (first place) of the array
    var headers = Object.keys(data[0]);
    //loop through each key in the array of key names
    for (var i=0; i<headers.length; ++i) {
        var header = headers[i];
        //create table headers for the key names
        //create a new table header called th
        var th = document.createElement("th");
        //use createTextNode to set its text to the current key via "header"
        th.appendChild(document.createTextNode(header));
        //add that th to the table row (tr) you are looping through
        tr.appendChild(th);
    }
    let thRemoveHeader = document.createElement("th");
    thRemoveHeader.appendChild(document.createTextNode("remove book?"));
    tr.appendChild(thRemoveHeader);

    //actually finally add this row to the table
    node.appendChild(tr);
    //now loop through each object in the array in "data"
    let domID = 0;
    data.forEach(function (rowdata) {
        //for each object, make a new table row "tr" for it.
        
        tr = document.createElement("tr");
       for (var i=0; i<headers.length; ++i) {
        //loops through each key and uses that key to get the value
            var header = headers[i];
            var td = document.createElement("td");
            //if-statement checks read status first so we don't write to td twice
            //read is the only value that can be boolean in this object
            if (typeof rowdata[header] == "boolean"){
                //adds a toggle class for css styles
                td.setAttribute('class', 'toggle');
                
                if (rowdata[header] === true){
                    
                    td.setAttribute('class', 'fa fa-thumbs-up');
                    td.setAttribute('id', `tog-${domID}`);
                    td.appendChild(document.createTextNode("Read"));
                    //this function will make the corresponding change in the object array, only when clicked on.
                    td.addEventListener("click", function() {
                        toggleRead(this.id, true);
                      });
                    tr.appendChild(td);
                    //go to next iterration so we don't add a td twice
                    continue;
                    

                    
                } else if(rowdata[header] === false){
                    
                    td.setAttribute('class', 'fa fa-thumbs-down');
                    td.setAttribute('id', `tog-${domID}`);
                    td.appendChild(document.createTextNode("Not Read"));
                    //this function will make the corresponding change in the object array, only when clicked on.
                    td.addEventListener("click", function() {
                        toggleRead(this.id, false);
                      });
                    tr.appendChild(td);
                    //go to next iterration so we don't add a td twice
                    continue;
                } 
            }
            //adds the value from the key:value pair to the td via createTextNode
            td.appendChild(document.createTextNode(rowdata[header]));
            //right-align the data and make it red if it is an int
            if (typeof rowdata[header] == "number") {
                td.style.textAlign = "right";
                td.style.color = "#E50000";
            }
            //write an if-statement to give the td a toggle function if read or unread.
            


            tr.appendChild(td);
        }
        
        //append a button at the end of the tr after loop
        //make this button associates with that dom object
        
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Remove";
        deleteButton.setAttribute('id', `btn-${domID}`); //add id = the domID so we can tie it for deletion.
        deleteButton.setAttribute('class', 'delete-button');
        deleteButton.addEventListener("click", function() {
            deleteBook(this.id);
          });
        
        var tdRemove = document.createElement("td");
        tdRemove.appendChild(deleteButton)

        tr.appendChild(tdRemove);


        node.appendChild(tr);
        ++domID;
    });
    return node;
}

function deleteBook(buttonID){
    if (myLibrary.length > 1){
        //get last letter of string passed
    let lastCharID = buttonID.slice(-1);
    //turn that into an integer
    let intID = parseInt(lastCharID);
    //delete that index from the obj array
    myLibrary.splice(intID, 1);
    
    //clear and rebuild the table. 
    clearTable();
    rebuildTable();

    } else if (1 >= myLibrary.length){
        alert("you can't delete your last book");
        return;

    } else{
        alert('well, something did not work right')
    }
}



function toggleRead(toggleID, bool){
    //further explained in deleteBook()
    //this function only changes the object in the array. DOM changes made in buildTable forEach loop
    let lastCharID = toggleID.slice(-1);
    let intID = parseInt(lastCharID);
    //uses the domID associated with object to grab the key:value pair and change read to unread and vice-versa
    let bookObj = myLibrary[intID];
    let bookObjStat = bookObj.read;
    
    if (bool === true){
        bookObj.read = false;
        let bookObjStat = bookObj.read;
        
        clearTable();
        rebuildTable();
    } else if (bool === false){
        
        bookObj.read = true;
        let bookObjStat = bookObj.read;
        
        clearTable();
        rebuildTable();
    }
    
  }

function rebuildTable(){
    document.getElementById('table-container').appendChild(buildTable(myLibrary)); 
}



function clearTable(){
    //select the table that had been added to the div container via the dom, so we remove the content and not the div itself. 
    const toDel = document.querySelector("#book-table");
    toDel.remove();
    
}


//placeholder table to initialize the table when the user first loads the page.
var initialTable = [
    {name: "", author: "", pages: "", read: "",},
];

document.getElementById('table-container').appendChild(buildTable(initialTable));







