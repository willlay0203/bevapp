//Map
//Creating the map onto page
let map,infowindow,pos;
function initMap() {
    //Creates the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -37.8136, lng: 144.9631},
        zoom: 10
    });
    //Asks for user location 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
            map.setZoom(12);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    }         
}

function findGongCha() {
    let request = {
        location: pos,
        radius: '10000',
        query: 'Gong Cha'
    }

    let gongChaFind = new google.maps.places.PlacesService(map);

    gongChaFind.textSearch(request, (results,status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                createGCMarker(results[i]);
            }
        }
    });

    function createGCMarker(place) {
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: "markers/gongcha.png"
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }
}


