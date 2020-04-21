import { fifaData } from './fifa.js';

let data2HTML = _ => {

    let arr = fifaData.map(item => {

        return '<h1>' + item["Home Team Name"] + '</h1>';

    }).join('');

    return arr;

}
console.log("Stretch below: ");
console.log(data2HTML());

let div = document.createElement("div"); //Not sure why this doesn't work
div.className = "stretchtest";
div.innerHTML = data2HTML(); 

