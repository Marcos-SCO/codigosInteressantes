// Fatorial
function fibonaci(n) {
    let num1 = 0, num2 = 1;
    for (let i = 0; i < n; i++) {
        som = num1 + num2;
        num1 = num2;
        num2 = som;
        console.log(som);
    }
}
fibonaci(5);