var geocodeService = L.esri.Geocoding.geocodeService();
var theMarker = L.marker();
var popup = L.popup();
var isMarker = false;
var currentPositionCoords;
var currentLong;
var currentLat;
var mymap;
var coords = new Array();

$(document).ready(function () {
    initGeolocation();
    setTimeout(function(){
        initMap();
    },4000)
});


function initGeolocation()
{
    
    if( navigator.geolocation )
    {
    // Call getCurrentPosition with success and failure callbacks
    navigator.geolocation.getCurrentPosition(
        function(position){
            //    console.log("hello");
            //    console.log(position);
            coords[0] = position.coords.longitude;
            coords[1] = position.coords.latitude;
        }, 
        function(err){
            coords[0] = 144.9631;
            coords[1] = -37.8136;
        } 
    );
    }
    else
    {
        console.log("Sorry, your browser does not support geolocation services.use fixed geocode to display map");
        coords[0] = 144.9631;
        coords[1] = -37.8136;
    }
}

//  setTimeout(function(){
// 	//var currentCoords = initGeolocation();
// 	console.log(coords[0] + " " +  coords[1]);
//  },3000)


function initMap()
{
    var latLng = L.latLng({lat: coords[1], lng: coords[0]});
    // var latLng = L.latLng({lat: -37.8136, lng: 144.9631});
    console.log(latLng);
    mymap = L.map('mapid', {
        minZoom: 1,
        maxZoom: 18,
        zoom: 12,
        center: latLng
    });
    // var tiles = L.esri.basemapLayer("Streets").addTo(map);
        var tileLayer = L.tileLayer('http://geo.infinitee.software:8080/styles/{style}/{z}/{x}/{y}.png', {
        style:'klokantech-basic',
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://openmaptiles.com/production-package/">OpenMapTiles</a> contributors, '
    });
    tileLayer.addTo(mymap);

    // console.log(mymap.getCenter());
    // console.log(mymap.getCenter().toBounds(20000));

    // create the geocoding control and add it to the map

    var searchControl = L.esri.Geocoding.geosearch({useMapBounds:false,searchBounds:mymap.getCenter().toBounds(100000)}).addTo(mymap);

    var search3 = BootstrapGeocoder.search({
        inputTag: 'address2',
        placeholder: 'Address',
        useMapBounds:false,
        searchBounds:mymap.getCenter().toBounds(100000)
    }).addTo(mymap);

    // create an empty layer group to store the results and add it to the map
    var results = L.layerGroup().addTo(mymap);
    // listen for the results event and add every result to the map
    searchControl.on("results", function(data) {
        results.clearLayers();
        //console.log(data);
        for (var i = data.results.length - 1; i >= 0; i--) {
            // console.log(data.results);
            // results.addLayer(L.marker(data.results[i].latlng));
            //console.log(i);
            // console.log(data.results[i].latlng);
            // console.log(data.results[i].text);
            // console.log("Country: " + data.results[i].properties.Country);
            // console.log("City: " +  data.results[i].properties.City);
            // console.log("Region: " + data.results[i].properties.Region);
            // console.log("Postcode: " + data.results[i].properties.Postal);
            // console.log("Address: " + data.results[i].properties.StAddr);
            $("#address").val(data.results[i].properties.StAddr);
            $("#city").val(data.results[i].properties.City);
            $("#state").val(data.results[i].properties.Region);
            $("#postcode").val(data.results[i].properties.Postal);
            $("#country").val(data.results[i].properties.Country);
            var marker = L.marker(data.results[i].latlng);
            results.addLayer(marker);
            marker.bindPopup(data.results[i].text).openPopup();
        }
    });


    search3.on('results', function(data){
        for (var i = data.results.length - 1; i >= 0; i--) {
        console.log(data.results);
        // results.addLayer(L.marker(data.results[i].latlng));
        //console.log(i);
        // console.log(data.results[i].latlng);
        // console.log(data.results[i].text);
        // console.log("Country: " + data.results[i].properties.Country);
        // console.log("City: " +  data.results[i].properties.City);
        // console.log("Region: " + data.results[i].properties.Region);
        // console.log("Postcode: " + data.results[i].properties.Postal);
        // console.log("Address: " + data.results[i].properties.StAddr);
        $("#address2").val(data.results[i].properties.StAddr);
        $("#city2").val(data.results[i].properties.Nbrhd);
        $("#state2").val(data.results[i].properties.Region);
        $("#postcode2").val(data.results[i].properties.Postal);
        $("#country2").val(data.results[i].properties.Country);
        // var marker = L.marker(data.results[i].latlng);
        // results.addLayer(marker);
        // marker.bindPopup(data.results[i].text).openPopup();
    }
    });

    mymap.on('click', function(e){
        geocodeService.reverse().latlng(e.latlng).run(function(error, result){
            //console.log(result.address);
            theMarker['options']['draggable'] = true;
            // console.log(theMarker['options']);
            theMarker.remove();
            theMarker.setLatLng(result.latlng);
            theMarker.addTo(mymap);
            theMarker.bindPopup(result.address.LongLabel).openPopup();
        });
    });
}

function placeMarker()
{
    //1. create a feature group first
    if(!isMarker)
    {
        
        theMarker.addTo(mymap);
        theMarker.bindPopup("<b>Hello world!</b><br>I am a popup.");
        isMarker = true;
    }
    else
    {
        console.log("remove the marker");
        console.log(theMarker.remove());
        theMarker.remove();
        isMarker = false;
    }
    
}
