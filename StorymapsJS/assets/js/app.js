"use strict";

// Carrega os dados em formato json
const storymap_data = './assets/data/pamagicBoard.json';

// Carrega as opções do storymap em formato json
const storymap_options = {
    "language": "en",
    "map_type": "osm:standard",
    "calculate_zoom": false
};

// Cria o objeto storymap
const storymap = new VCO.StoryMap('storyMap', storymap_data, storymap_options);

// Determina se o usuário está acessando de um telefone ou pc
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';

// Função para adicionat texto alternativos às imagens
function addAltTextToImage() {
    const currentSlide   = storymap.current_slide;
    const slideImage     = document.getElementsByClassName('vco-media-image')[currentSlide];
    const headlineText   = document.getElementsByClassName('vco-headline')[currentSlide].textContent;
    
    slideImage.alt = headlineText;
}

// Atualiza Display toda vez que a janel for recarregada.
window.onresize = function(event) { storymap.updateDisplay(); }


// ao mudar de slides adiciona o atributo alt
storymap.on("change", addAltTextToImage);

// evento disparado quando o storymap é carregado
storymap.on("loaded", function() {
    const leafletMap = storymap.map;
    const zoomControl = L.control.zoom({position:'topleft'}).addTo(leafletMap);
    var userDevice = detectDeviceType();
    if (userDevice === 'Desktop') {
        addAltTextToImage();
    }
});
