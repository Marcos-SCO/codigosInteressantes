// Variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

// Cart
let cart = [];

// Getting products
const products = {
    async getProducts() {
        try {
            let result = await fetch('./products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(product => {
                const { title, price } = product.fields;
                const { id } = product.sys;
                const image = product.fields.image.fields.file.url;

                return { title, price, id, image };
            })
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

// Display Products
const UI = {
    displayProducts() {

    }
}

// Local Storage
const storage = {

}

document.addEventListener('DOMContentLoaded', () => {
    // products.getProducts().then(product => ui.displayProducts(product));
    products.getProducts().then(product => console.log(product));
});