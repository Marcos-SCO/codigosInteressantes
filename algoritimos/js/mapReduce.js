// const products = [
//     {id: 1, name:'PS5', price:500, qtd:2},
//     {id: 2, name:'X-BOX', price:500, qtd:3}
// ];

// const total = products
// .map(item => item.price * item.qtd)
// .reduce((init, subTotal) => subTotal + init, 0);

// console.log(total);

const products = [
    { id: 1, name: 'PS5', price: 500, qtd: 3 },
    { id: 2, name: 'X-BOX', price: 500, qtd: 3 },
    { id: 3, name: 'Nintendo Switch', price: 350, qtd: 2 },
];
const subTotal = item => item.price * item.qtd;
const total = products
    .map(subTotal)
    .reduce((initial, subTotal) => subTotal + initial, 0);
console.log(total);
