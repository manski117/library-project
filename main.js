console.log('sup')


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
module.exports = {test1, test2};