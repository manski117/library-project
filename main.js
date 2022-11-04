let myLibrary = [];


function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        if (read === true){
            return `${title} by ${author}, ${pages} pages, has been read`;
        } else if (read === false){
            return `${title} by ${author}, ${pages} pages, not read`;
        } else{
            return "ERROR";
        }
    }

}


function addBookToLibrary() {
  // do stuff here
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