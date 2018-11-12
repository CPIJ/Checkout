import ImageService from "@/services/ImageService";

const ImageServicePlugin = {
  async install(Vue, options) {
    Vue.prototype.$imageService = new ImageService(options);
  }
};

export default ImageServicePlugin