var board,
  game = new Chess();

let positionCount;
// let minimaxRoot = (depth, game, isMaximisingPlayer) => {
//   let newGameMoves = game.ugly_moves();
//   let bestMove = -9999;
//   let bestMoveFound;

//   newGameMoves.forEach((newGameMove) => {
//     game.ugly_move(newGameMove);
//     let value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
//     if (value >= bestMove) {
//       bestMove = value;
//       bestMoveFound = newGameMove;
//     }
//   });
//   return bestMoveFound;
// };

let minimaxRoot = (depth, game, isMaximisingPlayer) => {
  let newGameMoves = game.ugly_moves();
  let bestMove = -9999;
  let bestMoveFound;

  for (let i = 0; i < newGameMoves.length; i++) {
    let newGameMove = newGameMoves[i];
    game.ugly_move(newGameMove);
    let value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
    game.undo();
    if (value >= bestMove) {
      bestMove = value;
      bestMoveFound = newGameMove;
    }
  }
  return bestMoveFound;
};

let minimax = (depth, game, alpha, beta, isMaximisingPlayer) => {
  positionCount++;
  if (depth === 0) {
    return -evaluateBoard(game.board());
  }

  let newGameMoves = game.ugly_moves();

  if (isMaximisingPlayer) {
    let bestMove = -9999;
    for (let i = 0; i < newGameMoves.length; i++) {
      game.ugly_move(newGameMoves[i]);
      bestMove = Math.max(
        bestMove,
        minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer)
      );
      game.undo();
      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  } else {
    let bestMove = 9999;
    for (let i = 0; i < newGameMoves.length; i++) {
      game.ugly_move(newGameMoves[i]);
      bestMove = Math.min(
        bestMove,
        minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer)
      );
      game.undo();
      beta = Math.min(beta, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  }
};

const evaluateBoard = (board) => {
  let totalEvaluation = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      totalEvaluation += getPieceValue(board[i][j], i, j);
    }
  }
  return totalEvaluation;
};

const reverseArray = (array) => {
  return array.slice().reverse();
};

let pawnEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
  [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
  [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
  [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
  [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
  [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
];

let knightEval = [
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
  [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
  [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
  [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
  [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
  [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
  [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
];

let bishopEvalWhite = [
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
  [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
  [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
  [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
  [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
];

let rookEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
];

let evalQueen = [
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
];

let kingEvalWhite = [
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
  [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
  [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
  [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
];

let pawnEvalBlack = reverseArray(pawnEvalWhite);
let bishopEvalBlack = reverseArray(bishopEvalWhite);
let rookEvalBlack = reverseArray(rookEvalWhite);
let kingEvalBlack = reverseArray(kingEvalWhite);

let getPieceValue = (piece, x, y) => {
  if (piece === null) return 0;
  let getAbsoluteValue = (piece, isWhite, x, y) => {
    if (piece.type === 'p')
      return 10 + (isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x]);
    else if (piece.type === 'r')
      return 50 + (isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x]);
    else if (piece.type === 'n') return 30 + knightEval[y][x];
    else if (piece.type === 'b')
      return 30 + (isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x]);
    else if (piece.type === 'q') return 90 + evalQueen[y][x];
    else if (piece.type === 'k') {
      return 900 + (isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x]);
    }
    throw 'Unknown piece type: ' + piece.type;
  };
  let absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x, y);
  return piece.color === 'w' ? absoluteValue : -absoluteValue;
};

const onDragStart = (source, piece, position, orientation) => {
  if (
    game.in_checkmate() === true ||
    game.in_draw() === true ||
    piece.search(/^b/) !== -1
  ) {
    return false;
  }
};

const makeBestMove = () => {
  let bestMove = getBestMove(game);
  game.ugly_move(bestMove);
  board.position(game.fen());
  renderMoveHistory(game.history());
  if (game.game_over()) {
    alert('Game over');
  }
};

const getBestMove = (game) => {
  if (game.game_over()) alert('Game over');
  positionCount = 0;
  let depth = parseInt($('#search-depth').find(':selected').text());

  let d = new Date().getTime();
  let bestMove = minimaxRoot(depth, game, true);
  let d2 = new Date().getTime();
  let moveTime = d2 - d;
  let positionPerS = (positionCount * 1000) / moveTime;

  $('#position-count').text(positionCount);
  $('#time').text(moveTime / 1000 + 's');
  $('#positions-per-s').text(positionPerS);

  return bestMove;
};

const renderMoveHistory = (moves) => {
  let historyElement = $('#move-history').empty();
  historyElement.empty();
  for (let i = 0; i < moves.length; i += 2) {
    historyElement.append(
      `<tr class='moves'>
        <td>• &nbsp; ${moves[i]}</td>
        <td> ${moves[i + 1] ? moves[i + 1] : ' '}</td>
      </tr>`
    );
  }
  historyElement.scrollTop(historyElement[0].scrollHeight);
};

const onDrop = (source, target) => {
  let move = game.move({
    from: source,
    to: target,
    promotion: 'q',
  });

  removeGreySquares();
  if (move === null) return 'snapback';

  renderMoveHistory(game.history());
  window.setTimeout(makeBestMove, 250);
};

const removeGreySquares = () => {
  $('#board .square-55d63').css('background', '');
};

const onMouseoutSquare = () => {
  removeGreySquares();
};

let greySquare = function (square) {
  let squareEl = $('#board .square-' + square);
  squareEl.css('cursor', 'grab');
  let background = '#a9a9a9';
  if (squareEl.hasClass('black-3c85d') === true) {
    background = '#696969';
  }

  squareEl.css('background', background);
};

const onMouseoverSquare = (square, piece) => {
  let moves = game.moves({
    square: square,
    verbose: true,
  });
  if (moves.length === 0) return;

  greySquare(square);

  for (let i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
};

const onSnapEnd = () => {
  board.position(game.fen());
};

const opPosition = (gameFen, isBlacksMove) => {
  game.load(gameFen);
  board.position(game.fen());
  if (isBlacksMove) {
    window.setTimeout(makeBestMove, 250);
  }
  renderMoveHistory(game.history());
};

$('#ruyLopez').on('click', () => {
  const fen =
    'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1';
  opPosition(fen, true);
});

$('#italianGame').on('click', () => {
  const fen =
    'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1';
  opPosition(fen, true);
});

$('#sicillianDefense').on('click', () => {
  const fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1';
  opPosition(fen, false);
});

let defaultPosition =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
$('#startPosition').on('click', () => {
  opPosition(defaultPosition, false);
});

$('#reset').on('click', () => {
  if (confirm('Are you sure you want to restart?')) {
    opPosition(defaultPosition, false);
  }
});

$('#showHint').on('click', () => {
  let bestMove = getBestMove(game);
  console.log(bestMove);
});

const undo = () => {
  game.undo();
  board.position(game.fen());
};

$('#previous').on('click', () => {
  for (let i = 0; i < 2; i++) {
    undo();
  }
});

let config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd,
};
board = Chessboard('board', config);
