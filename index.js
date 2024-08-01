const accessKey = 'VB3nwmXkdeGMb1Id1sQ9hSjIy4Ulzhr0pYI9FZoQuAc';

async function fetchPhotos(keyword) {
    const url = `https://api.unsplash.com/search/photos?query=${keyword}&client_id=${accessKey}&per_page=9`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

function appendImageElem(photo) {
    const imgElem = document.createElement('img');
    imgElem.src = photo.urls.small;
    imgElem.alt = photo.alt_description || 'Unsplash Photo';
  
    imgElem.style.width = '300px';
    imgElem.style.height = '225px';
    imgElem.style.objectFit = 'cover';

    const galleryElem = document.querySelector('.gallery');
    galleryElem.appendChild(imgElem);
}
  
function removePhotos() {
    const galleryElem = document.querySelector('.gallery');
    galleryElem.innerHTML = '';
}
  
async function searchPhotos(event) {
    const keyword = event.target.value;
  
    if (event.key === 'Enter' && keyword) {
        removePhotos();
  
        const photos = await fetchPhotos(keyword);
        photos.forEach(photo => appendImageElem(photo));
    }
}
  
function run() {
    const inputElem = document.querySelector('input');
    inputElem.addEventListener('keydown', searchPhotos);
}
  
run();