const imageUrl = 'images/map.jpg';
const imageWidth = 20933;
const imageHeight = 15700;
const distanceFromCenter = 1000;

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: -1,
  zoomControl: true,
  attributionControl: false
});



let imageBounds = [[0, 0], [imageHeight, imageWidth]];
let imageLayer = L.imageOverlay(imageUrl, imageBounds).addTo(map);

const adjustMapView = () => {
  let aspectRatioViewport = window.innerWidth / window.innerHeight;
  let aspectRatioImage = imageWidth / imageHeight;

  /*if (true) {
    let newHeight = imageWidth / aspectRatioViewport;
    imageBounds = [[(imageHeight - newHeight) / 2, 0], [(imageHeight + newHeight) / 2, imageWidth]];
  } else {
    let newWidth = imageHeight * aspectRatioViewport;
    imageBounds = [[0, (imageWidth - newWidth) / 2], [imageHeight, (imageWidth + newWidth) / 2]];
  }*/

  imageLayer.setBounds(imageBounds);
  map.fitBounds(imageBounds);
  map.setMaxBounds(imageBounds);
}

const locMarker = () => {
  var marker = L.marker([imageHeight / 2, imageHeight / 2], {
    draggable: true,
  }).addTo(map);
  marker.bindPopup('LatLng Marker').openPopup();
  marker.on('dragend', function (e) {
    marker.getPopup().setContent(marker.getLatLng().toString()).openOn(map);
  });
}

var img = new Image();
img.onload = function () { hideLoadingScreen(); }
img.src = imageUrl;

const hideLoadingScreen = () => {
  document.getElementById('loading').style.display = 'none';
};

map.once('load', hideLoadingScreen);

adjustMapView();
// window.addEventListener('resize', adjustMapView);

const iconUrl = 'https://unpkg.com/leaflet/dist/images/marker-icon.png';

const modal = document.getElementById('myModal');
const modalText = document.getElementById('modal-text');
const span = document.getElementsByClassName('close')[0];

if (modalText.innerText === '') {
  modal.style.display = 'none'
}

const openModal = (text) => {
  modal.style.display = 'flex';
  modalText.innerHTML = text.join('');
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

// locMarker();

const centerX = imageHeight / 2;
const centerY = imageWidth / 2;

const markers = [
  { coords: [8600, 10980], context: ['<h1>EthPadThai</h1>', '<p></p>', , '<a href="">Website</a>'] },
  { coords: [8628, 11060], context: ['<h1>ZKP Labs</h1>', '<p></p>', , '<a href="">Website</a>'] },
  { coords: [8600, 11180], context: ['<h1>Antalpha Labs</h1>', '<p></p>', , '<a href="">Website</a>'] },
  { coords: [8600, 11280], context: ['<h1>Ethereum Colombia</h1>', '<p></p>', , '<a href="">Website</a>'] },
  { coords: [8500, 11380], context: ['<h1>Ethereum Costa Rica</h1>', '<p></p>', , '<a href="">Website</a>'] },

  { coords: [8132, 11420], context: ['<h1>zkBankai</h1>', '<p></p>', , '<a href="">Website</a>'] },
  { coords: [8168, 11348], context: ['<h1>Dapp Learning</h1>', '<p></p>', , '<a href="">Website</a>'] },
  { coords: [8108, 11324], context: ['<h1>OpenBuild</h1>', '<p></p>', , '<a href="">Website</a>'] },
  { coords: [8280, 11416], context: ['<h1>EthPanda</h1>', '<p></p>', , '<a href="">Website</a>'] },
  { coords: [8380, 11416], context: ['<h1>EthKL</h1>', '<p></p>', , '<a href="">Website</a>'] },

  {
    coords: [8124, 10968], color: 'red', context: ['<h1>Invisible Garden</h1>', '<h2>Ethereum and ZKP dev city #0</h2> \
<p>THAILAND</p> \
<p>30 SEP - 10 NOV, 2024</p>', '<a href="https://invisible.garden">Website</a>']
  },
  {
    coords: [9432, 10216], color: 'red', context: ['<h1>ShanhaiWoo 山海坞</h1>', '<h2>A Dynamic Month-Long Popup Village</h2> \
<p>An ideal place constructed by each member with their most romantic desire for what the community ought to be.</p>',
      , '<a href="https://www.shanhaiwoo.com/">Website</a>']
  },
  {
    coords: [3264, 8336], color: 'red', context: ['<h1>Funding the commons</h1>', '<p>Join us in Thailand</p> \
<p>November 6-9, 2024</p> \
<p>From November 6th-9th at DistrictX, Funding the Commons and Earth Commons is hosting a dynamic series of events aimed at shaping the future of public goods. By offering a variety of formats—from interactive workshops to immersive experiences —we create the ideal environment for experimentation, collaboration, and innovation, enabling new ideas and solutions to emerge.</p>',
      '<a href="https://www.fundingthecommons.io/">Website</a>']
  },
  {
    coords: [8111, 11775], color: 'red', context: ['<h1>MegaZu</h1>', '<p>A pop-up village for 🔥50 god-tier Ethereum dapps builders 🔥 in Chiang Mai, Thailand, from October 7 to November 7, co-created by @eigenlayer and @megaeth_labs</p>',
      '<a href="https://www.megazu.fun/">Website</a>'
    ]
  },
  {
    coords: [6980, 14214], color: 'red', context: ['<h1>Edge City Lanna</h1>',
      '<h2>A popup village to incubate a flourishing future.</h2>',
      '<p>Join us October 10th - November 10th in beautiful Chiang Mai to live in a healthy community focused on incubating novel technologies and ways of living.</p>',
      '<a href="https://www.edgecity.live/lanna">Website</a>'
    ]
  },
];

markers.forEach(marker => {
  const size = marker.color == 'red' ? 40 : 32;
  const anchor = marker.color == 'red' ? 20 : 15;

  const icon = L.divIcon({
    className: 'custom-div-icon',
    html: `
        <div class="marker-pulse"></div>
        <div class="marker-inner" style="background-color: ${marker.color || 'blue'};"></div>
    `,
    iconSize: [size, size],
    iconAnchor: [anchor, anchor]
  });

  L.marker(marker.coords, { icon: icon })
    .addTo(map)
    .on('click', () => openModal(marker.context));
});
