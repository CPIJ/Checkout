import Product from '@/models/Product'
import transform from "@/assets/class_names.transform.json"

const images = {
    "0000000000000": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoYLGnfPxb8Oqr7STtWWvNcz43hPeFqlENsMXJeGtgGvkxzbS91w",
    "0000000000001": "https://de-drogisterij.nl/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/k/a/karvan-cevitam-grenadine-01.60.jpg",
    "0000000000002": "https://www.geurwinkel.com/images/productimages/big/banaan_geurolie1.jpg",
    "0000000000003": "http://www.richardvandermaar.nl/wp-content/uploads/2015/05/royal-gala-appel-500x500.jpg",
    "0000000000004": "https://www.happychocolate.nl/images/productimages/big/sinaasappel2.jpg",
    "0000000000005": "https://www.bonipak.com/wp-content/uploads/2016/10/Broccoli-Bonipak-Produce-23.jpg",
    "0000000000006": "https://www.vitaminesperpost.nl/media/catalog/product/cache/4/image/500x/9df78eab33525d08d6e5fb8d27136e95/w/o/wortel_02.jpg",
    "0000000000007": "https://www02.cp-static.com/objects/high_pic/d/d67/1350094385_notebooks-laptops-asus-n580vd-e4714t-90nb0fl1-m11230.jpg",
    "0000000000008": "https://www.degroenecomputershop.nl/webshop/templates/gcs/images/products/9796.jpg",
    "0000000000009": "https://eg.jumia.is/MnKbB9kpHKR6LEV_Ed_VT1B7uV0=/fit-in/500x500/filters:fill(white)/product/48/64321/1.jpg?1266",
    "0000000000010": "https://onderdelenhuisveendam.nl/wp-content/uploads/2018/07/temp_50555-500x500.jpg",
    "0000000000011": "https://mobiel-assets.imgix.net/product_images/images/23829/original/galaxy_s7_silver_98cb6308788a3ff46f5acbba5f60771c1f29a020.jpg?auto=compress%2Cformat&w=500&h=500&s=31f3cfec2a851ea93dd0a6335077aedb",
    "0000000000012": "http://lekker-bekkie.nl/wp-content/uploads/2013/03/Lactona-tandenborstel-iQ+.jpg",
    "0000000000013": "https://www.ultimatesheepskin.com/wp-content/uploads/2013/05/small-tan-sheepskin-teddy-bear.jpg",
    "0000000000014": "https://www.ikea.com/nl/nl/images/products/urskog-boek__0566358_PE664654_S4.JPG",
    "0000000000015": "https://www.habitas-online.nl/media/product/537/schaar-rvs-22-cm-rosle-4004293962904-7b1.jpg",

}

const products = Object.keys(transform)
    .map(name => transform[name])
    .map(ean => new Product(ean, images[ean]))

    
export default class ProductService {
    getByEan(eanCode) {
        return products.find(p => p.ean === eanCode)
    }
}