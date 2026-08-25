const botoesComprar = document.querySelectorAll('.btn-comprar');

botoesComprar.forEach(botao => {
    botao.addEventListener('click', () => {

        const nomeProduto = botao.parentElement.querySelector('h3').innerText;

        alert(`O produto "${nomeProduto}" foi adicionado ao carrinho com sucesso!`);

    });
});