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
  var corpoU = document.getElementById('alunos-vencimento-list');

  
function UsuTable(nomeDoUsu){

    let hr = document.createElement("hr");
    let nL = document.createElement("p");
        nL.innerText = nomeDoUsu;

    corpoU.appendChild(hr);              // Linha           //
    corpoU.appendChild(nL);             // Nome Livro      //
  }
  

  function AddTableUsu(usuario){
    corpoU.innerHTML="";
    usuario.forEach(element => {
        UsuTable(element.usuNome);
 
    });
   }
//-------- get all dados ---------
function GetAllDataOnce(){
       GetAllDataRealTime();
}
//GET ALL TEMPO REAL
function GetAllDataRealTime(){
   const dbrefU = ref(db, "usuário");
   onValue(dbrefU,(snapshot)=>{
    var usuario =[];
    snapshot.forEach(childSnapshot => {

        usuario.push(childSnapshot.val());
    });

    AddTableUsu(usuario);
}) 
}

window.onload = GetAllDataOnce;


