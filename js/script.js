// Mantém o carrinho salvo mesmo se atualizar ou mudar de página
let itensCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// --- SELETORES REUTILIZÁVEIS ---
const select = (el) => document.querySelector(el);
const selectAll = (el) => document.querySelectorAll(el);

// --- ATUALIZAÇÃO DO CONTADOR (SACOLA) ---
function atualizarContadorVisual() {
    const contador = select("#contador-sacola");
    if (contador) {
        contador.innerText = itensCarrinho.length;
        contador.style.display = itensCarrinho.length > 0 ? "block" : "none";
    }
}
atualizarContadorVisual();

// --- 1. MENU MOBILE (HEADER) ---
const toggle = select(".menu-toggle");
const menu = select(".menu");
if (toggle && menu) {
    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}

// --- 2. CARROSSEL (HOME) ---
let index = 0;
const slides = select(".slides");
const imagensCarrossel = selectAll(".slides img");
const bolinhas = selectAll(".bolinhas span");

if (slides && imagensCarrossel.length > 0) {
    function atualizarCarrossel() {
        slides.style.transform = `translateX(-${index * 100}%)`;
        bolinhas.forEach(b => b.classList.remove("ativa"));
        if (bolinhas[index]) bolinhas[index].classList.add("ativa");
    }

    function proximoSlide() {
        index++;
        if (index >= imagensCarrossel.length) index = 0;
        atualizarCarrossel();
    }
    setInterval(proximoSlide, 3000);
}

// --- 3. CONTROLE DE QUANTIDADE (DESCRIÇÃO) ---
function mudarQtd(valor) {
    const input = select('#quantidade');
    if (!input) return;
    let atual = parseInt(input.value) + valor;
    if (atual >= 1) input.value = atual;
}

// --- 4. LÓGICA DO CARRINHO (ADICIONAR) ---
function adicionarAoCarrinho(nome, preco, qtd = 1) {
    for (let i = 0; i < qtd; i++) {
        itensCarrinho.push({ nome: nome, preco: preco });
    }
    localStorage.setItem('carrinho', JSON.stringify(itensCarrinho));
    atualizarContadorVisual();
}

// Botões de compra das listagens (Cardápios)
const botoesComprarListagem = selectAll('.botao-comprar, .botao-comprar-branco');
botoesComprarListagem.forEach(botao => {
    botao.addEventListener('click', function() {
        const itemPai = this.closest('.item-produto');
        const nome = itemPai.querySelector('.nome-doce').innerText;
        const precoTexto = itemPai.querySelector('.preco-doce').innerText;
        const precoValor = parseFloat(precoTexto.replace('R$', '').replace(',', '.').trim());

        adicionarAoCarrinho(nome, precoValor, 1);

        const textoOriginal = this.innerText;
        this.innerText = "Adicionado! ✓";
        setTimeout(() => this.innerText = textoOriginal, 1200);
    });
});

// Botão comprar da página de detalhes (Descrição)
function adicionar() {
    const nome = select(".nome-produto-detalhe")?.innerText || "Produto";
    const precoTexto = select(".preco-produto-detalhe")?.innerText || "0";
    const precoValor = parseFloat(precoTexto.replace('R$', '').replace(',', '.').trim());
    const qtd = parseInt(select('#quantidade')?.value) || 1;

    adicionarAoCarrinho(nome, precoValor, qtd);
    alert(`${qtd}x ${nome} adicionado à sacola!`);
}

// --- 5. FILTRO DE BUSCA (CARDÁPIO) ---
function filtrarMenu() {
    const busca = select('#campoBusca')?.value.toLowerCase();
    const itens = selectAll('.item-produto');
    if (!busca && busca !== "") return;

    itens.forEach(item => {
        const nomeProduto = item.querySelector('.nome-doce')?.innerText.toLowerCase();
        if (nomeProduto) {
            item.style.display = nomeProduto.includes(busca) ? "flex" : "none";
        }
    });
}

// --- 6. MODAL DO CARRINHO (ABRIR/FINALIZAR) ---
const modal = select("#modalCarrinho");
const iconeSacola = select("#abrirCarrinho");

if (iconeSacola) {
    iconeSacola.onclick = () => {
        if (itensCarrinho.length === 0) return alert("Sua sacola está vazia!");
        
        const container = select('#lista-produtos-carrinho');
        if (!container) return;

        container.innerHTML = "";
        let total = 0;

        itensCarrinho.forEach((item) => {
            total += item.preco;
            container.innerHTML += `
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding:8px 0;">
                    <span style="font-size:14px; color:#704B48;">${item.nome}</span>
                    <strong>R$ ${item.preco.toFixed(2).replace('.', ',')}</strong>
                </div>`;
        });

        const totalFinal = select('#totalFinalModal');
        if (totalFinal) totalFinal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
        if (modal) modal.style.display = "block";
    };
}

function finalizarPedido() {
    alert("🧁 Pedido finalizado com sucesso! \nObrigado por comprar na Sugar Bliss.");
    itensCarrinho = [];
    localStorage.removeItem('carrinho');
    location.reload();
}

// Fechar Modal
const fecharAcoes = selectAll(".fechar-modal, .voltar-link");
fecharAcoes.forEach(el => el.onclick = () => modal.style.display = "none");

window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// --- 7. MONTAGEM DE KIT (PERSONALIZE) ---
const botaoKit = select('.comprar_conteudo a');
const selectsKit = selectAll('.opcao');

if (botaoKit) {
    botaoKit.addEventListener('click', (e) => {
        e.preventDefault();
        let selecionados = [];

        selectsKit.forEach(s => {
            if (s.value !== "") selecionados.push(s.value);
        });

        if (selecionados.length < 5) {
            alert("Escolha todos os itens do kit!");
        } else {
            alert("Kit montado com sucesso!");
            console.log("Itens escolhidos:", selecionados);
        }
    });
}

// --- 8. CADASTRO NEWSLETTER (FOOTER) ---
function cadastrar() {
    const email = select("#email")?.value;
    if (!email || email === "") {
        alert("Digite um email!");
    } else {
        alert("Cadastrado com sucesso 🧁: " + email);
    }
}
