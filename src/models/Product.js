export default class Product {
  constructor(props) {
    this.ean = props.ean;
    this.thumbnail = props.thumbnail;
    this.description = props.description;
    this.name = props.name;
    this.price = props.price;
    this.isAvailableInPhs = props.isAvailableInPhs;
    this.isCharity = props.isCharity || false
  }
}
