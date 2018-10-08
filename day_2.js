// --- Day 2: Corruption Checksum ---

// As you walk through the door, a glowing humanoid shape yells in your direction.
// "You there! Your state appears to be idle.
// Come help us repair the corruption in this spreadsheet - if we take another millisecond, we'll have to display an hourglass cursor!"

// The spreadsheet consists of rows of apparently-random numbers.
// To make sure the recovery process is on the right track, they need you to calculate the spreadsheet's checksum.
// For each row, determine the difference between the largest value and the smallest value; the checksum is the sum of all of these differences.

// For example, given the following spreadsheet:

// 5 1 9 5
// 7 5 3
// 2 4 6 8
// The first row's largest and smallest values are 9 and 1, and their difference is 8.
// The second row's largest and smallest values are 7 and 3, and their difference is 4.
// The third row's difference is 6.
// In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.

// What is the checksum for the spreadsheet in your puzzle input?


// TODO determine how to read in files.
// VSCode is formatting the input weirdly... hopefully it doesn't matter.

//File Reading setup
var fs = require("fs");
var readline = require("readline");
var outstream = new (require("stream"))();
var read = readline.createInterface(
  fs.createReadStream("input.txt"),
  outstream
);

//Value setup
var checksum = 0;
var highestValue = 0;
var lowestValue = 0;

function solveCheckSumPart1() {
  read.on("line", function(line) {
    var splitLine = String(line).split("\t");

    highestValue = parseInt(splitLine[0]);
    lowestValue = highestValue;

    splitLine.forEach(element => {
      var currentNumber = parseInt(element);
      if (currentNumber > highestValue) {
        highestValue = currentNumber;
      } else if (currentNumber < lowestValue) {
        lowestValue = currentNumber;
      }
    });

    checksum += highestValue - lowestValue;
    //console.log(checksum)
  });
  return checksum;
}

function solveCheckSumPart2() {
  read.on("line", function(line) {
    var splitLine = String(line).split("\t");
    //Interate through the array converting strings to ints
    for (i = 0; i < splitLine.length; i++) {
      splitLine[i] = parseInt(splitLine[i]);
    }
    //Sort in descending order
    splitLine.sort(function(a, b) {
      return b - a;
    });

    //Nested For Loop
    for (j = 0; j < splitLine.length; j++) {
      for (k = 0; k < splitLine.length; k++) {
          if (splitLine[j] % splitLine[k] == 0 && splitLine[j] != splitLine[k]) {
              checksum += splitLine[j] / splitLine[k];
          }
      }
    }
    console.log(splitLine);
    console.log(checksum)
  });
}

solveCheckSumPart2();
