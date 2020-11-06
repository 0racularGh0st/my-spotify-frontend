<template>
    <div class="track-info">
         <div v-if="!dataReady">
            <Loader/>
        </div>
        <div class="content-container" v-if="dataReady">
            <div class="info-container">
                <div class="album-art">
                <img :src="trackInfo.album.images[1].url" alt="album-art" height="220" width="220">
            </div>
            <div class="track-artist-album">
                <h2 class="track-name">{{trackInfo.name}}</h2>
                <h3 class="artist-name">{{trackInfo.artists[0].name}}</h3>
                <p class="album-name">{{trackInfo.album.name}}&nbsp;·&nbsp;{{trackInfo.album.release_date.slice(0,4)}}</p>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import Loader from "./Loader";
import { getTrack } from "../spotify";
import { catchErrors } from "../utils";
export default {
  created() {
    catchErrors(this.getTrackData());
  },
  data() {
    return {
      trackId: this.$route.params.trackId,
      dataReady: false,
      trackInfo: null,
    };
  },
  methods: {
    getTrackData: async function () {
      let trackInfoRes = await getTrack(this.trackId);
      this.trackInfo = trackInfoRes.data;
      this.dataReady = true;
      console.log("Res->", this.trackInfo);
    },
  },
  components: {
      Loader
  }
};
</script>
<style lang="scss" scoped>
h2,h3,p{
    margin: 0.2rem 0;
    color: var(--main-white);
}
.track-info {
  position: relative;
  height: 100%;
  width: 100%;
  background: var(--bg-color);
}
.album-art{
    display: inline-block;
}
.artist-name{
    opacity: 0.8;
}
.album-name{
    opacity: 0.6;
}
@media screen and (max-width: 479px){
    .info-container{
        display: inline-block;
        margin-bottom: 2rem;
    }
    .track-artist-album{
    display: flex;
    flex-direction: column;
    align-items: center;
}
}
@media screen and (min-width: 480px){
    .info-container{
        display: flex;
        margin-bottom: 2rem;
    }
    .track-artist-album{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    margin-left: 2rem;
}
}


</style>