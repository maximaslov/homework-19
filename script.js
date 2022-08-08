'use strict'

import AlbumApi from './AlbumApi.js';

const LIST_API = 'https://jsonplaceholder.typicode.com/albums/';
const ALBUMS_API = 'https://jsonplaceholder.typicode.com/photos?albumId=';
const ALBUM_ITEM_CLASS = 'albums__album-item';

const album = document.querySelector('.albums__list');
const images = document.querySelector('.albums__images');

showAlbum(1);
album.addEventListener('click', onAlbumItemClick);

AlbumApi.request(LIST_API, '')
    .then(listItem => listItem.map(e => {
        const element = e;
        generateAlbumList(element);
        addItemsToHtml(element, album, generateAlbumList)
    }))
    .catch(error => alert(error.message));

function onAlbumItemClick(e) {
    const elem = e.target;
    const id = elem.dataset.id;
    if (elem.classList.contains(ALBUM_ITEM_CLASS)) {
        showAlbum(id);
    }
}

function showAlbum(id) {
    return AlbumApi.request(ALBUMS_API, id)
        .then(albumItem => albumItem.map(e => {
            const element = e;
            generateAlbum(element);
            addItemsToHtml(element, images, generateAlbum)
        }))
}

function generateAlbumList(element) {
    const id = element.id;
    const title = element.title;
    return `
    <li><a href="#" data-id="${id}" class="albums__album-item">${title}</a></li>
    `
}

function generateAlbum(element) {
    const url = element.url;
    return `
        <p class="album__img">${url}</p>
    `
}

function addItemsToHtml(element, place, fn) {
    place.insertAdjacentHTML('afterbegin' , fn(element))
}
