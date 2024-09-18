const imageUrl = 'Fantasy-map.jpg';
const imageWidth = 20933;
const imageHeight = 15700;
const distanceFromCenter = 1000;

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: 10,
  zoomControl: true,
  attributionControl: false
});

let imageBounds = [[0, 0], [imageHeight, imageWidth]];
let imageLayer = L.imageOverlay(imageUrl, imageBounds).addTo(map);

const adjustMapView = () => {
  let aspectRatioViewport = window.innerWidth / window.innerHeight;
  let aspectRatioImage = imageWidth / imageHeight;

  if (aspectRatioViewport > aspectRatioImage) {
    let newHeight = imageWidth / aspectRatioViewport;
    imageBounds = [[(imageHeight - newHeight) / 2, 0], [(imageHeight + newHeight) / 2, imageWidth]];
  } else {
    let newWidth = imageHeight * aspectRatioViewport;
    imageBounds = [[0, (imageWidth - newWidth) / 2], [imageHeight, (imageWidth + newWidth) / 2]];
  }

  imageLayer.setBounds(imageBounds);
  map.fitBounds(imageBounds);
  map.setMaxBounds(imageBounds);
}

const hideLoadingScreen = () => {
  document.getElementById('loading').style.display = 'none';
};

map.once('load', hideLoadingScreen); 

adjustMapView();
window.addEventListener('resize', adjustMapView);

const iconUrl = 'https://unpkg.com/leaflet/dist/images/marker-icon.png';

const modal = document.getElementById('myModal');
const modalText = document.getElementById('modal-text');
const span = document.getElementsByClassName('close')[0];

if (modalText.innerText === '') {
  modal.style.display = 'none'
}

const openModal = (text) => {
  modal.style.display = 'flex';
  modalText.innerHTML = text;
};

const closeModal = () => {
  modal.style.display = 'none';
};

span.onclick = closeModal;

window.onclick = (event) => {
  if (event.target === modal) {
    closeModal();
  }
};

const centerMarker = L.marker([imageHeight / 2, imageWidth / 2], {
  icon: L.icon({
    iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  })
}).addTo(map);

centerMarker.on('click', () => {
  openModal('Hello world on center');
});

const centerX = imageHeight / 2;
const centerY = imageWidth / 2;

const markers = [
  { coords: [centerX - distanceFromCenter, centerY - distanceFromCenter], context: '<b>Hello world!</b><br>I am a popup at Top-Left Marker.' },
  { coords: [centerX - distanceFromCenter, centerY + distanceFromCenter], context: '<b>Hello world!</b><br>I am a popup at Top-Right Marker.' },
  { coords: [centerX + distanceFromCenter, centerY - distanceFromCenter], context: '<b>Hello world!</b><br>I am a popup at Bottom-Left Marker.' },
  { coords: [centerX + distanceFromCenter, centerY + distanceFromCenter], context: '<b>Hello world!</b><br>I am a popup at Bottom-Right Marker.' },
];

markers.forEach(marker => {
  L.marker(marker.coords, {
    icon: L.icon({
      iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    })
  }).addTo(map).on('click', () => openModal(marker.context));
});
