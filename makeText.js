/** Command-line tool to generate Markov text. */
const MarkovMachine = require("./markov.js");

console.log(MarkovMachine);

let mm = new MarkovMachine("the cat in the hat");
console.log(mm.makeText());