import { randomIntBetween, timeout, transformLabels } from "@/classes/utils.js";
import yolo, { downloadModel } from "tfjs-yolo-tiny";
import Product from "@/models/Product.js";
import labels from "@/assets/class_names.json";

export default class ProductClassifier {
  async init() {
    this.model = await downloadModel();
  }

  async predict(image) {
    const predictions = await yolo(image, this.model, { classNames: transformLabels(labels) });
    return this.validatePredictions(predictions).map(p => ({
      ean: p.className,
      probability: p.classProb
    }));
  }

  validatePredictions(predictions) {
    return predictions.filter(p => /^\d+$/.test(p.className));
  }
}
