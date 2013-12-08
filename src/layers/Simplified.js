var Simplified = {

  MAX_HEIGHT: 8,

  render: function() {
    this.context.clearRect(0, 0, width, height);

    // show on high zoom levels only and avoid rendering during zoom
    if (zoom < minZoom || isZooming) {
      return;
    }

    var i, il, j, jl,
      item,
      f,
      x, y,
      footprint,
      isVisible,
      dataItems = Data.items;

    this.context.beginPath();

    for (i = 0, il = dataItems.length; i < il; i++) {
      item = dataItems[i];
      if (item.height+item.roofHeight > this.MAX_HEIGHT) {
        continue;
      }

      isVisible = false;
      f = item.footprint;
      footprint = [];
      for (j = 0, jl = f.length-1; j < jl; j += 2) {
        footprint[j]   = x = f[j]  -originX;
        footprint[j+1] = y = f[j+1]-originY;

        // checking footprint is sufficient for visibility
        if (!isVisible) {
          isVisible = (x > 0 && x < width && y > 0 && y < height);
        }
      }

      if (!isVisible) {
        continue;
      }

      this.context.moveTo(footprint[0], footprint[1]);
      for (j = 2, jl = footprint.length-3; j < jl; j += 2) {
        this.context.lineTo(footprint[j], footprint[j+1]);
      }

      this.context.closePath();
    }

    this.context.fillStyle   = roofColorAlpha;
    this.context.strokeStyle = altColorAlpha;

    this.context.stroke();
    this.context.fill();
  }
};
