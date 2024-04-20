let shopCart = {};
let itemsForSale = {};

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

        shopCart.itemName
    }
    else
    {
        console.log("Sorry, That that item is not available in our catalogue right now,");
    }
}

/**
 * the calculateTotalPrice method
 * this iterates through the items in the shopping cart
 * adds their prices and returns their totalPrice
 */
function calculateTotalPrice()
{
    totalPrice = shopCart.item.price
}


/**
 * the pay method
 */
function pay(paymentAmount){
    calculateTotalPrice()
    if (totalPrice > 400)
    {
        discountedPrice = totalPrice * 0.1;
        console.log(`You are paying ${discountedPrice}`);
    }
    else
    {
        console.log(`You are paying ${totalPrice}`);
    }
}