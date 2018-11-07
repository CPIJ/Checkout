import { randomIntBetween, timeout } from "@/classes/utils.js";
import yolo, { downloadModel } from "tfjs-yolo-tiny";
import Product from "@/models/Product.js";
import labels from "@/assets/class_names.json"

export default class ProductClassifier {
  async init() {
    this.model = await downloadModel();
  }

  async predict(image) {
    const boxes = await yolo(image, this.model, { classNames: labels });

    console.log(boxes)

    return [
      {
        ean: Product.test.ean,
        probability: 100
      }
    ];
  }
}
