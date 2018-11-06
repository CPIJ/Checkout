export default class Product {
  constructor(ean, thumbnail) {
    this.ean = ean;
    this.thumbnail = thumbnail
  }

  static get test() {
    return new Product("0".repeat(13), 'https://www.newdirectionsaromatics.ca/images/products/main/CosmoWhiteBottle_Low.jpg');
  }
}
