import {loadBoards} from '../data/boardsData.js';


const bindEvents = () => {
    $('#user-boards').on('click', '.board-card', (e) => {
        // targets id of jquery object
        const clickecdBoardId = $(e.target).closest('.board-card').attr('id');
        // hides div board-page
        $('#boards-page').hide();
        // shows pins-page div
        $('#pins-page').show();
        console.log(clickecdBoardId);
    });
}

const writeBoards = (boards) => {
    let domString = '';
    boards.forEach(board => {
        domString += `
        <div id='${board.id}' class="board-card p-2">
          <img class="card-img-top" src="./db/default-img.jpeg" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${board.name}</h5>
            <p class="card-text">42 Pins</p>
          </div>
      </div>
      `
    });
    $('#user-boards').html(domString);
}

const initializeBoardView = () => {
    loadBoards().then((boards) => {
        writeBoards(boards);
        bindEvents();
    }).catch((error) => {
        console.error(error);
    })
};

export {initializeBoardView};