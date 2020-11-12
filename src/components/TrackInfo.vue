<template>
  <div class="track-info">
    <div v-if="!dataReady">
      <Loader />
    </div>
    <div class="content-container" v-if="dataReady">
      <div class="info-container">
        <div class="album-art">
          <img
            :src="trackInfo.album.images[1] && trackInfo.album.images[1].url || dummypic"
            alt="album-art"
            height="220"
            width="220"
          />
        </div>
        <div class="track-artist-album">
          <h2 class="track-name">{{ trackInfo.name }}</h2>
          <h3 class="artist-name">{{ trackInfo.artists[0].name }}</h3>
          <p class="album-name">
            {{ trackInfo.album.name }}&nbsp;·&nbsp;{{
              trackInfo.album.release_date.slice(0, 4)
            }}
          </p>
          <div class="theme-button-filled">
            <a :href="openSpotifyLink(trackInfo.external_urls.spotify)" target="_blank" rel="noopener noreferrer">PLAY ON SPOTIFY</a>
          </div>
        </div>
      </div>
      <div class="track-info-data">
          <div class="info">
              <div class="info-value">
                {{ formatDuration(trackInfo.duration_ms) }}
                </div> 
                <div class="info-name">
                  Duration
                </div>
          </div>
          <div class="info">
            <div class="info-value">
                {{parsePitchClass(audioFeatures.key)}}
                </div> 
                <div class="info-name">
                  Key
                </div> 
          </div>
          <div class="info">
            <div class="info-value">
               {{audioFeatures.mode === 1? 'Major' : 'Minor'}}
                </div> 
                <div class="info-name">
                 Modality
                </div> 
               
          </div>
          </div>
          <div class="track-info-data">
          <div class="info">
              <div class="info-value">
               {{audioFeatures.time_signature}}
                </div> 
                <div class="info-name">
                 Time Signature
                </div> 
          </div>
          <div class="info">
              <div class="info-value">
               {{Math.round(audioFeatures.tempo)}}
                </div> 
                <div class="info-name">
                 Tempo (BPM)
                </div> 
          </div>
          <div class="info">
              <div class="info-value">
               {{trackInfo.popularity}}%
                </div> 
                <div class="info-name">
                 Popularity
                </div> 
          </div>
      </div>
      <BarChart :features="audioFeatures" isPlaylist="false"/>
    </div>
  </div>
</template>
<script>
import Loader from "./Loader";
import BarChart from "./BarChart";
import { getTrack, getTrackAudioFeatures} from "../spotify";
import { catchErrors, formatDuration, parsePitchClass} from "../utils";
import dummypic from '../assets/dummypic.png';
export default {
  created() {
    catchErrors(this.getTrackData());
  },
  data() {
    return {
      trackId: this.$route.params.trackId,
      dataReady: false,
      trackInfo: null,
      audioFeatures: null,
      dummypic : dummypic
    };
  },
  methods: {
    getTrackData: async function () {
      let trackInfoRes = await getTrack(this.trackId);
      let audioFeaturesRes = await getTrackAudioFeatures(this.trackId);
      this.trackInfo = trackInfoRes.data;
      this.audioFeatures = audioFeaturesRes.data;
      this.dataReady = true;
    },
    openSpotifyLink: function(url){
        return url;
    },
    formatDuration : formatDuration,
    parsePitchClass : parsePitchClass
  },
  components: {
    Loader,
    BarChart
  },
};
</script>
<style lang="scss" scoped>
h2,
h3,
p {
  margin: 0.2rem 0;
  color: white;
}
.theme-button-filled{
    margin-top: 1rem;
}
.track-info {
  position: relative;
  height: 100%;
  width: 100%;
  background: var(--bg-color);
}
.album-art {
  display: inline-block;
  height: 220px;
}
.artist-name {
  opacity: 0.8;
}
.album-name {
  opacity: 0.6;
}
@media screen and (max-width: 500px) {
  .info-container {
    display: inline-block;
    margin-bottom: 2rem;
  }
  .track-artist-album {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media screen and (min-width: 501px) {
  .info-container {
    display: flex;
    margin-bottom: 4rem;
  }
  .track-artist-album {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    margin-left: 2rem;
    text-align: left;
  }
}
.track-info-data{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
.info-value{
  color: var(--alt-green);
  font-size: 20px;
  font-weight: 700;
}
.info-name{
  color: var(--main-white);
  font-size: 12px;
  opacity: 0.8;
}
.info{
  padding: 1rem;
  border: 1px solid var(--alt-white);
  min-width: 0;
}



</style>