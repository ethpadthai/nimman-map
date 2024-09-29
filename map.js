
// SET THIS TO TRUE TO SHOW DRAGABLE LOCATOR, SET IT BACK TO FALSE BEFORE COMMITING
const showLocator = false;

// EDIT THE MARKERS HERE
const markers = [
  { coords: [-32.392459, 14.592596], context: ['<h1>EthPadThai</h1>', '<img src="images/ethpadthai-logo.png">', '<p>The extra spicy Ethereum Community in Thailand 🇹🇭 Welcome to join us!</p>', , '<a href="https://ethpadthai.org/">Website</a>'] },
  { coords: [-23.095175, 13.174926], context: ['<h1>ZKP Labs</h1>', '<p>Securing the Future of Web3 with Zero-Knowledge Proof</p>', '<a href="https://zkplabs.network/">Website</a>'] },
  { coords: [-24.095175, 14.174926], context: ['<h1>Antalpha Labs</h1>', '<p></p>', '<a href="https://labs.antalpha.com/">Website</a>'] },
  { coords: [-25.095175, 15.174926], context: ['<h1>Ethereum Colombia</h1>', '<p>El Jardín Infinito en Colombia</p>', '<a href="https://www.ethcolombia.org/">Website</a>'] },
  { coords: [-26.095175, 16.174926], context: ['<h1>Ethereum Costa Rica</h1>', '<p>This community is an open space to all people to learn about Web3, Ethereum and blockchain technologies. Enthusiasts, builders, artists, social activists. A technology for human coordination.</p>', '<a href="https://ethereum.cr/">Website</a>'] },

  {
    coords: [-27.095175, 16.174926], context: ['<h1>zkBankai</h1>', '<p>We\'re zk devs, researchers and hobbyist! 💻✨</p>', '<a href="https://x.com/zk_bankai">Website</a>']
  },
  { coords: [-28.095175, 16.174926], context: ['<h1>Dapp Learning</h1>', '<p>DappLearning is for developers at all stages.</p>', '<a href="https://dapplearning.org/">Website</a>'] },
  {
    coords: [-32.095175, 16.174926], context: ['<h1>OpenBuild</h1>', '<img src="images/openbuild-logo.jpg">', '<p>Help ✦ Developers ✦ get on the Success Way to Web3</p>', '<a href="https://openbuild.xyz/">Website</a>']
  },
  { coords: [-31.095175, 16.174926], context: ['<h1>EthPanda</h1>', '<p>A group of Ethereum builders dedicated to facilitating Chinese-speaking network to deliver support for Ethereum. </p>', '<a href="https://forum.ethpanda.org/about">Website</a>'] },
  { coords: [-30.095175, 16.174926], context: ['<h1>EthKL</h1>', '<p>Kuala Lumpur\'s Ethereum Community</p>', '<a href="https://www.ethkl.org/">Website</a>'] },

  {
    coords: [-31.122326, 8.351184], color: 'red', context: ['<h1>Invisible Garden</h1>', '<p><a href="https://app.sola.day/event/detail/9455">Buy COWORKING passes here</a></p>', '<img src="images/ig-logo.png">', '<h2>Ethereum and ZKP dev city #0</h2> \
<p>THAILAND</p> \
<p>30 SEP - 10 NOV, 2024</p>', '<a href="https://invisible.garden">Website</a>']
  },
  {
    coords: [-21.203223, -7.823741], color: 'red', context: ['<h1>ShanhaiWoo 山海坞</h1>', '<h2>A Dynamic Month-Long Popup Village</h2> \
<p>An ideal place constructed by each member with their most romantic desire for what the community ought to be.</p>',
      , '<a href="https://www.shanhaiwoo.com/">Website</a>']
  },
  {
    coords: [-75.358286, -36.48149], color: 'red', context: ['<h1>Funding the commons</h1>', '<p>Join us in Thailand</p> \
<p>November 6-9, 2024</p> \
<p>From November 6th-9th at DistrictX, Funding the Commons and Earth Commons is hosting a dynamic series of events aimed at shaping the future of public goods. By offering a variety of formats—from interactive workshops to immersive experiences —we create the ideal environment for experimentation, collaboration, and innovation, enabling new ideas and solutions to emerge.</p>',
      '<a href="https://www.fundingthecommons.io/">Website</a>']
  },
  {
    coords: [-33.811607, 36.136741], color: 'red', context: ['<h1>MegaZu</h1>', '<p>A pop-up village for 🔥50 god-tier Ethereum dapps builders 🔥 in Chiang Mai, Thailand, from October 7 to November 7, co-created by @eigenlayer and @megaeth_labs</p>',
      '<a href="https://www.megazu.fun/">Website</a>'
    ]
  },
  {
    coords: [-42.044039, 70.332644], color: 'red', context: ['<h1>Edge City Lanna</h1>',
      '<h2>A popup village to incubate a flourishing future.</h2>',
      '<p>Join us October 10th - November 10th in beautiful Chiang Mai to live in a healthy community focused on incubating novel technologies and ways of living.</p>',
      '<a href="https://www.edgecity.live/lanna">Website</a>'
    ]
  },
];

var map = L.map('map');
L.tileLayer('images/tiles/{z}/{x}/{y}.png', {
  continuousWorld: false,
  noWrap: true,
  minZoom: 3,
  maxZoom: 5,
}).addTo(map);
map.setView([-29.49136, 10.812586], 4);

const locMarker = () => {
  var marker = L.marker([0, 0], {
    draggable: true,
  }).addTo(map);
  marker.bindPopup('LatLng Marker').openPopup();
  marker.on('dragend', function (e) {
    marker.getPopup().setContent(marker.getLatLng().toString()).openOn(map);
  });
}

if (showLocator) {
  locMarker();
}


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
