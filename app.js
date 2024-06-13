document.addEventListener("DOMContentLoaded", function() {
    // Configuração do Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyCDLNnvLODEFmW4rpZR75iG5f3resJNpQ4",
        authDomain: "app-lista-sm-6478b.firebaseapp.com",
        databaseURL: "https://app-lista-sm-6478b-default-rtdb.firebaseio.com/",
        projectId: "app-lista-sm-6478b",
        storageBucket: "app-lista-sm-6478b.appspot.com",
        messagingSenderId: "969418993762",
        appId: "1:969418993762:web:e2e257d1e388dd0ec9a13b"
    };

    // Inicializar Firebase
    firebase.initializeApp(firebaseConfig);

    // Função para carregar estados dos checkboxes do Firebase
    function carregarEstadosCheckboxes() {
        var database = firebase.database();
        database.ref('checkboxes').once('value').then(function(snapshot) {
            var estados = snapshot.val();
            if (estados) {
                Object.keys(estados).forEach(function(id) {
                    var checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = estados[id].marcado;
                    }
                });
            }
        }).catch(function(error) {
            console.error("Falha ao carregar estados dos checkboxes: " + error.message);
        });
    }

    // Capturar todos os checkboxes com a classe "inputs"
    let checkboxes = document.getElementsByClassName("inputs");

    // Iterar sobre a coleção de checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        // Adicionar um listener de evento de clique para cada checkbox
        checkboxes[i].addEventListener('change', function() {
            console.log(`${this.id} está ${this.checked ? 'marcado' : 'desmarcado'}`);
            gravarEstadoCheckbox(this.id, this.checked);
        });
    }

    // Carregar estados dos checkboxes ao carregar a página
    carregarEstadosCheckboxes();

    // Escutar mudanças no Firebase em tempo real
    var database = firebase.database();
    database.ref('checkboxes').on('value', function(snapshot) {
        var estados = snapshot.val();
        if (estados) {
            Object.keys(estados).forEach(function(id) {
                var checkbox = document.getElementById(id);
                if (checkbox) {
                    checkbox.checked = estados[id].marcado;
                }
            });
        }
    });
});

function gravarEstadoCheckbox(id, checked) {
    // Função para gravar o estado do checkbox no Firebase
    var database = firebase.database();
    database.ref('checkboxes/' + id).set({
        marcado: checked
    }).then(function() {
        console.log("Estado do checkbox salvo com sucesso!");
    }).catch(function(error) {
        console.error("Falha ao salvar estado do checkbox: " + error.message);
    });
}


document.getElementsByClassName("inputs").addEventListener('click', function() {

    if (this.checked) {
        document.querySelector('.label').classList.add('checked');
        
    } else {
        document.querySelector('.label').classList.remove('checked');
    }

});