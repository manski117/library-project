const {Book, test2} = require("./main");

test("Does the Book constructor create a book object?",()=>{
    let mistborn = new Book("Mistborn", "Brandon Sanderson", 440, true);
    expect(mistborn instanceof Book).toBe(true);
    expect(mistborn.author).toBe("Brandon Sanderson");

});

describe("does test2 increment?", ()=> {
    test("6 should become 7", () =>{
        expect(test2(6)).toBe(7);
    });

    test("1 should become 2", () => {
        expect(test2(1)).toBe(2);
    });
});

//npm run test main.test.js
//make sure the names match, jest is intstalled globally with $ npm install -g jest