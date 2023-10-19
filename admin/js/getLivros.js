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
  var corpo = document.getElementById('livros-alocados-list');

function AddItemToTable(nomeLivro, gênero, dp){

    let hr = document.createElement("hr");
    let nL = document.createElement("p");
        nL.innerText = nomeLivro;


    corpo.appendChild(hr);              // Linha           //
    corpo.appendChild(nL);             // Nome Livro      //
  }

  function AddAllItemToTable(livro){
   corpo.innerHTML="";
   livro.forEach(element => {
       AddItemToTable(element.nomeLivro, element.gênero, element.numExemplar);

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


