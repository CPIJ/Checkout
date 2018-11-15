import { BrowserBarcodeReader } from "@zxing/library";
import { isMobile } from "@/classes/utils";

export default class BarcodeScanner {
  constructor(config) {
    this.videoElementName = config.videoElementName;
    this.stream = config.stream;
    this.reader = new BrowserBarcodeReader();
  }

  async scan() {
    if (isMobile()) {
      this.stream.currentStream.getTracks().forEach(track => {
        if (track.getCapabilities().deviceId !== this.stream.deviceId) {
          track.stop();
        }
      });
    }

    const result = await this.reader.decodeFromInputVideoDevice(
      this.stream.deviceId,
      this.videoElementName
    );
    return result.text;
  }
}
