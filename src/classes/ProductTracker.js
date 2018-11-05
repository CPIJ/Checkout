import yolo, { downloadModel } from "tfjs-yolo-tiny";
import smartcrop from "smartcrop";
import * as tf from "@tensorflow/tfjs";

const ProductTracker = function() {
  let model;

  ProductTracker.prototype.track = async function(pixels, width, height) {
    const image = await createImage(pixels, width, height);
    const webcamImage = tf.fromPixels(image);

    const croppedImage = cropImage(webcamImage);

    const batchedImage = croppedImage.expandDims(0);

    const tensor = batchedImage.toFloat().div(tf.scalar(255));
    const boxes = await yolo(tensor, model);
    console.log(boxes)
  };

  ProductTracker.prototype.init = async function() {
    model = await downloadModel();
  };
};

const createImage = async (pixels, width, height) => {
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = width;
  tmpCanvas.height = height;

  const context = tmpCanvas.getContext("2d");

  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < width * height * 4; i++) {
    data[i] = pixels[i];
  }

  context.putImageData(imageData, 0, 0);

  return tmpCanvas.getContext('2d').getImageData(0,0,width, height)
};

const resize = async (image, width, height) => {
  const context = image.getContext("2d");
  const { topCrop } = await smartcrop.crop(image, { width: width, height: height });

  return context.getImageData(
    topCrop.x,
    topCrop.y,
    topCrop.x + topCrop.width,
    topCrop.y + topCrop.height
  );
};

function cropImage(img) {
  const size = 416
  const centerHeight = img.shape[0] / 2;
  const beginHeight = centerHeight - (size / 2);
  const centerWidth = img.shape[1] / 2;
  const beginWidth = centerWidth - (size / 2);
  return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
}

tracking.inherits(ProductTracker, tracking.Tracker);

export default ProductTracker;
