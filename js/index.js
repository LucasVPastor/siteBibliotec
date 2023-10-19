// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC95RHcPl1VhNT484rnwWDaE_E8cC_q4ZQ",
    authDomain: "tccsb-39f62.firebaseapp.com",
    projectId: "tccsb-39f62",
    storageBucket: "tccsb-39f62.appspot.com",
    messagingSenderId: "446535834077",
    appId: "1:446535834077:web:b43e6da142918afae53e34",
    measurementId: "G-QFJFTQ66ZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, set, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

const db = getDatabase();
//------- Referencias -----------

var nomeLivro = document.getElementById("nomeLivro");
var nomeLivroP = document.getElementById("nomeLivroP");
var insBtn = document.getElementById("Insbtn");
var slctBtn = document.getElementById("Slctbtn");
var filtroFc = document.getElementById("filtroFc");

// ---------- insert function ---------------------------

function InserirDados() {
    set(ref(db, "livros/" + nomeLivro.value), {
        nomeLivro: nomeLivro.value
    })
        .then(() => {
            alert("dados inseridos");
        })
        .catch((error) => {
            alert("Erro: " + error);
        });
}
// ---------- select function ---------------------------

function SelecionarDados() {
    const dbref = ref(db);

    get(child(dbref, "livros/" + nomeLivro.value))
        .then((snapshot) => {
            if (snapshot.exists()) {
                nomeLivroP.value = snapshot.val().nomeLivro;
            }
            else {
                alert("Não há dados");
            }

        })
        .catch((error) => {
            alert("Erro: " + error);
        })
}
function SelecionarDadosFiltro() {
    window.location = "../index.html";
    const dbref = ref(db);

    get(child(dbref, "livros/" + search.value))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // FILTRO COM IF :

            }
            else {
                alert("Não há dados");
            }

        })
        .catch((error) => {
            alert("Erro: " + error);
        })
}

//  GET ALL 
var stdNo = 0;
var cntrPrin = document.getElementById('container-principal');
var cBooks = document.getElementById('container-books-Romance');
var cBooksFc = document.getElementById('container-books-FC');
var urlAtual = window.location.href;

var urlFiltro = new URL(urlAtual);
var urlSearch = new URL(urlAtual);
var search = urlSearch.searchParams.get("search");
var filtro = urlFiltro.searchParams.get("filtro");
var urlArray = urlAtual.split('/');
var ultimaBarra = urlArray[urlArray.length - 1];
//
//
function AddItemToTable(nomeLivro, gênero, urlImg) {
    console.log(filtro);
    console.log(search);
    console.log(ultimaBarra);

    var searchSimilar = [];
        searchSimilar = trataSearch(search);
      //  console.log(searchSimilar);  
    var nomeLivroSimilar = [];
        nomeLivroSimilar = similaLivro(nomeLivro);
       // console.log(nomeLivroSimilar);
    //correspondeString(searchSimilar, nomeLivroSimilar);
    // -------------------------------------------------------- SEM PESQUISA E FILTRO
    if (ultimaBarra == 'index.html' || ultimaBarra == '' || search == '') {

        let divE = document.createElement("div");
        divE.className = 'estil-books';
        let img = document.createElement("img");
        img.src = urlImg;
        let a = document.createElement("a");
        a.innerText = 'Reservar';
        a.href = "aluguel.html?alugar=" + nomeLivro;

        divE.appendChild(img);
        divE.appendChild(a);
        if (gênero == "Romance") {
            cBooks.appendChild(divE);
        }
        if (gênero == "Ficção Cientifica") {
            cBooksFc.appendChild(divE);
        }
    }
    // ----------------------------------------------------- PESQUISA POR NOME
    if (search == nomeLivro ||correspondeString(searchSimilar, nomeLivroSimilar) && filtro == null) {
        console.log("URL DA IMAGEM"+urlImg);
        let divE = document.createElement("div");
        divE.className = 'estil-books';
        let img = document.createElement("img");
        img.src = urlImg;
        let a = document.createElement("a");
        a.innerText = 'Reservar';
        a.href = "aluguel.html?alugar=" + nomeLivro;

        divE.appendChild(img);
        divE.appendChild(a);

        if (gênero == "Romance") {
            cBooks.appendChild(divE);
        }
        if (gênero == "Ficção Cientifica") {
            cBooksFc.appendChild(divE);
        }
    }
    // ----------------------------------------------------- PESQUISA POR GÊNERO    
    if (gênero == filtro) {
        let divE = document.createElement("div");
        divE.className = 'estil-books';
        let img = document.createElement("img");
        img.src = "img/livros/" + nomeLivro + ".jpg";
        let a = document.createElement("a");
        a.innerText = 'Reservar';
        a.href = "aluguel.html?alugar=" + nomeLivro;

        divE.appendChild(img);
        
        divE.appendChild(a);
        if (gênero == "Romance") {
            cBooks.appendChild(divE);
        }
        if (gênero == "Ficção Cientifica") {
            cBooksFc.appendChild(divE);
        }
    }
}
function AddAllItemToTable(livro) {
    stdNo = 0;
    cBooks.innerHTML = "";
    livro.forEach(element => {
        AddItemToTable(element.nomeLivro, element.gênero, element.urlImg);
    });
}
//---------GET ALL DADOS-----------------
function GetAllDataOnce() {
    const dbref = ref(db);
    get(child(dbref, "livros"))
        .then((snapshot) => {
            var livros = [];
            snapshot.forEach(childSnapshot => {

                livros.push(childSnapshot.val());
            });
            GetAllDataRealTime();
        });
}
//----------GET ALL TEMPO REAL------------
function GetAllDataRealTime() {
    const dbref = ref(db, "livros");

    onValue(dbref, (snapshot) => {
        var livros = [];
        snapshot.forEach(childSnapshot => {
            livros.push(childSnapshot.val());
        });

        AddAllItemToTable(livros);
    })
}
function reloadCache() {
    window.location.reload();
}


// EVENTOS
//setInterval(reloadCache, 60 * 1000);
window.onload = GetAllDataOnce;

// TRATAMENTOS
// TRATAMENTO DO SEARCH
function trataSearch(search){
    if(!search){
        console.log("Nada Pesquisado!");

    }
    else{
    var searchSimilar = search;

    var palavras = searchSimilar.split(" ");
    for (let i = 0; i < palavras.length; i++) {
        palavras[i] = palavras[i][0].toUpperCase() + palavras[i].substr(1);
    }
        //console.log(palavras);
        palavras = palavras.join(" ");
       palavras = palavras.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    console.log("TRATA SEARCH: "+ palavras);
    return palavras;
    }
}
// TARATAMENTO PARA O NOME LIVROS
function similaLivro(nomeLivro){
    return nomeLivro.split(" ")
    .map(word => word.charAt(0)
    .toUpperCase() + word.slice(1))
    .join(" ")
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function correspondeString(searchSimilar, nomeLivroSimilar){
    console.log("CORRESPONDE STRING 1: ");
    console.log(nomeLivroSimilar);
    console.log("-------------------");
    console.log("CORRESPONDE STRING 2: ");
    console.log(searchSimilar);
    console.log("-------------------");
    if (searchSimilar && nomeLivroSimilar) {
        for (let i = 0; i < nomeLivroSimilar.length; i++) {
            if (nomeLivroSimilar[i].includes(searchSimilar) || nomeLivroSimilar == searchSimilar) {
                return true;
            }else{
                // nomeLivroSimilar = nomeLivroSimilar.split(" ");
                // searchSimilar = searchSimilar.split(" ");
                // console.log(Array(nomeLivroSimilar));
                // console.log("-------------------");
                // console.log(Array(searchSimilar));
                // console.log("-------------------");
                    // if(nomeLivroSimilar[i] == searchSimilar[i]){
                    //     return true;
                    // }
            }
        }
    }
    return false;
}

// nomeLivroSimilar = nomeLivroSimilar.split(" ")
  //  nomeLivroSimilar = Array(nomeLivroSimilar);
 //   
 //   console.log(searchSimilar);
   /* var corresponde = 0;
  if(searchSimilar && nomeLivroSimilar){
        for (let i = 0; i < nomeLivroSimilar.length || i < searchSimilar.length; i++) {
                if(nomeLivroSimilar == searchSimilar){
                    corresponde = corresponde + 1;
                }
        }
        console.log(corresponde);
        if(corresponde >= 2){
            console.log("Talvez o livro corresponda mesmo");
            return true;
        }
        else{
            console.log("Se pá, ta errado esse livro aí");
        }
    
    } 
--------------------------------------------------------------------------------------------------------------
        var nomeLivroSimilar = nomeLivro.split(" ");
            for (let i = 0; i < nomeLivroSimilar.length; i++) {
                nomeLivroSimilar[i] = nomeLivroSimilar[i][0].toUpperCase() + nomeLivroSimilar[i].substr(1);
            } 
           // console.log(nomeLivroSimilar);
            nomeLivroSimilar = nomeLivroSimilar.join(" ");
           nomeLivroSimilar = nomeLivroSimilar.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    console.log("SIMILA LIVRO: "+nomeLivroSimilar);
    
    return nomeLivroSimilar;
    
    

    
    
    
    
    
    */