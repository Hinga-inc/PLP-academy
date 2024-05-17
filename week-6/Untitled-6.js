function plusAsteric()
{
    let x = "*"

    for (let i=0; i<5; i++)
    {
        console.log(x);
        x += "*"
    }
}

function minusAsteric()
{
    let j = "*"+"*"+"*"+"*"+"*";

    for (let x=0; x<5; x--)
    {
        console.log(j);
        j -= "*"
    }
}

plusAsteric();
