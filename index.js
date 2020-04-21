import { fifaData } from './fifa.js';
console.log(fifaData);


// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data */

//(a) Home Team name for 2014 world cup final //line 18219???

let getIndex = (year, stage) => {

    let arr; //data to be returned later

    for (let i=0; i<fifaData.length; i++) {

        if (fifaData[i].Year === year && fifaData[i].Stage === stage) {

            return i;

        }
    }
}

console.log(getIndex(2014, "Final")); //Logging this function to find the index number of this item - namely the 2014 world cup final item in the array

console.log("Task 1 (a): " + fifaData[828]["Home Team Name"]);

//(b) Away Team name for 2014 world cup final

console.log("Task 1 (b): " + fifaData[828]["Away Team Name"]);

//(c) Home Team goals for 2014 world cup final

console.log("Task 1 (c): " + fifaData[828]["Home Team Goals"]);

//(d) Away Team goals for 2014 world cup final

console.log("Task 1 (d): " + fifaData[828]["Away Team Goals"]);

//(e) Winner of 2014 world cup final */

console.log("Task 1 (e): " + fifaData[828]["Win conditions"]);


/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {

    return data.filter(item => item.Stage === "Final")

};

console.log("Task 2 below: ");
console.log(getFinals(fifaData));

/* Task 3: Impliment a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(cb) {

    let data = cb;
    let years = [];

    for (let i=0; i<cb.length; i++) {

        years.push(cb[i].Year)

    }

    return years;
};


console.log("Task 3 below: ");
console.log(getYears(getFinals(fifaData)));

/* Task 5: Impliment a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(cb) {

    let winners = [];

    for (let i=0; i<cb.length; i++) {

        if (cb[i]["Home Team Goals"] > cb[i]["Away Team Goals"]) {

            winners.push(cb[i]["Home Team Name"])

        }else if (cb[i]["Home Team Goals"] < cb[i]["Away Team Goals"]) {

            winners.push(cb[i]["Away Team Name"])

        }else {

            winners.push("Nobody")

        }
    }

    return winners;

};

console.log("Task 5 below: ");
console.log(getWinners(getFinals(fifaData)));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getAllWinners(winners, years) {

    let arr = []; //array that will hold strings

    for (let i=0; i<years.length; i++) {

        arr.push("In " + years[i] + ", " + winners[i] + " won the world cup!")

    }

    return arr;

};

console.log("Task 6 below: ");
console.log(getAllWinners(getWinners(getFinals(fifaData)),getYears(getFinals(fifaData))));

/* Task 7: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, ti) {

    let gamesIndex = data.filter(item => item["Home Team Initials"] === ti || item["Away Team Initials"] === ti); //Array of indexs numbers of games played by said team

    //Games the given team won within the gamesIndex array V
    let wonIndex = gamesIndex.reduce((acc,item) => { 

        if (item["Home Team Initials"] === ti && item["Home Team Goals"] > item["Away Team Goals"]) {

            return acc + 1;

        }else if (item["Away Team Initials"] === ti && item["Home Team Goals"] < item["Away Team Goals"]) {

            return acc + 1;
        }

        return acc;

    },0)

    return wonIndex;

}

console.log("Task 7 below: ");
console.log(getCountryWins(fifaData, "JPN"));


/* Task 8: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function mergeDuplicates(arr) { //Will consolidate data and get the average score per appearance

    for (let i=0; i<arr.length; i++) {

        let refIndex = i; //Reference index meaning the object being used as reference if there are duplicates

        let appearances = 1; //will be the number of times a team plays in finals

        for (let x=refIndex+1; x<arr.length; x++) {

            if (arr[refIndex].Team === arr[x].Team) {

                appearances++;

                arr[refIndex].Score = arr[refIndex].Score + arr[x].Score;
                arr.splice(x, 1);

            }
        }

        arr[refIndex].Score = (arr[refIndex].Score / appearances); //Averages based on appearance

    }
}

function findHighestScore(data) { //Find the index in an array containing the highest score

    let highestScore = 0;
    let Index;

    for (let i=0; i<data.length; i++) {

        if (data[i].Score > highestScore) {

            highestScore = data[i].Score;
            Index = i;

        }

    }

    return Index;

}

function getGoals(data) {

    let finals = getFinals(data);

    let scores = []; //team name and score

    for (let i=0; i<finals.length; i++) {

        let obj1 = {}; //Temp object used for pushing data into the array - specifically for home team data
        let obj2 = {}; //Same thing as above but for away team

        obj1 = { 
            "Team": finals[i]["Home Team Name"], 
            "Score": finals[i]["Home Team Goals"] 
        };

        obj2 = { 
            "Team": finals[i]["Away Team Name"], 
            "Score": finals[i]["Away Team Goals"] 
        };

        scores.push(obj1);
        scores.push(obj2);

    }

    mergeDuplicates(scores);

    console.log(scores);    

    return scores[findHighestScore(scores)].Team;

};

console.log("Task 8 below: ")
console.log(getGoals(fifaData));


/* Task 9: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();


/* Task 10: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(/* code here */) {

    /* code here */

};

getAverageGoals();


/// STRETCH 🥅 //

/* Use the space below to work on any stretch goals of your chosing as listed in the README file. */