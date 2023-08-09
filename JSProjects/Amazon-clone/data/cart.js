export let cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
}, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
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

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    console.log(newCart);
    cart = newCart;
}