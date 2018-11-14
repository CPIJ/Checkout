export default class BarcodeScanner {
  constructor(imageService) {
    this.imageService = imageService;
  }

  async fromImage(image) {
    const uri = image.toDataURL('image/jpeg')
    const barcodes = await this.imageService.decodeBarcodes(uri)

    for (let barcode of barcodes) {
      alert(barcode)
    }

    if (barcodes.lenght < 1) {
      alert('Nope')
    }

    return "0".repeat(13);
  }
}
