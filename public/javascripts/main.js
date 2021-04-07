// Array di supporto per la generazione dei marker su mappa
var localiCoord = [];
var localiNames = [];

// Elaborazione dei dati
function elabora() {
    var xhr = new XMLHttpRequest(); 

    // Acquisizione dei campi che verranno utilizzati per la ricerca
    var lista = document.getElementById("category");
    var category = lista.options[lista.selectedIndex].value;
    var city = document.getElementById("city").value.toLowerCase();
    if (category == '' || city == '') return;

    xhr.onreadystatechange = function() {  
        if(xhr.readyState === 4 && xhr.status === 200) {
            var resp = JSON.parse(xhr.response);
            document.getElementById("resultsTitle").innerHTML = ('<div class="section-title"><h2><span>Risultati </span> della ricerca<a href="#map" class="scroll-to-map scrollto"><i class="icofont-simple-down"></i></a></h2></div>');
            let icon = chooseIcon(category);
            let restaurants = '';
            let found = false;
            clearData();
            for (let i = 0; i < resp.length; i++) {
                if (category == resp[i].tipologia && city == resp[i].comune.toLowerCase()) {
                    // Markers setup
                    let localeCoord = {lat: parseFloat(resp[i].lat), lng: parseFloat(resp[i].lon)};
                    localiCoord.push(localeCoord);
                    localiNames.push(resp[i].nome);
                        
                    // Costruzione della risposta
                    restaurants += `<div class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><p class="mb-1">` + sanitizeHTML(resp[i].indirizzo) + '</p><small>' + sanitizeHTML(resp[i].telefono) + '</small></div><h4 class="mb-1">' + icon + sanitizeHTML(resp[i].nome) + '</h4></div></div>';
                    document.getElementById('results').innerHTML = restaurants;
                    found = true;
                }
            }
            if (found == false) {  // In caso non è stato trovato nulla
                document.getElementById("results").innerHTML = "Nessun risultato trovato.";
            } else {
                centerMapOnCity(city + ", Italia");  // zoom sulla città
                drop(); // deploy dei markers
            }
        }
    }

    xhr.open('GET', 'data/ristorantiebotteghe.json', true);
    xhr.send();
}

// Funzione per sanetizzare i campi del file json
var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};

// Scelta dell'icona in base alla categoria cercata
function chooseIcon(category) { 
    let icon;
    switch (category) {
        case 'RISTORANTE':
            icon = '<i class="fas fa-utensils"></i>';
            break;
        case 'BOTTEGA':
            icon = '<i class="fas fa-dungeon"></i>';
            break;
        default:
            break;
    }
    return icon;
}

// Clear degli array di supporto e dei markers
function clearData() {  
    localiCoord = [];
    localiNames = [];
    clearMarkers();
}

// Setup dell'autocompletamento, prende i dati da cities.json
// https://bootstrap-autocomplete.readthedocs.io/en/latest/
$(function() {  
    $('.basicAutoComplete').autoComplete({
        resolverSettings: {
            url: 'data/cities.json'
        }
    });
});

// Funzione per l'animazione di fade in dei risultati
$(document).ready(function () { // The $(document).ready() method allows us to execute a function when the document is fully loaded.
    $('#results').hide();
    $('#resultsTitle').hide();
    $('#press').click(function () {
        $('#results').fadeIn('slow');
        $('#resultsTitle').fadeIn('slow');
    })
});

// Per evitare che l'utente possa inserire numeri o altro nel campo della città
function validateCity() {
    var element = document.getElementById('city');
    element.value = element.value.replace(/[^a-zA-Z ]+/, '');
};

// Form validation
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

/*
// In /clicks viene memorizzato un array in formato json, contenente le informazioni riguardo i click.
setInterval(function() {    // Ogni 5 secondi farà richiesta al server, richiedendo il numero di click e mostrandoli nella sezione apposita
    fetch('/clicks', {
        method: 'GET'
    })
    .then(function(response) {    
        if(response.ok) {
            return response.json();
        } else {throw new Error('Request failed.');}
    })
    .then(function(data) {    // I dati vengono usati per prelevare il numero di click e mostrarli nel footer
        document.getElementById('counter').innerHTML = `Fin'ora sono state effettuate <span style="color:#ffb03b">${data.length}</span> ricerche!`;
    })
    .catch(function(error) {
        console.log(error);
    });
}, 5000);
*/

/* Sample format data generated
<div class="list-group-item list-group-item-action flex-column align-items-start">
  <div class="d-flex w-100 justify-content-between">
    <p class="mb-1">Indirizzo</p>
    <small><a href="#map" class="btn-book animated fadeInUp scrollto" onclick="codeAddress('Toscana, Via Montalbano, 7', map);return false;">Visualizza sulla mappa</a></small>
  </div>
  <h4 class="mb-1">icona e nome locale</h4>
</div>
*/

// Icone aggiuntive
        /*case 'pizzeria':
            icon = '<i class="fas fa-pizza-slice"></i>';
            break;
        case 'trattoria':
            icon = '<i class="fas fa-dungeon"></i>';
            break;
        case 'paninoteche_pubs':
            icon = '<i class="fas fa-hamburger"></i>';
            break;
        case 'Enoteche_e_wine-bar':
            icon = '<i class="fas fa-wine-bottle"></i>';
            break;
*/