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
 import {getDatabase, ref, set, get, child, onValue,update, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

 const db = getDatabase();
   //------- Referencias -----------

 var nomeLivro = document.getElementById("nomeLivro");
 var nomeLivroP = document.getElementById("nomeLivroP");
 var insBtn = document.getElementById("Insbtn");
 var slctBtn = document.getElementById("Slctbtn");
 var filtroFc = document.getElementById("filtroFc");

 // ---------- insert function ---------------------------

function InserirDados(){
   set(ref(db, "livros/"+nomeLivro.value),{
       nomeLivro: nomeLivro.value
   })
   .then(()=>{
       alert("dados inseridos");
   })
   .catch((error)=>{
       alert("Erro: "+ error);
   });
 }
   // ---------- select function ---------------------------

   function SelecionarDados(){
       const dbref = ref(db);

       get(child(dbref,"livros/"+nomeLivro.value))
       .then((snapshot)=>{
           if(snapshot.exists()){
                nomeLivroP.value = snapshot.val().nomeLivro;
           }
           else{ 
               alert("Não há dados");
           }

       })
       .catch((error)=>{
           alert("Erro: "+ error);
       })
   }

   function SelecionarDadosFiltro(){
    window.location = "../index.php";
    const dbref = ref(db);

    get(child(dbref,"livros/"+nomeLivro.value))
    .then((snapshot)=>{
        if(snapshot.exists()){
         // FILTRO COM IF :
         if(snapshot.val().gênero == 'Romance'){
             nomeLivroP.value = snapshot.val().nomeLivro; 
          }
        }
        else{
            alert("Não há dados");
        }

    })
    .catch((error)=>{
        alert("Erro: "+ error);
    })
}

   //  GET ALL 
   var stdNo= 0;
   var cBooks = document.getElementById('container-books-Romance');

   function AddItemToTable(nomeLivro){
    let divE= document.createElement("div");
        divE.className = 'estil-books';
    let img = document.createElement("img");
        img.src = "img/livros/"+nomeLivro+".jpg";
    let a = document.createElement("a");
        a.innerText = 'Alugar';


    divE.appendChild(img);
    divE.appendChild(a);

    cBooks.appendChild(divE);

   } 

   function AddAllItemToTable(livro){
    stdNo = 0;
    cBooks.innerHTML="";
    livro.forEach(element => {
        AddItemToTable(element.nomeLivro);
    });
   }

 //-------- get all dados ---------
 function GetAllDataOnce(){
    const dbref = ref(db);

    get(child(dbref, "livros"))
    .then((snapshot)=>{
        var livros =[];

        snapshot.forEach(childSnapshot => {

            livros.push(childSnapshot.val());
        });
    
        GetAllDataRealTime();
    });
 }
//GET ALL TEMPO REAL
 function GetAllDataRealTime(){
    const dbref = ref(db, "livros");

    onValue(dbref,(snapshot)=>{
        var livros =[];
        snapshot.forEach(childSnapshot => {

            livros.push(childSnapshot.val());
        });

        AddAllItemToTable(livros);
    }) 
 }
 
 window.onload = GetAllDataOnce;

 // EVENTOS
 //insBtn.addEventListener('click', InserirDados);
 //slctBtn.addEventListener('click', SelecionarDados);
// filtroFc.addEventListener('click', SelecionarDadosFiltro);
