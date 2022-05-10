var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var activeMap;
var btn = 0;
var colors = {
    WHITE:   "#FFFFFF",
    BLACK:   "#000000",
    RED:     "#FF0000",
    GREEN:   "#00FF00",
    BLUE:    "#0000FF",
    YELLOW:  "#FFFF00",
    CYAN:    "#00FFFF",
    MAGENTA: "#FF00FF"
  };

class Map {
  constructor(w, h, bg) {
    this.width = w
    this.height = h
    this.map = []
    for (var i=0;i<h;i++) {
        this.map.push([new Array(w)])
    }
   this.bg = bg
  }
  place (tile) {
      this.map[tile.x][tile.y] = tile
  }
}

class Tile {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.sprite = 
    "777111" +
    "777111" + 
    "777111" + 
    "111777" + 
    "111777" + 
    "111777";
  }
  update (map, btn, x, y) {
    return map
  }
  render (x, y) {
    var wmult = 512/activeMap.width;
    var hmult = 512/activeMap.height;
    for(var i = 0; i < 6; i++) {
 
        for(var j = 0; j < 6; j++) {
            ctx.fillStyle = colors[Object.keys(colors)[this.sprite[i + (6 * j)]]]
            ctx.fillRect(x * wmult  + (wmult/6 * i),y * hmult + (hmult/6 * j), wmult / 6, hmult / 6);
            
            
        }
    }
    }
}

// Start Game Code

class Player extends Tile {
  constructor(x, y) {
    super(x, y)

    this.sprite = 
    "334433" +
    "330033" + 
    "366663" + 
    "032230" + 
    "322223" + 
    "323323";
  }
  update (map, btn, x, y) {
    map.place(new Player(1, 1))
    console.log(btn)
    return map
  }
  
}

function GameStart() {
    map = new Map(9, 9, "GREEN")
    map.place(new Tile(6, 1))
    map.place(new Player(5, 1))

    activeMap = map;

}

function GameUpdate() {
  
}

// End Game Code

window.onkeydown = function(e) {
  btn = e.keycode
}
window.onkeyup = function(e) {
  btn = 0
}

function display() {
    GameUpdate()
    var wmult = 512/activeMap.width;
    var hmult = 512/activeMap.height;
    for(var i = 0; i < activeMap.height; i++) {

        for(var j = 0; j < activeMap.width; j++) {
            try {
                activeMap.map = activeMap.map[i][j].update(activeMap, btn, i, j).map
                activeMap.map[i][j].render(i, j)
            } catch {
                ctx.fillStyle = colors[activeMap.bg.toUpperCase()]
                ctx.fillRect(i * wmult,j * hmult, wmult, hmult);
            }
            
        }
    }
    display

}

GameStart()
setInterval(display(), 1000); 