import { cart, totalItemQuantityInCart, removeFromCart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js'
import { formatCurrency } from './utils/money.js';


let productHTML = '';

cart.forEach((cartItem) => {

    const { productId } = cartItem;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    productHTML = productHTML + `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
            src="${matchingProduct.image}">

        <div class="cart-item-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-price">
            ${ formatCurrency(matchingProduct.priceCents) }
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label js-quantity-lable-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
            </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
            <div class="delivery-option">
            <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                FREE Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                $4.99 - Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Monday, June 13
                </div>
                <div class="delivery-option-price">
                $9.99 - Shipping
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    `
})

document.querySelector('.js-order-summary').innerHTML = productHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const { productId } = link.dataset;
        removeFromCart(productId);
        updateCheckoutItemsNumber();
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
        updateOrderSummary();
    });
});


document.querySelectorAll('.update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const {productId} = link.dataset;
        console.log(productId)
        document.querySelector(`.js-save-quantity-link-${productId}`).classList.add('visible');
        const currentQuantity = document.querySelector(`.js-quantity-lable-${productId}`).innerText;

        document.querySelector(`.js-quantity-input-${productId}`).setAttribute('value', currentQuantity);
        document.querySelector(`.js-quantity-input-${productId}`).classList.add('visible');


        document.querySelector(`.js-quantity-lable-${productId}`).innerText='';
        link.classList.add('invisible');
    })
})

document.querySelectorAll('.save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const {productId} = link.dataset;
        link.classList.remove('visible');

        document.querySelector(`.js-quantity-input-${productId}`).classList.remove('visible');
        const changedQuantity = document.querySelector(`.js-quantity-input-${productId}`).value;

        document.querySelector(`.js-quantity-lable-${productId}`).innerText = changedQuantity;
        document.querySelector(`.js-update-quantity-link-${productId}`).classList.remove('invisible');

        addToCart(productId, Number(changedQuantity), true);
        updateOrderSummary()
        updateCheckoutItemsNumber();
    });
});

function updateOrderSummary() {
    // item total price
    let totalPriceCents = 0;
    cart.forEach((cartItem) => {

        const { productId } = cartItem;

        products.forEach((product) => {
            if (product.id === productId) {
                totalPriceCents += product.priceCents * cartItem.quantity;
            }
        });
    });

    // shipping total

    let shippingPriceCents = 0;


    // total before tax
    const totalBeforeTax = totalPriceCents + shippingPriceCents;

    // tax
    const tax = (totalPriceCents + shippingPriceCents) * 0.1;

    // order total
    const orderTotal = totalBeforeTax + tax;

    document.querySelector('.payment-summary').innerHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-order-summary-items">Items (0):</div>
            <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;



}

updateOrderSummary();

updateCheckoutItemsNumber();

function updateCheckoutItemsNumber() {
    const cartQuantity = totalItemQuantityInCart();
    console.log(cartQuantity);
    document.querySelector('.js-return-to-home-link').innerText = cartQuantity + ' items'
    document.querySelector('.js-order-summary-items').innerText = `Items(${cartQuantity}):`
}
