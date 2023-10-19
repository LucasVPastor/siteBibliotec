import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyC95RHcPl1VhNT484rnwWDaE_E8cC_q4ZQ",
    authDomain: "tccsb-39f62.firebaseapp.com",
    projectId: "tccsb-39f62",
    storageBucket: "tccsb-39f62.appspot.com",
    messagingSenderId: "446535834077",
    appId: "1:446535834077:web:b43e6da142918afae53e34",
    measurementId: "G-QFJFTQ66ZC"
};

// Inicia Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
import {getDatabase, ref, set, get, child, onValue, update, remove, limitToLast, orderByKey, limitToFirst } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
const db = getDatabase();

var uplaund = document.getElementById("uplaund");

// Method to upload a valid excel file
function upload() {
    var files = document.getElementById('file_upload').files;
    if(files.length==0){
        alert("Não Existe nenhum arquivo");
        return;
    }
    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == '.XLS' || extension == '.XLSX') {
        excelFileToJSON(files[0]);
    }else{
    alert("Formato de arquivo não é válido. Confira a extensão");
}
}
       
      //Method to read excel file and convert it into JSON 
function excelFileToJSON(file){
    try {
    var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function(e) {

            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type : 'binary'
        });
        var result = {};
        workbook.SheetNames.forEach(function(sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if (roa.length > 0) {
            result[sheetName] = roa;
            const jsonData = result;
            console.log(jsonData);
            update(ref(db), jsonData)
            .then(()=>{
                alert("Deu certo");
            })
            .catch((error)=>{
                alert("ERRO:"+error);
            }); 
        }
        });

        }
    }catch(e){
        console.error(e);
    }
}

uplaund.addEventListener('click', upload);