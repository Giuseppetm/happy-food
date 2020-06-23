var map;
var markers = [];

// Inizializzazione mappa, inizialmente centrata sulla Toscana
function initMap() { 
    let toscana = {lat: 43.416667, lng: 11};  // Coordinate toscana
    // Mappa centrata sulla toscana
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7, 
        center: toscana
    });
}

// Data una città passata per parametro, centra la mappa su quella città, con supporto del geocoder
function centerMapOnCity(city) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': city}, function(results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      map.setZoom(12);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// Drop dei markers con animazione
function drop() {
  clearMarkers();
  for (let i = 0; i < localiCoord.length; i++) {
    addMarkerWithTimeout(localiCoord[i], i * 120, localiNames[i]);
  }
}

function addMarkerWithTimeout(position, timeout, name) {
  window.setTimeout(function() {
    var infowindow = new google.maps.InfoWindow({
      content: name
    });
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      type: 'normalMarker',
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
      },
      animation: google.maps.Animation.DROP
    });
    
    marker.addListener('mouseover', function() {
      infowindow.open(map, marker);
    });
    marker.addListener('mouseout', function() {
      infowindow.close();
    });
    markers.push(marker);
  }, timeout);
}

function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    if (markers[i].type == 'actualPosition') {
      var temp = markers[i];
      continue;
    }
    markers[i].setMap(null);
  }
  markers = [];
  markers.push(temp);
}

// Geolocation per mostrare la posizione corrente dell'utente
success = function(position){
  let pos = {lat: position.coords.latitude, lng: position.coords.longitude};
  infowindow = new google.maps.InfoWindow({
    content: '<span class="pos">Posizione attuale</span>'
  });
  let markerPosAttuale = new google.maps.Marker({
    position: pos,
    map: map,
    type: 'actualPosition',
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    },
    animation: google.maps.Animation.DROP
  });

  markerPosAttuale.addListener('mouseover', function() {
    infowindow.open(map, markerPosAttuale);
  });
  markerPosAttuale.addListener('mouseout', function() {
    infowindow.close();
  });
  markers.push(markerPosAttuale);
}

error = function(error) {
  console.warn( "Errore " + error.code + ": " + error.message);
}

var options = {
  enableHighAccuracy: true,
  timeout: 5000
}

navigator.geolocation.getCurrentPosition(success, error, options);