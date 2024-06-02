// the comments are another way to write a functon


const numRows = 5;
// const plusAsterics=(rows)=>
function plusAsterics(rows)
{
    for (let i = 1; i <= rows; i++) {
        let row = '';
        for (let j = 1; j <= i; j++) {
            row += '*';
        }
        console.log(row);
    }
}

// const minusAsterics = (rows) =>
function minusAsterics(rows)
{
    for (let x = rows; x>=0; x--)
    {
        let row = '';
        for (let y = 1; y<=x; y++)
        {
            row += "*";
        }
        console.log(row);
    }
}


plusAsterics(numRows);
console.log("\n");
minusAsterics(numRows);