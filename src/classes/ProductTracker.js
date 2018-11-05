const ProductTracker = function() {
  ProductTracker.prototype.track = function(pixels, width, height) {
    const gray = tracking.Image.grayscale(pixels, width, height, true);

    this.emit("track", {
      pixels: gray,
      width: width,
      height: height
    });
  };
};

tracking.inherits(ProductTracker, tracking.Tracker);

export default ProductTracker