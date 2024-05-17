let shopCart = [];
let itemsForSale = {
    "Phone": 300,
    "Smart Tv": 320,
    "Gaming Console": 150
};

/** 
 * the addItem method
 * it takes the item name as the parameter
 * this is a method that checks if an item is available for sale.
 * if it is, it add it to the shopping cart
 * if not it shows a an error message showing the item is not available for sale
 */ 
function addItem(itemName)
{
    if (itemName in itemsForSale)
    {
        shopCart.push(itemName);
        console.log(`${itemName} added to your shopping cart.`);
    }
    else
    {
        console.log(`Sorry, ${itemName} is not available in our catalogue right now.`);
    }
}

/**
 * the calculateTotalPrice method
 * this iterates through the items in the shopping cart
 * adds their prices and returns their totalPrice
 */
function calculateTotalPrice()
{
    let totalPrice = 0;
    for (let item of shopCart)
    {
        totalPrice = totalPrice + itemsForSale[item];
    }
    return totalPrice;
}


/**
 * the pay method
 * this calculates the total price from the function calculateTotalPrice
 * if the total price id higher than 400 a 10% discount is awarded
 * 
 * then the payment amount is compared with the total price after the discount
 * if the payment amount is greater than the total price then
 *  a message thanking the customer
 *  and a message showing the change amount to be given
 * or if the payment amount is less than the total price then
 *  the insufficient balance needed is calculated and then
 *  the customer is given an alert saying there is insufficient balance of
 * and then the default of when they are equal
 *  the customer is thanked for shopping there
 */
function pay(paymentAmount){
    let totalPrice = calculateTotalPrice();
    

    if (totalPrice > 400)
    {
        discount = totalPrice * 0.1;
        totalPrice = totalPrice - discount;
        console.log(`You have a discounted total bill of ${totalPrice}.`);
    }
    console.log(`Your total bill is ${totalPrice}.`);
    
    let changeAmount;
    let insufficientBalance;
    if (paymentAmount > totalPrice)
    {
        
        changeAmount = paymentAmount - totalPrice;
        console.log(`You have a change amount of ${changeAmount}.`);
        console.log("Thank You for shopping with us.");
    }
    else if ( paymentAmount < totalPrice){
        insufficientBalance = totalPrice - paymentAmount;
        console.log(`You have an insufficient amount of ${insufficientBalance}.`);

    }
    else {
        console.log("Thank you for shopping with us.");
    }
}

addItem("iphone");
addItem("Smart Tv");
addItem("Gaming Console");

console.log("Your shopping cart has.", shopCart);
console.log("Your shopping carts has goods worth.", calculateTotalPrice() );

pay(1000);