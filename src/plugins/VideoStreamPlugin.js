import { mediaConstraints } from '@/classes/utils'

const VideoStreamPlugin = {
    install(Vue, options) {
        Vue.prototype.$videoStream = {
            async init() {
                this.currentStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
                this.loaded = true
            }
        }
    }
}

export default VideoStreamPlugin