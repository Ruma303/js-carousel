const slider = document.getElementById("slider");
const sliderViewer = document.getElementById("slider-viewer");
const thumbs = document.getElementById("thumbs");
const controls = document.getElementById("controls");
const btnUp = document.getElementById("btn-up");
const btnDown = document.getElementById("btn-down");
const btnPause = document.getElementById("btn-pause");

let activeIndex = 0;
let scrollDirection = "down";
let autoChangeImages;
let isPaused = false; //* Aggiunto flag per il bottone Pausa

//array delle immagini
const images = [
	{
        image: 'wallpaper1.webp',
        title: 'Catena montuosa',
        location: 'Madonna di Campiglio, Autonomous Province of Trento, Italy'
    },
    {
        image: 'wallpaper2.webp',
        title: 'Spiaggia rocciosa',
        location: 'Ribeira da Janela, Portugal'
    },
    {
        image: 'wallpaper3.webp',
        title: 'Sopra le nuvole',
        location: 'Mill Valley, CA, USA'
    },
    {
        image: 'wallpaper4.webp',
        title: 'Zebre che pascolano',
        location: 'Etosha National Park, Namibia'
    }
];

//% Creazione immagini slider (parte sinistra)

for (let i = 0; i < images.length; i++) {

    // Creazione immagini
    const img = document.createElement('img'); // Creazione tag <img>
    img.src = `img/${images[i].image}`; // Aggiornamento src con nome titolo dinamico in base all'array
    img.alt = images[i].title; // Aggiornamento attributo alt
    img.classList.add('featured-img'); // Aggiunta classe all'immagine
    if (i === 0) img.classList.add('active'); // Aggiunta classe .active per mostrare solo questa immagine
    sliderViewer.append(img); // Aggancio immagine al container delle immagini

    // Creazione del container per il titolo e la location
    const captionContainer = document.createElement('div'); // Creazione div
    captionContainer.classList.add('caption-container'); // Aggiunta classe
    sliderViewer.append(captionContainer); // Aggancio div al componente slider

    // Titolo
    const imgTitle = document.createElement("h3"); // Creazione titolo
    imgTitle.innerHTML = `${images[i].title}`; // Aggiornamento contenuto titolo
    imgTitle.classList.add("img-title"); // Aggiunta classe al titolo
    if (i === 0) imgTitle.classList.add('active'); // Aggiunta classe .active per mostrare solo un elemento
    captionContainer.append(imgTitle); // Aggancio al div .caption-container

    // Location
    const imgLocation = document.createElement("p"); // Creazione paragrafo
    imgLocation.innerHTML = `${images[i].location}`; // Aggiornamento contenuto paragrafo
    imgLocation.classList.add("img-location"); // Aggiunta classe al paragrafo
    if (i === 0) imgLocation.classList.add('active'); // Aggiunta classe .active per mostrare solo un elemento
    captionContainer.append(imgLocation); // Aggancio al div .caption-container

    //* Creazione immagini thumbs (parte destra)
    // Creazione immagini thumb
    const thumbImg = document.createElement('img');
    thumbImg.src = `img/${images[i].image}`;
    thumbImg.classList.add("thumb-img");
    if (i === 0) thumbImg.classList.add('thumb-active');
    thumbs.append(thumbImg);

    //% Bonus 2: Al click del bottone, cambia immagine
    thumbImg.addEventListener('click', () => {
        // Recupera l'indice dell'immagine cliccata
        const index = images.findIndex(img => img.image === images[i].image); // Recupera l'indice dell'elemento selezionato nell'array
        console.log(index);
        activeIndex = index;

        // Imposta l'immagine corrispondente come attiva
        listImg.forEach((img, idx) => {
            if (idx === activeIndex) {
                img.classList.add('active');
                listImgTitles[idx].classList.add('active');
                listImgLocation[idx].classList.add('active');
                listThumbs[idx].classList.add('thumb-active');
            } else {
                img.classList.remove('active');
                listImgTitles[idx].classList.remove('active');
                listImgLocation[idx].classList.remove('active');
                listThumbs[idx].classList.remove('thumb-active');
            }
        });

        // Aggiorna lo sfondo
        document.body.style.backgroundImage = `url('img/${images[activeIndex].image}')`;
    });
}


document.body.style.backgroundImage = `url('img/${images[activeIndex].image}')`; //* Immagine di background iniziale


//% Logica dei bottoni

const listImg = document.querySelectorAll('.featured-img');
const listImgTitles = document.querySelectorAll('.img-title');
const listImgLocation = document.querySelectorAll('.img-location');
const listThumbs = document.querySelectorAll('.thumb-img');


//$ Funzione cambio immagine
function changeImages() {
    listImg[activeIndex].classList.remove('active');
    listImgTitles[activeIndex].classList.remove('active');
    listImgLocation[activeIndex].classList.remove('active');
    listThumbs[activeIndex].classList.remove('thumb-active');

    if (scrollDirection === "up") {
        activeIndex--;
        if (activeIndex < 0) {
            activeIndex = images.length - 1;
        }
    } else {
        activeIndex++;
        if (activeIndex >= images.length) {
            activeIndex = 0;
        }
    }

    listImg[activeIndex].classList.add('active');
    listImgTitles[activeIndex].classList.add('active');
    listImgLocation[activeIndex].classList.add('active');
    listThumbs[activeIndex].classList.add('thumb-active');

    document.body.style.backgroundImage = `url('img/${images[activeIndex].image}')`;
}

autoChangeImages = setInterval(changeImages, 3000); //* Inizio scorrimento appena la pagina carica

//$ Bottone su
btnUp.addEventListener('click', function() {
    clearInterval(autoChangeImages);
    scrollDirection = "up";
    changeImages();
    autoChangeImages = setInterval(changeImages, 3000);
});

//$ Bottone giù
btnDown.addEventListener('click', function() {
    clearInterval(autoChangeImages);
    scrollDirection = "down";
    changeImages();
    autoChangeImages = setInterval(changeImages, 3000);
});


//% Bonus bottone Pausa / Avvia
btnPause.addEventListener('click', function() {
    if (isPaused) {
        // Se in pausa, avvia l'animazione e cambia il testo del pulsante
        autoChangeImages = setInterval(changeImages, 3000);
        btnPause.textContent = 'Pausa';
        isPaused = false;
    } else {
        // Se in esecuzione, metti in pausa l'animazione e cambia il testo del pulsante
        clearInterval(autoChangeImages);
        btnPause.textContent = 'Avvia';
        isPaused = true;
    }
});