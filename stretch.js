import { fifaData } from './fifa.js';

let data2HTML = _ => {

    let arr = fifaData.map(item => {

        return '<h1>' + item["Home Team Name"] + '</h1>';

    }).join('');

    return arr;

}
console.log("Stretch below: ");
console.log(data2HTML());

let body = document.querySelector('body');
let dataspan = document.createElement('span');

dataspan.innerHTML = data2HTML();
body.appendChild(dataspan);
