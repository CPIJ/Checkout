import { mediaConstraints } from "@/classes/utils";

const VideoStreamPlugin = {
  install(Vue, options) {
    Vue.prototype.$videoStream = {
      async init() {
        this._currentStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        console.log(this.currentStream)
        this.loaded = true;
      },

      get currentStream() {
        return this._currentStream;
      }
    };
  }
};

export default VideoStreamPlugin;
