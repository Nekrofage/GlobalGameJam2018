var KillCounter = function(game){
  var _kills = 0;
  var killtitle = game.add.text(100, 50, 'Patients Infected:', { fontSize: '16px', fill: '#000' }).anchor.setTo(0.5,0);
  var countText = game.add.text(100, 64, _kills, { fontSize: '90px', fill: '#000' });


  this.reset = function() {
      countText.text = 0;
  }

  this.update = function(){
      _kills++;
      countText.text = _kills;
  }
}
