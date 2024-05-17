let side;
// function calculateSquare(side)
let calculateSquare=(side)=>
{
    let area = side*side;
    let perimeter = 4 * side;
    console.log(`the square side is ${side}`);
    console.log(`the area of the square is ${area}`);
    console.log(`the perimeter of the square is ${perimeter}`);
}
calculateSquare(8);