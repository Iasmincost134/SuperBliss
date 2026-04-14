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

function cadastrar() {
  const email = document.getElementById("email").value;

  if(email === "") {
    alert("Digite um email!");
  } else {
    alert("Cadastrado com sucesso: " + email);
  }
}