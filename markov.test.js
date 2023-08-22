/*       Testing for the Markov Machine*/
const MarkovMachine = require("./markov.js");

test('object should initialize succesfully', ()=>{
    let mm = new MarkovMachine("the cat in the hat");
    expect(mm.chain).toStrictEqual({the: ["cat", "hat"], 
                                cat: ["in"],
                                in: ["the"],
                                hat: [null]})
})

test('makeText should make the correct number of words', ()=>{
    let mm = new MarkovMachine("the cat in the hat");
    let total = 0;
    for(char of mm.makeText()) if(char ===" ") total ++;
    expect(total).toEqual(100);
    total = 0;
    for(char of mm.makeText(numWords=50)) if(char ===" ") total ++;
    expect(total).toEqual(50);
    
})