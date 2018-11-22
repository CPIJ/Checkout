import labelMapping from "@/assets/class_names.transform.json";
import smartcrop from "smartcrop";

const decoder = new TextDecoder('utf-8')

export const randomIntBetween = (min, max) => Math.floor(Math.random() * max) + min;

export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const isMobile = () =>
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i) ||
  navigator.userAgent.match(/Windows Phone/i);

export const mediaConstraints = isMobile()
  ? { video: { facingMode: { exact: "environment" } } }
  : { video: true };

export const transformLabels = original => original.map(label => (labelMapping[label] ? labelMapping[label] : label));
export const calculateViewWidth = value => (window.innerWidth * value) / 100
export const isValidUuid = string => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(string)
export const decode = (bytes) => decoder.decode(bytes)

export const snap = async (source, width, height) => {
  var canvas = document.createElement("canvas");
  canvas.height = source.videoHeight;
  canvas.width = source.videoWidth;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

  const { topCrop } = await smartcrop.crop(canvas, {
    width: width,
    height: height
  });

  const tnCanvas = document.createElement("canvas");
  const tnContext = tnCanvas.getContext("2d");
  tnCanvas.width = width;
  tnCanvas.height = height;

  var bufferCanvas = document.createElement("canvas");
  var bufferContext = bufferCanvas.getContext("2d");
  bufferCanvas.width = source.videoWidth;
  bufferCanvas.height = source.videoHeight;
  bufferContext.drawImage(source, 0, 0);

  tnContext.drawImage(
    bufferCanvas,
    topCrop.x,
    topCrop.y,
    width,
    height,
    0,
    0,
    width,
    height
  );
  return tnCanvas;
}