import {loadPinsForBoard} from '../data/pinsData.js';

const shortenLink = (full_url) => {
    // url builder is a javascript property
    const hostname = new URL(full_url).hostname;
    return hostname;
}

const writePins = (pins) => {
    let domString = '';
    pins.forEach(pin => {
        domString += `
        <div id='${pin.id}' class="pcard pin-card align-self-start p-2">
            <img class="card-img-top" src="${pin.image_url}">
            <a href='${pin.link}' target='_blank' class='p-2'>
                <button type="button" class="btn btn-light">${shortenLink(pin.link)}</button>
            </a>
        </div>
        `
    })
    // writes domString to the html element div "pins-on-board"
    $('#pins-on-board').html(domString);
}

const initialPinsView = (boardId) => {
    loadPinsForBoard(boardId)
    // gets 'data' info
    .then(data => {
        writePins(data);
    })
    .catch(error => {
        console.error('things messed up in pins', error);
    });
    
}

export {initialPinsView};