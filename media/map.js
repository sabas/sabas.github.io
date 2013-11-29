/*crea la mappa e passa l'oggetto)*/
function initMap(lat, lon, zoom)
{
var layerurl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var	attr = 'Dati &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> sotto licenza ODBL';

var tile = new L.TileLayer(layerurl, {maxZoom: 18, attribution: attr});

var map = new L.Map('map');
map.setView(new L.LatLng(lat, lon), zoom);
map.addLayer(tile);
return map;
}


/* funzione per creare un marker facilmente, oggetto mappa, tipo, coordinate e testo*/
function putMarker(map, type, lat, lon, text)
{

	var GuyIcon = L.Icon.extend({
	options:{
iconUrl: 'img/hat.png',	
	    shadowUrl: 'img/hat_shadow.png',
	    iconSize: [20, 57],
	    shadowSize: [40, 57],
	    iconAnchor: [10, 57],
	    popupAnchor: [-7, -50]
}
	});

	var PostIcon = L.Icon.extend({
	options:
{
	    iconUrl: 'img/postit.png',
	    iconSize: [59, 50],
	    iconAnchor: [29, 50],
	    popupAnchor: [2, -47]
 }
	});


	var marker;
	var thisIcon;
	/*if (type=='guy') thisIcon = new GuyIcon();
	else if (type=='post') thisIcon = new PostIcon();
	else thisIcon = new Icon();

	marker = L.marker([lat, lon], {icon: thisIcon});*/
	marker = L.marker([lat, lon]);
	marker.bindPopup(text);
	map.addLayer(marker);
	return marker;
}

/*un semplice wrapper*/
function removeMarker(map, marker)
{
map.removeLayer(marker);
}

function setCenter(map,marker,zoom)
{
var latlng=marker.getLatLng();
map.setView(latlng, zoom);
}
