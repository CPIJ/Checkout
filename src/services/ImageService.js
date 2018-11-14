export default class ImageService {
  constructor(config) {
    this.baseUrl = config.baseUrl;
  }

  async saveImage(image) {
    return await fetch(`${this.baseUrl}/training-images`, {
      method: "POST",
      body: JSON.stringify(image)
    });
  }

  async getAllImages() {
      return await fetch(`${this.baseUrl}/training-images`)
  }

  async decodeBarcodes(dataUri) {
    const response = await fetch(`${this.baseUrl}/decode-barcodes`, {
      method: 'POST',
      body: JSON.stringify({
        uri: dataUri
      })
    })

    return await response.json()
  }
}
