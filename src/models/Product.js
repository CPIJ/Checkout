export default class Product {
  constructor(ean) {
    this.ean = ean;
  }

  static get test() {
    return new Product("0".repeat(13));
  }
}
