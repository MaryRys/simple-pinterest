const loadPinsForBoard = (boardId) => {
    return new Promise((resolve, reject) => {
        $.get('../db/pins.json')
          .done((data) => {
              const pinsForBoards = data.pins.filter(pin => pin.board_id == boardId)
              resolve(pinsForBoards);
          })
          .fail((error) => {
              reject(error);
          })
    })
}

// New promise has all data for boards and pins together
// .map elem iteratively goes through the boards similar to for each

const loadPinsOnBoards = (boards) => {
    return new Promise((resolve, reject) => {
        $.get('../db/pins.json')
        .done((data) => {
            const boardsWithPins = boards.map(board => {
                const matchingPins = data.pins.filter(pin => pin.board_id === board.id);
                board.pins = matchingPins;
                // return out board as an array of objects with the manipulated boards
                return board;
            })
            resolve(boardsWithPins);
        })
        .fail((error) => {
            reject('error loadPinsOnBoards', error);
        })
    })
} 

export {loadPinsForBoard, loadPinsOnBoards};