// MENU HEADER
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// CARROSSEL HOME
let index = 0;

const slides = document.querySelector(".slides");
const total = document.querySelectorAll(".slides img").length;
const bolinhas = document.querySelectorAll(".bolinhas span");

function atualizarCarrossel() {
  slides.style.transform = `translateX(-${index * 100}%)`;

  bolinhas.forEach(b => b.classList.remove("ativa"));
  bolinhas[index].classList.add("ativa");
}

function proximoSlide() {
  index++;
  if (index >= total) index = 0;
  atualizarCarrossel();
}

setInterval(proximoSlide, 3000);

// FOOTER

function cadastrar() {
  const email = document.getElementById("email").value;

  if(email === "") {
    alert("Digite um email!");
  } else {
    alert("Cadastrado com sucesso: " + email);
  }
}

// PERSONALIZE
const botao = document.querySelector('.comprar_conteudo a');
const selects = document.querySelectorAll('.opcao');

botao.addEventListener('click', (e) => {
    e.preventDefault();

    let selecionados = [];

    selects.forEach(select => {
        if (select.value !== "") {
            selecionados.push(select.value);
        }
    });

    if (selecionados.length < 5) {
      alert("Escolha todos os itens do kit!");
    } else {
        alert("Kit montado com sucesso!");
        console.log("Itens escolhidos:", selecionados);
    }
});