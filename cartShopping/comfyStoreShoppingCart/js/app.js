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
        const buttons = Array.from(document.querySelectorAll('.bag-btn'));
        buttonsDOM = buttons;

        buttons.map(button => {
            let id = button.dataset.id;
            let storageItems = Storages.getCart();

            if (storageItems) {
                let inCart = storageItems.find(item => item.id === id);
                if (inCart) button.innerText = 'Add more';
                // button.disabled = true;
            }
            button.addEventListener('click', e => {
                e.target.innerText = 'Add more';
                // e.target.disabled = true;
                let product = e.target.parentNode.parentNode;
                let img = product.children[0].children[0].src;
                let title = product.children[1].innerText;
                let price = product.children[2].children[0].innerText;

                Storages.saveProducts({ id, img, title, price });

                // Search for product qty
                let qty = Storages.getCart().find(item => item.id == id).qty;

                let inCartProduct = Storages.getCart().find(item => item.id == id).qty;
                // Add to cart
                if (inCartProduct === 1) {
                    UI.addCartItem({ id, img, title, price, qty });
                } else {
                    let dataId = document.querySelector(`.price-item-${id}`);
                    if (dataId) dataId.innerText = +dataId.textContent + 1;
                }

                UI.toggleCartDisplay();
                UI.setTotalCart();
            })

        });
    },
    updateSingleItemPrices(cartItemId, currItem) {
        let priceDisplay = document.querySelector(`[data-cart-id='${cartItemId}'] .price-display`);
        let priceElement = document.querySelector(`[data-cart-id='${cartItemId}'] .price`);
        let priceQtd = document.querySelector(`[data-cart-id='${cartItemId}'] .price-qty`);

        priceQtd.innerText = currItem.qty;
        priceElement.innerText = this.multiplySingleItemPrice(currItem.price, currItem.qty)
    },
    setTotalCart() {
        let products = Storages.getCart();
        clearCartBtn.innerText = 'Clear Cart';

        // return the quantity of products in cart
        if (products) {
            let tempTotal = products.reduce((acc, item) =>
                acc += item.price * item.qty, 0);

            let itemsTotal = products.map(item => item.qty)
                .reduce((acc, crr) => acc += crr, 0);

            cartTotal.innerText = tempTotal.toFixed(2);
            cartItems.innerText = itemsTotal;
        }

        if (products.length === 0) clearCartBtn.innerText = 'Add to Cart';
    },
    addCartItem({ id, img, title, price, qty }) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <div class="cart-item" data-cart-id="${id}">
            <img src="${img}" alt="${title}">
            <div class='price-display'>
                <h4>${title}</h4>
                <h5>$<span class='price'>${price}<span></h5>
                <small>$${price} X <span class="price-qty">${qty}</span></small>
                <span class="remove-item" data-id="${id}">remove</span>
            </div>
            <div>
                <i class="fas fa-chevron-up" data-id="${id}"></i>
                <p class="item-amount price-item-${id}">${qty}</p>
                <i class="fas fa-chevron-down" data-id="${id}"></i>
            </div>
            </div>`;

        cartContent.appendChild(div);
    },
    toggleCartDisplay() {
        cartOverlay.classList.toggle('transparentBcg');
        cartDOM.classList.toggle('showCart');
    },
    setupApp() {
        let cart = Storages.getCart();
        this.setTotalCart();
        this.populateCart(cart);
        // Toggle the cart display
        [cartBtn, closeCartBtn, cartOverlay].forEach(item =>
            item.addEventListener('click', this.toggleCartDisplay));

        cart.forEach(cartCurrItem => this.updateSingleItemPrices(cartCurrItem.id, cartCurrItem));
    },
    populateCart(cart) {
        cart.map(item => this.addCartItem(item))
    },
    multiplySingleItemPrice(price, multiplyTo) {
        return (price * multiplyTo).toFixed(2);
    },
    cartLogic() {
        clearCartBtn.addEventListener('click', () => this.clearCart());

        cartContent.addEventListener('click', e => {
            if (e.target.classList.contains('remove-item')) {
                let removeItem = e.target;
                let id = removeItem.dataset.id;

                cartContent.removeChild(removeItem.parentElement.parentElement.parentElement);

                this.removeCartItem(id);
            }

            if (e.target.classList.contains('fa-chevron-up')) {
                cart = Storages.getCart();
                let addAmount = e.target;
                let id = addAmount.dataset.id;
                let currUpItem = cart.find(item => item.id === id);
                currUpItem.qty++;

                Storages.saveToStorage(cart);

                addAmount.nextElementSibling.innerText = currUpItem.qty;
                this.updateSingleItemPrices(id, currUpItem);
            }

            if (e.target.classList.contains('fa-chevron-down')) {
                cart = Storages.getCart();

                let lowerAmount = e.target;
                let id = lowerAmount.dataset.id;
                let currDownItem = cart.find(item => item.id === id);

                Storages.saveToStorage(cart);
                let isQtyGreaterThanZero = currDownItem.qty > 0;

                if (isQtyGreaterThanZero) {
                    currDownItem.qty--;
                    Storages.saveToStorage(cart);
                    lowerAmount.previousElementSibling.innerText = currDownItem.qty;
                    this.updateSingleItemPrices(id, currDownItem);
                }

                if (currDownItem.qty == 0) {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement.parentElement);
                    this.removeCartItem(id);
                }

            }

            if (Storages.getCart() <= 0) this.clearCart();

            this.setTotalCart();
        });
    },
    clearCart() {
        let cartItemsId = Storages.getCart().map(item => item.id);
        cartItemsId.map(id => this.removeCartItem(id));

        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }

        this.setTotalCart();
        this.toggleCartDisplay();
    },
    removeCartItem(id) {
        cart = Storages.getCart().filter(item => item.id !== id);
        this.setTotalCart();
        Storages.saveToStorage(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-shopping-cart"></i>Add to bag';
    },
    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id);
    }
}

// Local Storage
const Storages = {
    saveProducts(product) {
        let storageItems = this.getCart();

        const idProductAlreadyExists = storageItems
            .find(item => item.id == product.id);

        if (!idProductAlreadyExists) {
            product.qty = 1;
            storageItems.push(product);
        }

        if (idProductAlreadyExists) {
            storageItems.map(item => {
                if (item.id == product.id) {
                    item.qty++;
                }
            });
        }

        cart = storageItems;

        // Save to localStorage
        this.saveToStorage(cart);
    },
    saveToStorage(obj) {
        return localStorage.setItem('products', JSON.stringify(obj));
    },
    getCart() {
        // Get items or empty array with products key
        return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    },

}

document.addEventListener('DOMContentLoaded', () => {
    const ui = Object.create(UI);
    const products = new Products;

    ui.setupApp();

    products.getCart()
        .then(product => {
            ui.displayProducts(product);
            ui.setTotalCart();
        })
        .then(() => {
            ui.getBagButtons();
            ui.cartLogic();
        });
});