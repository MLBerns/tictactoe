var GameBoard = Backbone.Model.extend({
  initialize: function(){
    this.set({gameSquares: new GameSquares()})
    this.set({players: new Players()})
  },

  checkGameStatus: function(){
    alert("Change made to box " + this.get('position') + ". Row: " + this.get('row') + ", Col: " + this.get('col') + ", Coord: " + this.get('XYcoord'));
  }
});

var GameSquare = Backbone.Model.extend({
  defaults: {
    filled: false,
  },

  mark: function(){
    return "X"
  }
});

var GameSquares = Backbone.Collection.extend({
  initialize: function(){
    square_counter = 0
    while (square_counter < 9) {
      gameSquare = new GameSquare;
      gameSquare.set({
        position: square_counter,
        row: this.getRow(square_counter),
        col: this.getCol(square_counter),
        XYcoord: this.getXYCoord(square_counter)
      });
      this.add(gameSquare);
      square_counter++;
    }
  },

  getRow: function(square_counter){
    return Math.floor(square_counter/3)
  },

  getCol: function(square_counter){
    return Math.floor(square_counter%3)
  },

  getXYCoord: function(square_counter){
    return [ Math.floor(square_counter/3), Math.floor(square_counter%3) ]
  },
});

var GameSquareView = Backbone.View.extend({
  className: "game_square",

  events: {
    "click": "clicked"
  },

  clicked: function(e){
    console.log(this.$el.html("<span>" + this.model.mark() + "</span>"));
    console.log(this.model.get('filled'));
    this.model.set({filled: true});
  }
})

var GameBoardView = Backbone.View.extend({
  id: "gameboard",

  initialize: function(){
    this.render();
  },

  render: function(){
    this.collection = this.model.get('gameSquares')
    $('body').append(this.el);
    this.collection.forEach(this.addSquare, this)
  },

  addSquare: function(gameSquare){
    if (gameSquare.get('position') % 3 == 0) {
      this.$el.append("<br/>")
    };
    //gameSquare.getRow;
    gameSquare.on('change', this.model.checkGameStatus)
    var gameSquareView = new GameSquareView({model: gameSquare})
    this.$el.append(gameSquareView.render().el)
  }
});

var Players = Backbone.Collection.extend({
  initialize: function(){
     this.player1 = new Player({
      player_name: "Player 1",
      active: true,
      player_mark: "X"
    });
    this.player2 = new Player({
      player_name: "Player 2",
      active: false,
      player_mark: "O"
    })
  }
});

var Player = Backbone.Model.extend({

});

var Move = Backbone.Model.extend({

});

var Moves = Backbone.Collection.extend({

});