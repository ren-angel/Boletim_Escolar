const Nomes = JSON.parse(localStorage.getItem("Nomes"));
const InfoAlunoEntries = JSON.parse(localStorage.getItem("InfoAluno"));
const Media = JSON.parse(localStorage.getItem("Media"));
const Situacao = JSON.parse(localStorage.getItem("Situacao"));
const MediaGeral = localStorage.getItem("MediaGeral");
const AlunosAbaixoDaMedia = JSON.parse(localStorage.getItem("AlunosAbaixoDaMedia"));

const InfoAluno = new Map(InfoAlunoEntries);

const conteudo = document.getElementById('conteudo');

const topo = document.createElement('div');
topo.classList.add('topo')

const calculator_img = document.createElement('img');
calculator_img.src = "img/calculator.png";

topo.appendChild(calculator_img);

const pencil_img = document.createElement('img');
pencil_img.src = "img/pencil.png";

topo.appendChild(pencil_img);

conteudo.appendChild(topo);

for (let i = 0; i < Nomes.length; i++) {

    if (Situacao[i] === "Aprovado") {

        const infoAlunoTexto = document.createElement('p');

        const aprovado_div = document.createElement('div');
        aprovado_div.classList.add('aprovado');
        
        infoAlunoTexto.appendChild(document.createTextNode("Nome do aluno: " + Nomes[i]));
        infoAlunoTexto.appendChild(document.createElement("br"));
        
        infoAlunoTexto.appendChild(document.createTextNode("Notas: " + InfoAluno.get(Nomes[i])));
        infoAlunoTexto.appendChild(document.createElement("br"));
        
        infoAlunoTexto.appendChild(document.createTextNode("Média final: " + Media[i]));
        infoAlunoTexto.appendChild(document.createElement("br"));
        
        infoAlunoTexto.appendChild(document.createTextNode("Situação: " + Situacao[i]));
        infoAlunoTexto.appendChild(document.createElement("br"));

        aprovado_div.appendChild(infoAlunoTexto);

        conteudo.appendChild(aprovado_div);

        conteudo.appendChild(document.createElement("br"));
    } else if (Situacao[i] === "Recuperação") {

        const infoAlunoTexto = document.createElement('p');

        const recuperacao_div = document.createElement('div')
        recuperacao_div.classList.add('recuperacao');

        
        infoAlunoTexto.appendChild(document.createTextNode("Nome do aluno: " + Nomes[i]));
        infoAlunoTexto.appendChild(document.createElement("br"));
        
        infoAlunoTexto.appendChild(document.createTextNode("Notas: " + InfoAluno.get(Nomes[i])));
        infoAlunoTexto.appendChild(document.createElement("br"));
        
        infoAlunoTexto.appendChild(document.createTextNode("Média final: " + Media[i]));
        infoAlunoTexto.appendChild(document.createElement("br"));
        
        infoAlunoTexto.appendChild(document.createTextNode("Situação: " + Situacao[i]));
        infoAlunoTexto.appendChild(document.createElement("br"));

        recuperacao_div.appendChild(infoAlunoTexto);

        conteudo.appendChild(recuperacao_div);

        conteudo.appendChild(document.createElement("br"));
    } else if (Situacao[i] === "Reprovado") {

        const infoAlunoTexto = document.createElement('p');

        const reprovado_div = document.createElement('div');
        reprovado_div.classList.add('reprovado');

        
        infoAlunoTexto.appendChild(document.createTextNode("Nome do aluno: " + Nomes[i]));
        infoAlunoTexto.appendChild(document.createElement("br"));
        
        infoAlunoTexto.appendChild(document.createTextNode("Notas: " + InfoAluno.get(Nomes[i])));
        infoAlunoTexto.appendChild(document.createElement("br"));
        
        infoAlunoTexto.appendChild(document.createTextNode("Média final: " + Media[i]));
        infoAlunoTexto.appendChild(document.createElement("br"));
        
        infoAlunoTexto.appendChild(document.createTextNode("Situação: " + Situacao[i]));
        infoAlunoTexto.appendChild(document.createElement("br"));

        reprovado_div.appendChild(infoAlunoTexto);

        conteudo.appendChild(reprovado_div);

        conteudo.appendChild(document.createElement("br"));
    }
}

const infoGeral = document.createElement('p');
infoGeral.classList.add('info-geral');

infoGeral.appendChild(document.createTextNode("Média geral da turma: " + Math.floor(MediaGeral * 100) / 100));
infoGeral.appendChild(document.createElement("br"));

infoGeral.appendChild(document.createTextNode("Aluno(s) com a média final abaixo da média geral: " + AlunosAbaixoDaMedia));
infoGeral.appendChild(document.createElement("br"));

conteudo.appendChild(infoGeral);

const fundo = document.createElement('div');
fundo.classList.add('fundo')

const exam_img = document.createElement('img');
exam_img.src = "img/exam.png";

fundo.appendChild(exam_img);

const botao = document.createElement('button');

botao.addEventListener('click', function() {

    window.location.href = "index.html";
});

botao.appendChild(document.createTextNode("Voltar"));

fundo.appendChild(botao);

const numbers_img = document.createElement('img');
numbers_img.src = "img/numbers.png";

fundo.appendChild(numbers_img);

conteudo.appendChild(fundo);