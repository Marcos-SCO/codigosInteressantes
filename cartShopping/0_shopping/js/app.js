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
    this.getCart = async function getCart() {
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
const UI = {
    displayProducts(product) {
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
            <h4>$ <span class='price'>${price.toFixed(2)}</span></h4>
        </article>`;
        });
        productsDOM.innerHTML = result;
    },
    getBagButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttonsDOM = buttons;

        buttons.map(button => {
            let id = button.dataset.id;

            let storageItems = Storages.getCart();
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
                let price = product.children[2].children[0].innerText;

                Storages.saveProducts({ id, img, title, price });

                cartItems.innerText = parseFloat(UI.setTotalCart()[1].toFixed(2));


                // Search for product qty
                let qty = Storages.getCart().find(item => item.id == id).qty;
                // Add to cart
                UI.addCartItem({ id, img, title, price, qty });
                UI.showCart();
            })

        });
    },

    setTotalCart() {
        let products = Storages.getCart();
        let tempTotal = 0;
        let itemsTotal = 0;

        // return the quantity of products in cart
        if (products) {
            products.map(item => {
                tempTotal += item.price * item.qty
            });

            itemsTotal = products.map(item => item.qty).reduce((acc, crr) => acc += crr, 0);

            cartTotal.innerText = tempTotal;

        }

        return [tempTotal, itemsTotal];
    },
    addCartItem({ id, img, title, price, qty }) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <div class="cart-item">
            <img src="${img}" alt="${title}">
            <div>
                <h4>${title}</h4>
                <h5>$ <span class='price'>${price}<span></h5>
                <span class="remove-item" data-id="${id}">remove</span>
            </div>
            <div>
                <i class="fas fa-chevron-up" data-id="${id}"></i>
                <p class="item-amount">${qty}</p>
                <i class="fas fa-chevron-down" data-id="${id}"></i>
            </div>
            </div>`;

        cartContent.appendChild(div);
    },
    showCart() {
        cartOverlay.classList.toggle('transparentBcg');
        cartDOM.classList.toggle('showCart');
    },
    setupApp() {
        let cart = Storages.getCart();
        this.setTotalCart();
        this.populateCart(cart);
        cartBtn.addEventListener('click', this.showCart);
        closeCartBtn.addEventListener('click', this.showCart);
    },
    populateCart(cart) {
        cart.map(item => this.addCartItem(item))
    }
}

// Local Storage
const Storages = {
    saveProducts(product) {
        let storageItems = this.getCart();

        if (storageItems) {
            // find id add 1 if exists
            if (storageItems.find(item => item.id == product.id)) {
                storageItems.map(item => {
                    if (item.id == product.id) {
                        item.qty++;
                    }
                })
            } else {
                product.qty = 1;
                storageItems.push(product);
            }

            cart = storageItems;
        } else {
            product.qty = 1;
            cart.push(product);
        }

        localStorage.setItem('products', JSON.stringify(cart));
    },
    getCart() {
        // Get items or empty array with products key
        return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : localStorage.setItem('products', []);
    },

}

document.addEventListener('DOMContentLoaded', () => {
    const ui = Object.create(UI);
    const products = new Products;
    products.getCart()
        .then(product => {
            ui.displayProducts(product);
            cartItems.innerText = ui.setTotalCart()[1];
        })
        .then(() => {
            ui.getBagButtons();
        });
});