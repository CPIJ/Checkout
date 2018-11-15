import ProductClassifier from '@/classes/ProductClassifier'

const ProductClassifierPlugin = {
    install(Vue, options) {
        Vue.prototype.$productClassifier = new ProductClassifier()
    }
}

export default ProductClassifierPlugin