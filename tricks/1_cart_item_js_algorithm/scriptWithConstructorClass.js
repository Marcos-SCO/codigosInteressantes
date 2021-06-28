// Cart
let cart = [];

// Constructor function to create a product
function createProduct(id, qtd, price) {
    this.id = id;
    this.qtd = qtd;
    this.price = price;
}
/*
Product obj
let ap = {
    id: "a@p",
    qtd: 1,
    price: 2
};
*/
let ap = new createProduct('a@p', 1, 2);
let bp = new createProduct('b@p', 1, 2);
let bm = new createProduct('b@m', 1, 3);

function addToCart(product) {
    // verifies if product is already in cart
    let find = cart.findIndex(item => item.id == product.id);
    // find > -1 then increment qtd, otherwise add product
    return find > -1 ? cart[find].qtd++ : cart.push(product);
}

addToCart(ap);
addToCart(bp);
addToCart(bp);
addToCart(bm);

// Map itens, multiply qtd and price than some results
let totalPrice =
    cart.map(({ qtd, price }) => qtd * price)
        .reduce((acc, crr) => acc += crr, 0);

console.log(totalPrice);
