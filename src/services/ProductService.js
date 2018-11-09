import Product from "@/models/Product";
import transform from "@/assets/class_names.transform.json";
import firebase from "firebase";
import config from "@/assets/.firebase-config";

const app = firebase.initializeApp({
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID
});

export default class ProductService {
  constructor() {
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
    const cart = await this.shoppingCarts
      .where("userId", "==", userId)
      .where("settled", "==", false)
      .get();

    if (cart.docs.length < 1) {
      throw new Error("No cart found for user: " + userId);
    } else if (cart.docs.length > 1) {
      throw new Error("Multiple carts are not allowed.");
    }

    const doc = cart.docs[0];
    const ref = await doc.ref.get()
    const data = ref.data()
    const products = data.products
    products.push(product.ean)

    doc.ref.set({
      products: products
    })
  }
}
