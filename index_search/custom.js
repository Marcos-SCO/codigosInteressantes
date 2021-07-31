async function registerArticle() {
    document.getElementById("registerArticle").textContent = "Cadastrando...";
    document.getElementById('btnRegisterArticle').disabled = true;
    const URL = `cad_article.php`;
    await fetch(URL);
    document.getElementById("registerArticle").textContent = "Cadastrar";
    document.getElementById('btnRegisterArticle').disabled = false;
}

async function registerWithIndex(qnt) {
    document.getElementById("registerWithIndex").textContent = "Cadastrando...";
    document.getElementById('btnRegisterWithIndex').disabled = true;
    const URL = `cad_access_with_index.php`;
    await fetch(URL);
    if (qnt < 507) {
        var countQntComIndice = qnt + 1;
        console.log(countQntComIndice);
        registerWithIndex(countQntComIndice);
    } else {
        document.getElementById("registerWithIndex").textContent = "Cadastrar";
        document.getElementById('btnRegisterWithIndex').disabled = false;
    }
}

async function registerWithoutIndex(qnt) {
    document.getElementById("registerWithoutIndex").textContent = "Cadastrando...";
    document.getElementById('btnRegisterWithoutIndex').disabled = true;
    const URL = `cad_access_without_index.php`;
    await fetch(URL);
    if (qnt < 507) {
        var countQntSemIndice = qnt + 1;
        console.log(countQntSemIndice);
        registerWithoutIndex(countQntSemIndice);
    } else {
        document.getElementById("registerWithoutIndex").textContent = "Cadastrar";
        document.getElementById('btnRegisterWithoutIndex').disabled = false;
    }
}