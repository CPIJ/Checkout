import Product from "@/models/Product";
import transform from "@/assets/class_names.transform.json";
import firebase from "firebase";

export default class ProductService {
  constructor(config) {
    const app = firebase.initializeApp(config);
    this.db = app.firestore();
    this.db.settings({ timestampsInSnapshots: true });
    this.products = this.db.collection("products");
    this.shoppingCarts = this.db.collection("shoppingCarts");
  }

  async getByEan(eanCode) {
    const document = await this.products.doc(eanCode).get();
    const data = document.data();

    return new Product({ ean: eanCode, ...data });
  }

  async addToShoppingCart(product, userId) {
    const doc = await this.getCart(userId);
    const cart = await doc.ref.get();
    const data = cart.data();
    const products = data.products;
    products.push(product.ean);

    data.products = products;
    data.totalAmount += product.price;

    doc.ref.set(data);
  }

  async getShoppingCart(userId) {
    const doc = await this.getCart(userId);
    const cart = await doc.ref.get();
    const data = cart.data();

    const promises = data.products.map(ean => this.getByEan(ean));
    const products = await Promise.all(promises);

    const set = new Set(products.map(p => p.name));

    return {
      id: data.id,
      items: Array.from(set).map(name => ({
        name: name,
        amount: products.filter(p => p.name === name).length,
        price: products.find(p => p.name === name).price
      }))
    };
  }

  async getCart(userId) {
    const cart = await this.shoppingCarts
      .where("userId", "==", userId)
      .where("hasPaid", "==", false)
      .get();

    if (cart.docs.length < 1) {
      throw new Error("No cart found for user: " + userId);
    } else if (cart.docs.length > 1) {
      throw new Error("Multiple carts are not allowed.");
    }

    return cart.docs[0];
  }
}
