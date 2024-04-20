const REWARDS = ["chocolate", "cookie", "candy", "no reward to give"];
const GRADE = ["A", "B", "C", "D", "E"];

let grade = 'A';

switch(grade)
{
    case 'A':
        console.log("You got an A, so here's a chocolate for you!");
    break;
    case 'B':
        console.log("You got a B, here's a cookie for you!");
    break;
    case 'C':
        console,log("You got a C, there's room for improvement and here's your candy!");
    break;
    case 'D':
        console.log("No reward to give");
    break;
    case 'E':
        console.log("No reward to give");
    break;
    default:
        console.log("no grade given");
}