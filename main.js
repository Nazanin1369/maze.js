var stage,
    maze = [],
    mazeWidth = 100,
    mazeHeight = 100,
    tileSize = 10,
    mazeGraphics,
    i, j;


function init() {
    stage = new createjs.Stage("mazeCanvas");
    console.log(stage)
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
    new buildMaze(stage).create();
};

var buildMaze = function(stage) {
    console.log('stage', stage)
};

buildMaze.prototype = {
    create: function() {
        var moves = [];
        mazeGraphics = new createjs.Graphics();
        for(var i = 0; i < mazeHeight; i ++){
               maze[i] = [];
               for(var j = 0; j < mazeWidth; j ++){
                    maze[i][j] = 1;
               }
        }
        var posX = 1;
        var posY = 1;
        maze[posX][posY] = 0;
        moves.push(posY + posY * mazeWidth);
        window.setInterval(handler, 100);
        function handler() {
            if(moves.length){
                var possibleDirections = "";
                if(posX+2 > 0 && posX + 2 < mazeHeight - 1 && maze[posX + 2][posY] == 1){
                        possibleDirections += "S";
                }
                if(posX-2 > 0 && posX - 2 < mazeHeight - 1 && maze[posX - 2][posY] == 1){
                        possibleDirections += "N";
                }
                if(posY-2 > 0 && posY - 2 < mazeWidth - 1 && maze[posX][posY - 2] == 1){
                        possibleDirections += "W";
                }
                if(posY+2 > 0 && posY + 2 < mazeWidth - 1 && maze[posX][posY + 2] == 1){
                        possibleDirections += "E";
                }
                if(possibleDirections){
                    var move = Math.floor(Math.random() * (possibleDirections.length));
                    switch (possibleDirections[move]){
                        case "N":
                            maze[posX - 2][posY] = 0;
                            maze[posX - 1][posY] = 0;
                            posX -= 2;
                            break;
                        case "S":
                            maze[posX + 2][posY] = 0;
                            maze[posX + 1][posY] = 0;
                            posX += 2;
                            break;
                        case "W":
                            maze[posX][posY - 2] = 0;
                            maze[posX][posY - 1] = 0;
                            posY -= 2;
                            break;
                        case "E":
                            maze[posX][posY + 2]=0;
                            maze[posX][posY + 1]=0;
                            posY += 2;
                            break;
                    }
                    moves.push(posY + posX * mazeWidth);
                } else {
                    var back = moves.pop();
                    posX = Math.floor(back / mazeWidth);
                    posY = back % mazeWidth;
                }
                drawMaze(posX, posY);
            }
          }
    }
}

function drawMaze(posX, posY){
     mazeGraphics.clear();
     var rec = new createjs.Shape();
     for(i = 0; i < mazeHeight; i++){
          for(j = 0; j < mazeWidth; j++){
               if(maze[i][j] == 1){
                   rec.graphics.beginFill("#3B4752").drawRect(j * tileSize , i * tileSize, tileSize, tileSize);
               }
          }
     }
    rec.graphics.beginFill("#10CFBD").drawRect(posY * tileSize, posX * tileSize, 2 * tileSize, 2 * tileSize);
    stage.addChild(rec);
    stage.update();
}