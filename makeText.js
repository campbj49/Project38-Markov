/** Command-line tool to generate Markov text. */
const MarkovMachine = require("./markov.js");
const fs = require('fs');
const axios = require('axios');

//reusing the previous project's code, as it will serve well enough
async function cat(path){
    let res;
    res = await fs.readFileSync(path,'utf8',(err,data)=>{
        if(err){
            console.log(err);
            process.exit(1);
        }
        else{
            return data;
        }
    })
    let mm = new MarkovMachine(res);
    console.log(mm.makeText())
    return res
}

async function webCat(path){
    try {
        res = await axios.get(path);
        let mm = new MarkovMachine(res.data);
        console.log(mm.makeText())
        return res.data;
    }
    catch(err){
        console.log("Error with the request:");
        console.log(err);//.code);
        process.exit(1);
    }
}

if(process.argv.length === 4){
    let path = process.argv[3];
    let type = process.argv[2];
    if(type === "url") webCat(path);
    else if(type === "file") cat(path);
    else{
        console.log("Invalid arguments");
        process.exit(1);
    }
}
else{
    console.log("Invalid arguments");
    process.exit(1);
}