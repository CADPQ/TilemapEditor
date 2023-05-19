class Tilemap {
  constructor(spriteSheet, map, tileSize, cameraX, cameraY, cameraWidth, cameraHeight) {
    this.spriteSheet = spriteSheet;
    this.map = map;
    this.tileSize = tileSize;
    this.cameraX = cameraX;
    this.cameraY = cameraY;
    this.cameraWidth = cameraWidth;
    this.cameraHeight = cameraHeight;
  }
  drawToCanvas(canvas) {
    var ctx = canvas.getContext("2d");
    var tileSize = this.tileSize;
    var map = this.map;
    for (var i = 0; i < map.length; i++) {
      for (var j = 0; j < map[i].length; j++) {
        var x = map[i][j] * tileSize;
        var y = 0;

        var inCamera = j * tileSize + tileSize > this.cameraX && j * tileSize < this.cameraX + this.cameraWidth && i * tileSize + tileSize > this.cameraY && i * tileSize < this.cameraY + this.cameraHeight;

        if (inCamera) {
          var xSize = tileSize;
          var ySize = tileSize;
          var drawX = j * tileSize - this.cameraX;
          var drawY = i * tileSize - this.cameraY;

          var cutX = j * tileSize < this.cameraX || j * tileSize + tileSize > this.cameraX + this.cameraWidth;
          if (cutX) {
            if (j * tileSize < this.cameraX) {
              var cutoffSize = this.cameraX - j * tileSize;
              xSize -= cutoffSize;
              x += cutoffSize;
              drawX += cutoffSize;
            }
            if (j * tileSize + tileSize > this.cameraX + this.cameraWidth) {
              var cutoffSize = j * tileSize + tileSize - (this.cameraX + this.cameraWidth);
              xSize -= cutoffSize;
            }
          }

          var cutY = i * tileSize < this.cameraY || i * tileSize + tileSize > this.cameraY + this.cameraHeight;
          if (cutY) {
            if (i * tileSize < this.cameraY) {
              var cutoffSize = this.cameraY - i * tileSize;
              ySize -= cutoffSize;
              y += cutoffSize;
              drawY += cutoffSize;
            }
            if (i * tileSize + tileSize > (this.cameraY + this.cameraHeight)) {
              var cutoffSize = i * tileSize + tileSize - (this.cameraY + this.cameraHeight);
              ySize -= cutoffSize;
            }
          }

          ctx.drawImage(this.spriteSheet, x, y, xSize, ySize, drawX, drawY, xSize, ySize); 
        }
      }
    }
  }
}
