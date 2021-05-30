const antiCacheURL = 'https://www.nuttygroup.org/playerRatings.json?' + Math.random();
function runHumanRatings(API) {
  $.getJSON(API, function processPlayers(data) {
    processPlayers();

    function processPlayers() {
      model.armies().forEach(function eachArmy(index) {
        index.slots().forEach(function eachSlot(index) {
          if (index.isPlayer() && !index.ai()) {
            checkIdAndSet(index.playerId(), index.playerName());
          }
        }
        );
      });
      function checkIdAndSet(playerID, playerName) {
        for (var idx = 0; idx < Object.keys(data).length; idx++) {
          if (Object.keys(data)[idx] == playerID) {
            var taggedElements = document.getElementsByTagName("div");
            //finding element with player's name and amending it
            for (var jdx = 0; jdx < taggedElements.length; jdx++) {
              if (taggedElements[jdx].textContent == playerName) {
                taggedElements[jdx].innerHTML = playerName 
                + " "
                + Object.keys(data).map(function(key) {return data[key];})[idx].Names[0] 
                + " " 
                + Object.keys(data).map(function(key) {return data[key];})[idx].Rating[1]
                + " " 
                + Object.keys(data).map(function(key) {return data[key];})[idx].Rating[0];
                break;
              }
            }
          }
        }
      }
    }
  }
  );
}
setInterval(function () { runHumanRatings(antiCacheURL); }, 4000);
function listNamesAndIDs() {
  model.armies().forEach(function eachArmy(index) {
    index.slots().forEach(function eachSlot(index) {
      console.log(index.playerName() + " " + index.playerId());
    }
    );
  });
}