import { randomIntBetween, timeout } from "@/classes/utils.js";
import Product from "@/models/Product.js"

export default class ProductClassifier {
  async predict(image) {
    await timeout(randomIntBetween(500, 1500));

    return [
      {
        ean: Product.test.ean,
        probability: 100
      }
    ];
  }
}
