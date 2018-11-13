import Product from "@/models/Product";
import transform from "@/assets/class_names.transform.json";
import firebase from "firebase";
const createUuid = require('uuid/v4')

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

    doc.ref.set(data);
  }

  async saveCart(cartId, products) {
    const document = await this.getCartById(cartId);
    const cartRef = await document.ref.get();
    const cart = cartRef.data();

    cart.products = products

    await document.ref.set(cart)
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
        ean: products.find(p => p.name === name).ean,
        amount: products.filter(p => p.name === name).length,
        price: products.find(p => p.name === name).price
      }))
    };
  }

  async payShoppingCart(cartId) {
    const document = await this.getCartById(cartId);
    const cartRef = await document.ref.get();
    const cart = cartRef.data();
    
    if (cart.hasPaid) {
      return false
    }

    cart.hasPaid = true

    await document.ref.set(cart)

    return true; 
  }

  async getCartById(cartId) {
    const cart = await this.shoppingCarts.where("id", "==", cartId).get();

    if (cart.docs.length < 1) {
      throw new Error("No cart found with id: " + cartId);
    }

    return cart.docs[0];
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

  async createNewCartFor(userId) {
    await this.shoppingCarts.doc().set({
      id: createUuid(),
      userId: userId,
      hasPaid: false,
      products: [],
    })
  }
}
