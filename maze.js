//choose an initial cell

//Can visit neighbor?
    //Pick a random neighbor
    //Put neighbor on the stack
    //Mark Path to the neighbor

//Mark "visited" and pop


var  Cell = function() {
    this.init = false;
    this.walls = 0x1111;
}

var Board  = function() {
    this.width = 100;
    this.height = 100;
    this.cells = [];
}

Cell.walls = {
    UP: 0x1000,
    DOWN: 0x0100,
    LEFT: 0x0010,
    RIGHT: 0x0001
};

Cell.dummy = new Cell();
Cell.dummy.init = true;

Board.prototype.init = function() {
    var size = this.width * this.height;
    for(var i = 0, len = size; i < len ; i++) {
        this.cells.push(new Cell());
    }
};

Board.prototype.getCell = function(x, y) {
    var i = y * this.width + x;
    return this.cells[i];
};

Board.prototype.setWall = function(x, y, wall) {
    var i = y * this.width + x;
    this.cells[i].walls = wall;
};

Board.prototype.clearWall = function(x, y, wall) {
    var i = y * this.width + x;
    this.cells[i].walls ^= wall;
};

Board.prototype.getNeighbors = function(x, y) {
    return {
        up: (y > 0 ? this.getCell(x, y - 1) : Cell.dummy),
        down: (y < this.height - 1 ? this.getCell(x, y + 1) : Cell.dummy),
        left: (x > 0 ? this.getCell(x - 1, y) : Cell.dummy),
        right: (x < this.width - 1 ? this.getCell(x + 1, y) : Cell.dummy)
    };
};

Board.prototype.generate = function() {
    var stack = [],
        self = this,
        keys = ['up', 'down', 'left', 'right'];

   var shuffle = function(arr) {
       for(var j, x, i = arr.length; i;
           j = Math.floor(Math.random() * i),
           x = arr[--i], arr[i] = arr[j], arr[j] = x);
       return arr;
   }

   var carveTo = function(x, y) {
       var cell = self.getCell(x, y);

       //No neighbors to visit? deadend or done
       if(cell.init) {
           stack.pop();
           var next = stack.pop();
           self.getCell(next.x, next.y).init = false;

           //Back at starting cell
           if(stack.length > 0) {
               carveTo(next.x, next.y);
           }

           //All done
           return true;
       }

       cell.init = true;
       stack.push({x: x, y: y});
   }
}