//Map
//Creating the map onto page
let map,infowindow,pos;
let melbourne = { lat: -37.8136, lng: 144.9631 }
function initMap() {
    //Creates the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: melbourne,
        zoom: 12
    }); 
}

let iconPic = {
    gongcha: "markers/gongcha.png",
    chatime: "markers/chatime.png"
}

let gcmarkerList = [];
function findGongCha() {
    if (document.getElementById("gongchaswitch").checked == true) {
        let request = {
            location: melbourne,
            radius: '10000',
            query: 'Gong Cha'
        }
        let gongChaFind = new google.maps.places.PlacesService(map);

        gongChaFind.textSearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createGCMarker(results[i]);
                }
            }
        });

        function createGCMarker(place) {
            let gcmarker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon: iconPic.gongcha
            });
            gcmarkerList.push(gcmarker);
            google.maps.event.addListener(gcmarker, 'click', function () {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }
    } else {
        for(let i = 0; i < gcmarkerList.length; i++) {
            gcmarkerList[i].setMap(null);
        }
        gcmarkerList = [];
    }
    
}

let ctmarkerList = [];
function findChaTime() {
    if (document.getElementById("chatimeswitch").checked == true) {
        let request = {
            location: melbourne,
            radius: '10000',
            query: 'Chatime'
        }
        let chaTimeFind = new google.maps.places.PlacesService(map);

        chaTimeFind.textSearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createCTMarker(results[i]);
                }
            }
        });

        function createCTMarker(place) {
            let ctmarker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon: iconPic.chatime
            });
            ctmarkerList.push(ctmarker);
            google.maps.event.addListener(ctmarker, 'click', function () {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }
    } else {
        for (let i = 0; i < ctmarkerList.length; i++) {
            ctmarkerList[i].setMap(null);
        }
        ctmarkerList = [];
    }

}