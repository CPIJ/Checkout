import { mediaConstraints } from "@/classes/utils";

const VideoStreamPlugin = {
  install(Vue, options) {
    Vue.prototype.$videoStream = {
      async init() {
        this._currentStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        this.deviceId = this.currentStream.getVideoTracks()[0].getCapabilities().deviceId
        this.loaded = true;
      },

      get currentStream() {
        return this._currentStream;
      }
    };
  }
};

export default VideoStreamPlugin;
