import { mediaConstraints } from "@/classes/utils";

const VideoStreamPlugin = {
  install(Vue, options) {
    Vue.prototype.$videoStream = {
      async init() {
        this._currentStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        this.loaded = true;
      },

      get currentStream() {
        return this._currentStream;
      }
    };
  }
};

export default VideoStreamPlugin;
