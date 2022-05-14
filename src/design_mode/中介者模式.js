function Player(name, teamColor) {
  this.name = name;
  this.teamColor = teamColor;
  this.state = 'alive';
}

Player.prototype.win = function () {
  console.log(this.name + 'won');
};

Player.prototype.lose = function () {
  console.log(this.name + 'lost');
};

Player.prototype.die = function () {
  this.state = 'dead';
  playerDirector.reciveMessage('playerDead', this);
};

Player.prototype.remove = function () {
  playerDirector.reciveMessage('removePlayer', this);
};

Player.prototype.changeTeam = function (color) {
  playerDirector.reciveMessage('changeTeam', this, color);
};

var playerFactory = function (name, teamColor) {
  var newPlayer = new Player(name, teamColor);
  playerDirector.reciveMessage('addPlayer', newPlayer);
  return newPlayer;
};

var playerDirector = (function () {
  var players = {},
    operations = {};
  operations.addPlayer = function (player) {
    var teamColor = player.teamColor;
    players[teamColor] = players[teamColor] || [];
    players[teamColor].push(player);
  };
  operations.removePlayer = function (player) {
    var teamColor = player.teamColor;
    teamPlayers = players[teamColor] || [];
    for (var i = teamPlayers.length - 1; i >= 0; i--) {
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1);
      }
    }
  };
  operations.changeTeam = function (player, newTeamColor) {
    operations.removePlayer(player);
    player.teamColor = newTeamColor;
    operations.addPlayer(player);
  };
  operations.playerDead = function (player) {
    var teamColor = player.teamColor,
      teamPlayers = players[teamColor];
    var all_dead = true;
    for (var i = 0, player; (player = teamPlayers[i++]); ) {
      if (player.state !== 'dead') {
        all_dead = false;
        break;
      }
    }
    if (all_dead) {
      for (var i = 0, player; (player = teamPlayers[i++]); ) {
        player.lose();
      }

      for (color in players) {
        if (color !== teamColor) {
          var teamPlayers = players[color];
          for (var i = 0, player; (player = teamPlayers[i++]); ) {
            player.win();
          }
        }
      }
    }
  };

  var reciveMessage = function () {
    var message = Array.prototype.shift.call(arguments);
    operations[message].apply(this, arguments);
  };

  return {
    reciveMessage: reciveMessage,
  };
})();

var player1 = playerFactory('皮蛋', 'red');
var player2 = playerFactory('小乖', 'red');
var player3 = playerFactory('宝宝', 'red');
var player4 = playerFactory('小强', 'red');

var player5 = playerFactory('黑妞', 'blue');
var player6 = playerFactory('葱头', 'blue');
var player7 = playerFactory('胖墩', 'blue');
var player8 = playerFactory('海盗', 'blue');

player1.die();
player2.die();
player3.die();
player4.die();
