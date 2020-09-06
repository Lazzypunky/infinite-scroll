// Using Html Id for Fair Use in below code

const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');
// const imageBox = document.getElementById('image-box');


// Unsplash API

const count = 30;
const apiKey = 'hoYVfO_SaZzxZaw3ZQZOCNeBYFwESGwQRJYMz3pMpC4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`




let photoArray = [];





// Show Loading Spinner
function showLoadingSpinner() {
    loader.hidden = false;
    imageContainer.hidden = true;
}

// Remove Loading Spinner
function removeLoadingSpinner() {
    if (!loader.hidden) {
        imageContainer.hidden = false;
        loader.hidden = true;
    }
}



// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// create Elements for links and photos , And add to DOM
function displayPhotos() {
    // Run function for each object in photoArray
    photoArray.forEach((photo) => {
        // create <a> to link to unsplash
        const div = document.createElement('div');
        div.setAttribute('class', 'image-box');

        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Put image <img> in <a>, then put both inside imageContainer Element
        div.appendChild(item);
        item.appendChild(img);
        imageContainer.appendChild(div);
    });
}

// Get Photos from unsplash API
async function getPhotos() {
    showLoadingSpinner();
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
        removeLoadingSpinner();
    } catch (error) {
        console.log(error)
    }

}
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 600) {
      getPhotos();
    }
  });


// on load

getPhotos();