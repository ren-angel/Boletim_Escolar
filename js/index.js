const input_quantidade = document.getElementById('input-quantidade');

const AlunoTexto = document.getElementById('aluno-texto');
const aluno = document.getElementById('aluno');

let AlunoIndice = 0;
let NotaIndice = 0;

const Nomes = [];
const InfoAluno = new Map();
const Media = [];
let MediaGeral = 0;
const Situacao = [];
const AlunosAbaixoDaMedia = [];

function enviarQuantidade(event) {

  let tecla = event.key;

  if (tecla === "Enter") {

    try {

      if (input_quantidade.value < 1 || input_quantidade.value > 40) throw "Digite um valor de 1 a 40"

      if (isNaN(input_quantidade.value)) throw "Digite um valor númerico válido"
  
      event.target.disabled = true;
  
      enviarAluno();
    } catch (err) {

      toastNotify(err);
    }
  }
}

function enviarAluno() {

  AlunoTexto.innerHTML = "Digite o nome do aluno N° " + (AlunoIndice + 1);

  const aluno = document.getElementById('aluno');

  let AlunoNome = document.createElement('input');

  aluno.appendChild(AlunoNome);

  AlunoNome.addEventListener('keydown', function(event) {

    if (event.key === "Enter") {

      try {

        if (AlunoNome.value.length === 0) throw "Digite um valor antes de avançar"
    
        Nomes[AlunoIndice] = AlunoNome.value;

        animacaoProximoInput(aluno);
  
        AlunoIndice++;
  
        if (AlunoIndice < input_quantidade.value) {
  
          enviarAluno();
        } else {
  
          AlunoIndice = 0;
  
          enviarNota();
        }
      } catch (err) {
  
        toastNotify(err);
      }
    }
  });
}

function enviarNota() {

  AlunoTexto.innerHTML = "Digite as 4 notas (0 a 100) do aluno: <br>" + Nomes[AlunoIndice];

  const Notas = [];

  for (let i = 0; i < 4; i++) {

    Notas.length = 0;

    let NotaNumero = document.createElement('p');

    NotaNumero.appendChild(document.createTextNode((i + 1) + "° Nota"));

    aluno.appendChild(NotaNumero);

    let NotaInput = document.createElement('input');

    NotaInput.setAttribute("id", 'nota' + i);

    aluno.appendChild(NotaInput);
  }

  aluno.appendChild(document.createElement("br"));

  let botao = document.createElement('button');

  botao.addEventListener('click', function() {

    for (let i = 0; i < 4; i++) {

      let Nota = document.getElementById('nota' + i);

      Notas[i] = Nota.value;
    }

    try {

      if (Notas.includes('')) throw "Digite um valor para cada nota antes de enviar"

      Notas.forEach((nota) => {

        if (nota < 0 || nota > 100) throw "Digite apenas notas dentre 0 a 100"
      });

      Notas.forEach((nota) => {

        if (isNaN(nota)) throw "Digite apenas valores númericos válidos"
      });
  
      InfoAluno.set(Nomes[AlunoIndice], Notas);
  
      calcularMedia();
  
      animacaoProximoInput(aluno);
  
      AlunoIndice++;
  
      NotaIndice++;
  
      if (NotaIndice < Nomes.length) {
  
        enviarNota();
      } else {
  
        mostrarResultados();
      }
    } catch (err) {

      toastNotify(err);
    }
  });

  botao.appendChild(document.createTextNode("ENVIAR"));

  aluno.appendChild(botao);
}

function calcularMedia() {

  Media.length = 0;

  InfoAluno.forEach(valor => {

    let soma = valor.reduce((acumulador, atual) => acumulador + parseFloat(atual), 0);

    Media.push(soma / 4);

    soma = 0;
  });

  const SomaGeral = Media.reduce((acumulador, atual) => (acumulador + atual), 0);

  MediaGeral = SomaGeral  / Media.length;
}

function atribuirSituacao() {

  Situacao.length = 0;

  for (let i = 0; i < Media.length; i++) {

    if (Media[i] >= 70) {

      Situacao.push("Aprovado");
    } else if (Media [i] >= 50 && Media[i] < 70) {

      Situacao.push("Recuperação");
    } else {

      Situacao.push("Reprovado");
    }
  }
}

function pegarAlunosAbaixoDaMedia() {

  AlunosAbaixoDaMedia.length = 0;

  for (let i = 0; i < Nomes.length; i++) {

    if (Media[i] < MediaGeral) {
      
      AlunosAbaixoDaMedia.push(Nomes[i]);
    }
  }
}

function toastNotify(texto) {

  Toastify({
    text: texto,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
        background: "#e8391a",
    }
  }).showToast();
}

function mostrarResultados() {

  atribuirSituacao();
  pegarAlunosAbaixoDaMedia();

  localStorage.setItem("Nomes", JSON.stringify(Nomes));
  localStorage.setItem("InfoAluno", JSON.stringify(Array.from(InfoAluno.entries())));
  localStorage.setItem("Media", JSON.stringify(Media));
  localStorage.setItem("Situacao", JSON.stringify(Situacao));
  localStorage.setItem("MediaGeral", MediaGeral);
  localStorage.setItem("AlunosAbaixoDaMedia", JSON.stringify(AlunosAbaixoDaMedia));

  window.location.href = "resultado.html";
}

function animacaoProximoInput(elemento) {

  elemento.style.marginLeft = "100px";

  elemento.style.opacity = 0;
  
  elemento.innerHTML = '';

  setTimeout(function() {
    elemento.style.marginLeft = "0px";

    elemento.style.opacity = 1;
  }, 300);
}