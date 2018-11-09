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
    const cart = this.getCart(userId);
    const data = cart.data();
    const products = data.products;
    products.push(product.ean);

    data.products = products;
    data.totalAmount += product.price;

    doc.ref.set(data);
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

    const doc = cart.docs[0];

    return await doc.ref.get();
  }
}
