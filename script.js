

const aranha = document.getElementById("mouse");

document.addEventListener("mousemove", function(event) {

    aranha.style.left = event.clientX + "px";
    aranha.style.top = event.clientY + "px";

});



const boasVindas =
    document.getElementById("boasVindas");

const entrarLoja =
    document.getElementById("entrarLoja");


entrarLoja.addEventListener("click", function() {

    boasVindas.style.display = "none";

});




let carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];


const contador =
    document.getElementById("contadorCarrinho");

const listaCarrinho =
    document.getElementById("listaCarrinho");

const totalCarrinho =
    document.getElementById("totalCarrinho");




function atualizarCarrinho() {

    contador.textContent = carrinho.length;


    if (carrinho.length === 0) {

        listaCarrinho.innerHTML = `
            <p>
                Seu carrinho está vazio.
            </p>
        `;

        totalCarrinho.textContent = "R$ 0,00";

        return;
    }


    listaCarrinho.innerHTML = "";

    let total = 0;


    carrinho.forEach(function(produto, index) {

        total += produto.preco;


        const item =
            document.createElement("div");


        item.className =
            "item-carrinho";


        item.innerHTML = `

            <div>

                <h3>
                    ${produto.nome}
                </h3>

                <p>
                    R$ ${produto.preco
                        .toFixed(2)
                        .replace(".", ",")}
                </p>

            </div>

            <button
                class="remover-produto"
                onclick="removerProduto(${index})"
            >
                🗑️
            </button>

        `;


        listaCarrinho.appendChild(item);

    });


    totalCarrinho.textContent =
        "R$ " +
        total.toFixed(2).replace(".", ",");

}




function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}




function adicionarProduto(botao) {

    const nome =
        botao.dataset.nome;

    const preco =
        Number(botao.dataset.preco);


    carrinho.push({

        nome: nome,

        preco: preco

    });


    salvarCarrinho();

    atualizarCarrinho();

}



const botoesComprar =
    document.querySelectorAll(".btn-comprar");


botoesComprar.forEach(function(botao) {

    botao.addEventListener("click", function() {

        adicionarProduto(botao);

    });

});

function mostrarImagem(caminhoDaImagem) {

    document.getElementById(
        "imagem-sucesso"
    ).src = caminhoDaImagem;


    const botao =
        event.currentTarget;


    const nome =
        botao.dataset.nome;


    document.getElementById(
        "nomeProdutoModal"
    ).textContent =
        `"${nome}" foi adicionado ao carrinho!`;


    document.getElementById(
        "janela-imagem"
    ).style.display = "flex";

}



function fecharImagem() {

    document.getElementById(
        "janela-imagem"
    ).style.display = "none";

}



function removerProduto(index) {

    carrinho.splice(index, 1);

    salvarCarrinho();

    atualizarCarrinho();

}




document
    .getElementById("abrirCarrinho")
    .addEventListener("click", function() {

        document
            .getElementById("carrinho")
            .classList.add("aberto");

        document
            .getElementById("fundoCarrinho")
            .classList.add("aberto");

    });




function fecharCarrinho() {

    document
        .getElementById("carrinho")
        .classList.remove("aberto");

    document
        .getElementById("fundoCarrinho")
        .classList.remove("aberto");

}



function mostrarNome() {

    const nome =
        document.getElementById("nome").value;

    document.getElementById(
        "mensagemNome"
    ).textContent =
        `Olá, ${nome}! Obrigado por entrar em contato. ❤️`;

}



const listas =
    document.querySelectorAll(".lista-produtos");


listas.forEach(function(lista) {

    let pressionando = false;

    let inicioX;

    let scrollInicial;


    lista.addEventListener(
        "mousedown",
        function(event) {

            pressionando = true;

            lista.style.cursor = "grabbing";

            inicioX =
                event.pageX -
                lista.offsetLeft;

            scrollInicial =
                lista.scrollLeft;

        }
    );


    lista.addEventListener(
        "mouseup",
        function() {

            pressionando = false;

            lista.style.cursor = "grab";

        }
    );


    lista.addEventListener(
        "mouseleave",
        function() {

            pressionando = false;

            lista.style.cursor = "grab";

        }
    );


    lista.addEventListener(
        "mousemove",
        function(event) {

            if (!pressionando) {
                return;
            }


            event.preventDefault();


            const x =
                event.pageX -
                lista.offsetLeft;


            const distancia =
                (x - inicioX) * 1.5;


            lista.scrollLeft =
                scrollInicial - distancia;

        }
    );

});



atualizarCarrinho();
