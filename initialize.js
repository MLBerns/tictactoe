$('body').ready(function() {
  var gameBoard = new GameBoard();
  var gameBoardView = new GameBoardView({model: gameBoard})
});