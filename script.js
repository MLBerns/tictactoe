var GameBoard = Backbone.Model.extend({
  initialize: function(){
    this.set({gameSquares: new GameSquares()})
  }
});

var GameSquare = Backbone.Model.extend({
  defaults: {
    filled: false,
  }
});

var GameSquares = Backbone.Collection.extend({
  initialize: function(){
    counter = 0
    square_count = 9
    while (counter < square_count) {
      gameSquare = new GameSquare;
      gameSquare.set({position: counter});
      this.add(gameSquare);
      counter++;
    }
  },
});

var GameSquareView = Backbone.View.extend({
  className: "game_square",

  events: {
    "click": "clicked"
  },

  clicked: function(e){
    console.log(this.$el.html("<span>X</span>"))
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
    }
    var gameSquareView = new GameSquareView({model: gameSquare})
    this.$el.append(gameSquareView.render().el)

  }
});

var Player = Backbone.Model.extend({

});

var Move = Backbone.Model.extend({

});

var Moves = Backbone.Collection.extend({

});