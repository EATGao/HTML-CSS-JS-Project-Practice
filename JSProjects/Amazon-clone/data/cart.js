export const cart = [];

export function addToCart(productId) {
    // check if the item is in the cart
    let noMatchingItem = true;
    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    for (let item of cart) {
        if (productId === item.productId) {
            item.quantity += quantity;
            noMatchingItem = false;
            break;
        }
    }
    if (noMatchingItem) {
        cart.push({
            productId, 
            quantity
        });
    }
}
