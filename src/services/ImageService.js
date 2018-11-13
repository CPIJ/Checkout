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
}
