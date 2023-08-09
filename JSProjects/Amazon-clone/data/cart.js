export const cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
}];

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

export function totalItemQuantityInCart() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    })

    return cartQuantity;
}