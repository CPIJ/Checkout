import { BrowserBarcodeReader } from "@zxing/library";

export default class BarcodeScanner {
  constructor(config) {
    this.videoElementName = config.videoElementName;
    this.stream = config.stream
    this.reader = new BrowserBarcodeReader();
  }

  async scan() {
    const deviceId = await this.getDeviceId();

    this.stream.currentStream.getTracks().forEach(track => {
      if (track.getCapabilities().deviceId !== deviceId) {
        track.stop()
      }
    })
    const result = await this.reader.decodeFromInputVideoDevice(deviceId, this.videoElementName);
    return result.text;
  }

  async getDeviceId() {
    const devices = await this.reader.getVideoInputDevices();
    devices.forEach(d => console.log(d))
    return devices[0].deviceId;
  }
}
