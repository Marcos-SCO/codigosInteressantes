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
let buttonsDOM = [];

// Getting products
function Products() {
    this.getProducts = async function getProducts() {
        try {
            let result = await fetch('./products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(product => {
                const { title, price } = product.fields;
                const { id } = product.sys;
                const img = product.fields.img.fields.file.url;

                return { title, price, id, img };
            })
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

// Display Products
function UI() {
    this.displayProducts = function displayProducts(product) {
        let result = '';
        product.map(({ title, img, id, price }) => {
            result += `<article class="product">
            <div class="img-container">
                <img src="${img}" alt="product" class="product-img">
                <button class="bag-btn" data-id="${id}">
                    <i class="fas fa-shopping-cart"></i>
                    Add to bag
                </button>
            </div>
            <h3 class='title'>${title}</h3>
            <h4 class='price'>$${price.toFixed(2)}</h4>
        </article>`;
        });
        productsDOM.innerHTML = result;
    }

    this.getBagButtons = function getBagButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttonsDOM = buttons;

        buttons.map(button => {
            let id = button.dataset.id;

            let storageItems = Storages.getProducts();
            if (storageItems) {
                let inCart = storageItems.find(item => item.id === id);
                if (inCart) {
                    button.innerText = 'Add more';
                    // button.disabled = true;
                }
            }
            button.addEventListener('click', e => {
                e.target.innerText = 'Add more';
                // e.target.disabled = true;
                let product = e.target.parentNode.parentNode;
                let img = product.children[0].children[0].src;
                let title = product.children[1].innerText;
                let price = product.children[2].innerText;

                Storages.saveProducts({ id, img, title, price });

                cartItems.innerText = Storages.setTotalCart();
            })

        });
    }
}

// Local Storage
const Storages = {
    saveProducts(product) {
        let productsObj = [];

        let storageItems = this.getProducts();

        if (storageItems) {

            let find = storageItems.find(item => item.id == product.id);
            if (find) {
                storageItems.map(item => {
                    if (item.id == product.id) {
                        item.qty++;
                    }
                })
            } else {
                product.qty = 1;
                storageItems.push(product);
            }

            productsObj = storageItems;
        } else {
            product.qty = 1;
            productsObj.push(product);
        }

        localStorage.setItem('products', JSON.stringify(productsObj));
    },
    getProducts() {
        if (localStorage.getItem('products')) {
            return JSON.parse(localStorage.getItem('products'));
        } else {
            return localStorage.setItem('products', []);
        }
    },
    setTotalCart() {
        let products = Storages.getProducts();
        if (products) {
            return Storages.getProducts().map(item => item.qty).reduce((acc, crr) => acc += crr, 0);
        } else {
            return 0;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI;
    const products = new Products;
    products.getProducts()
        .then(product => {
            ui.displayProducts(product);
            cartItems.innerText = Storages.setTotalCart();
        })
        .then(() => {
            ui.getBagButtons();
        });
});