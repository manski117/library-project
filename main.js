let myLibrary = [];


function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        //allows for a different message to be given by the info method depending on the 'read' boolean
        if (read === true){
            return `${title} by ${author}, ${pages} pages, has been read`;
        } else if (read === false){
            return `${title} by ${author}, ${pages} pages, not read`;
        } else{
            return "ERROR";
        }
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

submitButton.addEventListener('click', getFormData);
submitButton.addEventListener('click', function(event){
  event.preventDefault();
});

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

    //test logs
    console.log(myLibrary);
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


    //actually finally add this row to the table
    node.appendChild(tr);
    //now loop through each object in the array in "data"
    data.forEach(function (rowdata) {
        //for each object, make a new table row "tr" for it.
       tr = document.createElement("tr");
       for (var i=0; i<headers.length; ++i) {
        //loops through each key and uses that key to get the value
            var header = headers[i];
            var td = document.createElement("td");
            //adds the value from the key:value pair to the td via createTextNode
            td.appendChild(document.createTextNode(rowdata[header]));
            //right-align the data if it is an int
            if (typeof rowdata[header] == "number") {
                td.style.textAlign = "right";
                td.style.color = "#E50000";
            }
            tr.appendChild(td);
        }
        node.appendChild(tr);
    });
    return node;
}

//build from an array of objects
var MOUNTAINS = [
{no: 0, name: "Kilimanjaro", height: 5895, country: "Tanzania"},
{no: 1, name: "Everest", height: 8848, country: "Nepal"},
{no: 2, name: "Mount Fuji", height: 3776, country: "Japan"},
{no: 3, name: "Mont Blanc", height: 4808, country: "Italy/France"},
{no: 4, name: "Vaalserberg", height: 323, country: "Netherlands"},
{no: 5, name: "Denali", height: 6168, country: "United States"},
{no: 6, name: "Popocatepetl", height: 5465, country: "Mexico"}
];

var BOOKS = [
    {name: "Dr. Suess", author: "Tanzania", pages: 123, read: true, button:"click me"},
    {name: "Dr. Suess", author: "Nepal", pages: 43, read: false, button:"click me"},
    {name: "Dr. Suess", author: "Japan", pages: 2343, read: true, button:"click me"},
];

//put the table right where we want it in the page.
document.getElementById('table-container').appendChild(buildTable(BOOKS));

function clearTable(){
    //select the table that had been added to the div container via the dom, so we remove the content and not the div itself. 
    const toDel = document.querySelector("#book-table");
    toDel.remove();
    
}









function test1(text){
    text += " and goofy";
    return text;
}

function test2(num){
    let myNum = num;
    myNum ++;
    return myNum;

}

//no code beyond this line
module.exports = {Book, test2};  
