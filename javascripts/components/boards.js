import {loadBoards} from '../data/boardsData.js';
import {loadPinsOnBoards} from '../data/pinsData.js';
import {initialPinsView} from './pins.js';


const bindEvents = () => {
    $('#user-boards').on('click', '.board-card', (e) => {
        // targets id of jquery object
        const clickecdBoardId = $(e.target).closest('.board-card').attr('id');
        // hides div board-page
        $('#boards-page').hide();
        // shows pins-page div
        $('#pins-page').show();
        initialPinsView(clickecdBoardId);
    });
}

const writeBoards = (boards) => {
    let domString = '';
    boards.forEach(board => {
        // boardImg logic is used so that boards with 0 pins still get a default image
        const boardImg = board.pins[0] ? board.pins[0].image_url : './db/default-img.jpeg';
        domString += `
        <div id='${board.id}' class="board-card p-2">
          <img class="card-img-top" src="${boardImg}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${board.name}</h5>
            <p class="card-text">${board.pins.length} Pins</p>
          </div>
      </div>
      `
    });
    $('#user-boards').html(domString);
}

const initializeBoardView = () => {
    loadBoards().then((boards) => {
        // writeBoards(boards); does not have all data anymore, replace with loadPinsOnBoards (see pinsData.js)
        // bindEvents();
        return loadPinsOnBoards(boards);
    }).then((boardsWithPins) => {
        writeBoards(boardsWithPins);
        bindEvents();
    }) .catch((error) => {
        console.error(error);
    })
};

export {initializeBoardView};