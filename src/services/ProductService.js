import Product from '@/models/Product'

const products = [
    Product.test
]

export class ProductService {
    getByEan(eanCode) {
        return products.find(p => p.ean === eanCode)
    }
}