let colors =  ["red", "green", "blue"];
colors.push("black");
console.log(colors);

colors.shift("red");

// Find the indexes of "blue" and "black"
let indexBlue = colors.indexOf("blue");
let indexBlack = colors.indexOf("black");

// Check if both colors exist in the array
if (indexBlue !== -1 && indexBlack !== -1) {
    // Swap the values
    let temp = colors[indexBlue];
    colors[indexBlue] = colors[indexBlack];
    colors[indexBlack] = temp;
} else {
    console.log("One or both colors not found in the array.");
}
console.log(colors);

colors.unshift("yellow");
console.log(colors)