const {test1, test2} = require("./main");

test("does test1 add goofy?",()=>{
    expect(test1("donald")).toBe('donald and goofy');

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