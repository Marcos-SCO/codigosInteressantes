// Fatorial
function fat(n) {
    let fatorial = n;
    for (let i = 1; i < n; i++) {
        fatorial *= i;
        console.log(fatorial);
    }
}
fat(6);