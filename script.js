var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var activeMap;
var btn = 0;
var tick = 0;
var colors = {
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  RED: "#FF0000",
  GREEN: "#00FF00",
  BLUE: "#0000FF",
  YELLOW: "#FFFF00",
  CYAN: "#00FFFF",
  MAGENTA: "#FF00FF"
};

class Map {
  constructor(w, h, bg) {
    this.width = w
    this.height = h
    this.map = []
    for (var i = 0; i < h; i++) {
      this.map.push([])
      for (var j = 0; j < w; j++) {
        this.map[i].push(0)
      }
    }
    this.bg = bg

  }
  place(tile) {
    this.map[tile.x][tile.y] = tile
  }
  kill(tile) {
    this.map[tile.x][tile.y] = 0
  }
  get(x, y) {
    return this.map[x][y]
  }
}

class Tile {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.updated = true

    this.sprite =
      "777111" +
      "777111" +
      "775511" +
      "115577" +
      "111777" +
      "111777";
  }
  update(map, btn, x, y) {
    this.updated = true;
    return map
  }
  render(x, y) {
    var wmult = 512 / activeMap.width;
    var hmult = 512 / activeMap.height;
    for (var i = 0; i < 6; i++) {

      for (var j = 0; j < 6; j++) {
        ctx.fillStyle = colors[Object.keys(colors)[this.sprite[i + (6 * j)]]]
        ctx.fillRect(x * wmult + (wmult / 6 * i), y * hmult + (hmult / 6 * j), wmult / 6, hmult / 6);


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
  update(map, btn, x, y) {
    var xmov = 0;
    var ymov = 0;
    {
    if (btn == "w") {
        ymov = -1
      } else if (btn == "a") {
        xmov = -1
      } else if (btn == "s") {
        ymov = 1
      } else if (btn == "d") {
        xmov = 1
      } else if (btn == "1") {
        map.place(new Sand(x, y + 1))
      } else if (btn == "2") {
        map.place(new Tile(x, y + 1))
      }
    }

    if (((Math.abs(xmov) + Math.abs(ymov)) !== 0)) {
        if (map.get(x + xmov, y + ymov) === 0) {
          map.place(new Player(x + xmov, y + ymov))
          map.kill(this)

      }


    }
    

    this.updated = true;
    return map
  }

}

class Sand extends Tile {
  constructor(x, y) {
    super(x, y)
    this.updated = true

    this.sprite =
      "555555" +
      "555555" +
      "555555" +
      "555555" +
      "555555" +
      "555555";
  }
  update(map, btn, x, y) {

    if (map.get(x, y + 1) === 0) {

      map.place(new Sand(x, y + 1))
      map.kill(this)
    }
    
    this.updated = true;
    return map
  }

}

function GameStart() {
  map = new Map(9, 9, "GREEN")
  map.place(new Tile(5, 7))
  map.place(new Player(3, 6))
  map.place(new Sand(5, 1))

  activeMap = map;

}

function GameUpdate() {

}

// End Game Code

function display() {
  if (btn == "r") {
    map = new Map(9, 9, "GREEN")
  }
  GameUpdate()
  var wmult = 512 / activeMap.width;
  var hmult = 512 / activeMap.height;

  tick += 1;

  for (var i = 0; i < activeMap.height; i++) {
    for (var j = 0; j < activeMap.width; j++) {

      try {
        if (activeMap.map[i][j] !== 0 && activeMap.map[i][j].updated == false) {
          activeMap.map = activeMap.map[i][j].update(activeMap, btn, i, j).map;
       }
      } catch {
        0;
      }





    }
  }

  for (var i = 0; i < activeMap.height; i++) {
    for (var j = 0; j < activeMap.width; j++) {

      try {
        activeMap.map[i][j].render(i, j)
        activeMap.map[i][j].updated = false;
      } catch {
        ctx.fillStyle = colors[activeMap.bg.toUpperCase()]
        ctx.fillRect(i * wmult, j * hmult, wmult, hmult);
      }

    }
  }

  btn = 0;


}

window.onkeydown = function (e) {
  btn = e.key
}

GameStart()
setInterval(display, 100);