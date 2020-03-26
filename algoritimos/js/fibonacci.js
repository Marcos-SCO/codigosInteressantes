// Fibonacci
function fibonacci(n) {
    let num1 = 0, num2 = 1;
    for (let i = 0; i < n; i++) {
        some = num1 + num2;
        num1 = num2;
        num2 = some;
        console.log(some);
    }
}
fibonaci(5);
