var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var activeMap;
var colors = {
    WHITE: "#FFFFFF",
    BLACK: "#000000",
    RED:   "#FF0000",
    BLUE: "#0000FF",
    GREEN: "#00FF00"
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
  constructor(x, y, c) {
    this.x = x
    this.y = y
    this.col = c
    this.sprite = "001100001100112211112211001100001100";
  }
  update (map, mv, act) {
    return map
  }
  render (self, x, y) {
    var wmult = 512/activeMap.width;
    var hmult = 512/activeMap.height;
    for(var i = 0; i < 6; i++) {

        for(var j = 0; j < 6; j++) {
            console.log(this.col)
            ctx.fillStyle = colors[Object.keys(colors)[this.sprite[i + (6 * j)]]]
            ctx.fillRect(x * wmult  + (wmult/6 * i),y * hmult + (hmult/6 * j), wmult / 6, hmult / 6);
            
            
        }
    }
    }
}

function Start() {
    map = new Map(9, 9, "GREEN")
    map.place(new Tile(3, 1, "BLUE"))
    activeMap = map;

}

function update() {

}

function display() {
    update()
    var wmult = 512/activeMap.width;
    var hmult = 512/activeMap.height;
    for(var i = 0; i < activeMap.height; i++) {

        for(var j = 0; j < activeMap.width; j++) {
            try {
                activeMap.map[i][j].render(activeMap.map[i][j], i, j)
            } catch {
                ctx.fillStyle = colors[activeMap.bg.toUpperCase()]
                ctx.fillRect(i * wmult,j * hmult, wmult, hmult);
            }
            
        }
    }
    

}

Start()
setInterval(display(), 1000); 