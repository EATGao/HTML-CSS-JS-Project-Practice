export let cart = JSON.parse(localStorage.getItem('cart'));


if (!cart) {
    cart = [];
}



function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

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

    saveToStorage();
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

    saveToStorage();
}