/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = {};
    //loop through all the words, adding the following word to the markov chain object
    for(const [index, word] of this.words.entries()){
      //initialize word to be added variable
      let link;
      //check for end of line, setting the link to null if it is the end of line
      if(!this.words[index+1]) link = null;
      else link = this.words[index+1];

      //check to see if the current word has been logged yet or not
      if(!chain[word]) chain[word] = [link];
      else chain[word].push(link);
      //console.log(index, word);
    }
    //once for loop has resolved, set it as the machine's chain
    this.chain = chain;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    //choose starting word
    let lastWord = rndEl(Object.keys(this.chain));//[wRnd(Object.keys(this.chain).length())]
    let res = lastWord;
    while(numWords > 0){
      //choose the next word
      lastWord = rndEl(this.chain[lastWord]);
      //if it's null, set a period and choos a new starting word
      if(!lastWord){
        //make sure there aren't any double periods.
        if(res[res.length-1] != ".") res += ".";
        lastWord = rndEl(Object.keys(this.chain));
      }

      else {
        res += " " + lastWord;
        numWords--;
      }
    }
    return res;
  }
}

//Random Element function that takes an array and returns a random element of that array

function rndEl(array){
  return array[Math.floor(Math.random() * array.length)];
}

//set up exports for easy imports elsewhere
module.exports = MarkovMachine;