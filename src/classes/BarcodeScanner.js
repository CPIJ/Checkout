import { BrowserBarcodeReader } from "@zxing/library";

export default class BarcodeScanner {
  constructor(config) {
    this.videoElementName = config.videoElementName;
    this.reader = new BrowserBarcodeReader();
  }

  async scan() {
    const deviceId = await this.getDeviceId();
    const result = await this.reader.decodeFromInputVideoDevice(deviceId, this.videoElementName);
    return result.text;
  }

  async getDeviceId() {
    const devices = await this.reader.getVideoInputDevices();
    return devices[0].deviceId;
  }
}
