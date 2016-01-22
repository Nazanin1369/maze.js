var stage,
    maze = [],
    mazeWidth = 80,
    mazeHeight = 100,
    tileSize = 10,
    mazeGraphics,
    i, j;

function init() {
    console.log('initing')
    stage = new createjs.Stage("mazeCanvas");
    new buildMaze(stage).create();
};

var buildMaze = function(stage) {
    console.log('stage', stage)
};

buildMaze.prototype = {
    create: function() {
        console.log('create')
        var moves = [];
        mazeGraphics = new createjs.Graphics();
        console.log('mazeGraphics', mazeGraphics)
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
          //setInterval(handler, 25);
          handler();
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
                        var move = Math.random(0, possibleDirections.length - 1);
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
                }
                else{
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
    console.log(posX, posY);
     var rectangle = new createjs.Shape();
     for(i = 0; i < mazeHeight; i ++){
          for(j = 0; j < mazeWidth; j ++){
               if(maze[i][j] == 1){
                    rectangle.graphics.beginFill("DeepSkyBlue").drawRect(posY * tileSize, posX * tileSize, tileSize, tileSize)
               }
          }
     }

    rectangle.graphics.beginFill("DeepSkyBlue").drawRect(posY * tileSize, posX * tileSize, tileSize, tileSize);
    stage.addChild(rectangle);
    stage.update();
}