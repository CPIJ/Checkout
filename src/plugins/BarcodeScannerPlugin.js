import BarcodeScanner from "@/classes/BarcodeScanner";

const BarcodeScannerPlugin = {
  async install(Vue, imageService) {
    Vue.prototype.$barcodeScanner = new BarcodeScanner(imageService);
  }
};

export default BarcodeScannerPlugin