/// ---------- [CONNECT HTML TO JS] ---------- ///

const apiKey = '9f852b39c2b22db180ee7d10cb6f5991';
const method = 'flickr.photos.search';
const flickrHttps = 'https://api.flickr.com/services/rest?method=';
const formatJson = 'format=json&nojsoncallback=?';
const gallery = document.querySelector('#gallery');
const form = document.querySelector('form');
const input = document.querySelector('input');

/// ----------------------------------------- ///

let query = '';

/// ---------- CALL TO API ---------- ///

form.addEventListener('submit', e => {
    e.preventDefault();
    gallery.innerHTML = '';
    const searching = input.value;

    getData(searching);
});

/// ----- CREATE A CALL TO FLICKR API ----- ///

async function getData(query) {
    const data = await fetch(`${flickrHttps}${method}&api_key=${apiKey}&tags=${query}&${formatJson}`);
    const result = await data.json();
    console.log(result);
    showThumbnails(result);
};

/// ----- SHOW THUMBNAILS PICS ----- ///

const showThumbnails = content => {
    const arrayOfPics = content.photos.photo;
    arrayOfPics.forEach(photo => {
        const item = document.createElement('img');
        item.classList.add('item');
        item.src = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
        gallery.appendChild(item);
    });
};