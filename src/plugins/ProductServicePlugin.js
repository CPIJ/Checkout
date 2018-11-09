import ProductService from '@/services/ProductService'

const ProductServicePlugin = {
  install(Vue, options) {
    Vue.prototype.$productService = new ProductService(options)
  }
};

export default ProductServicePlugin;
