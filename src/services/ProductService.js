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
  }

  async getByEan(eanCode) {
    const document = await this.products.doc(eanCode).get();
    const data = document.data();

    return new Product({ ean: eanCode, ...data });
  }

  async isAvailableInPhs(product) {
    const document = await this.products.doc(product.ean).get();
    return document.data().isAvailableInPhs;
  }
}
