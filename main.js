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

    //test logs
    console.log(myLibrary);
}



///test stuff





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