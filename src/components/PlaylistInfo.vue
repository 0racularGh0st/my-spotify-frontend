<template>
  <div class="playlist-info">
        <div v-if="!dataReady">
         <Loader />
        </div>
         <div class="content-container" v-if="dataReady">
             <div class="info-container">
                 <div class="playlist-info-container">
                <img :src="playlistInfo.images[0].url" height="200" width="200" alt="playlist-art" class="playlist-art"/>
                <h2>{{playlistInfo.name}}</h2>
                <p class="playlist-owner">By {{playlistInfo.owner.display_name}}</p>
                <p class="no-of-tracks">{{playlistInfo.tracks.total}} Tracks</p>
                <div class="theme-button-filled">
                  <a :href="getRecommendationsHrefValue(playlistInfo.id)" >GET RECOMMENDATIONS</a>
                </div>
                <BarChart :features="averageFeatures" isPlaylist="true"/>
             </div>
             <div class="playlist-tracks-container">
            <a
            class="tracks-grid"
            v-for="(item, index) in playlistTracks.items"
            v-bind:key="index"
            :href = "getTrackHrefValue(item.track.id)"
            >
            <div class="track-art-info-container">
              <img
              :src="item.track.album.images[2].url"
              height="50"
              width="50"
              alt="track-art"
              class="track-art"
            />
              <div class="info-overlay-container">
                <img src="../assets/info.png" height="50" width="50" class="info-overlay"/>
              </div>
            </div>
            <div class="track-data">
              <div class="track-data-name">
                <div class="track-name">{{ item.track.name }}</div>
                <div class="track-artist-album">
                  {{ item.track.artists[0].name }} &nbsp;·&nbsp; {{ item.track.album.name }}
                </div>
              </div>
              <div class="track-data-time">
                {{ formatDuration(item.track.duration_ms) }}
              </div>
            </div>
            </a>
           </div>
             </div>
        </div>
  </div>
</template>
<script>
import Loader from "./Loader";
import BarChart from "./BarChart";
import { getPlaylist, getPlaylistTracks, getAudioFeaturesForTracks } from "../spotify";
import { catchErrors, getTrackHrefValue, formatDuration, getRecommendationsHrefValue} from "../utils";
export default {
  created() {
    catchErrors(this.getPlaylistInfo());
  },
  data() {
    return {
      playlistId: this.$route.params.playlistId,
      dataReady: false,
      playlistInfo: null,
      playlistTracks: null,
      audioFeatures : null,
      averageFeatures: {}
    };
  },
  methods: {
    getPlaylistInfo: async function () {
      let playlistInfoRes = await getPlaylist(this.playlistId);
      let playlistTracksRes = await getPlaylistTracks(this.playlistId);
      this.playlistInfo = playlistInfoRes.data;
      this.playlistTracks = playlistTracksRes.data;
      let audioFeaturesRes = await getAudioFeaturesForTracks(this.playlistTracks.items);
      this.audioFeatures = audioFeaturesRes.data;
      let averageFeaturesResult = await this.generateAverageFeatures(this.audioFeatures.audio_features);
      this.averageFeatures = averageFeaturesResult;
      this.dataReady = true;
    },
    getTrackHrefValue : getTrackHrefValue,
    formatDuration: formatDuration,
    getRecommendationsHrefValue: getRecommendationsHrefValue,
    generateAverageFeatures: function(audio_features){
        let acousticness = 0;
        let danceability = 0;
        let energy = 0;
        let instrumentalness = 0;
        let liveness = 0;
        let speechiness = 0;
        let valence = 0; 
        acousticness = (this.getSum(audio_features,'acousticness')/audio_features.length).toFixed(3);
        danceability = (this.getSum(audio_features,'danceability')/audio_features.length).toFixed(3);
        energy = (this.getSum(audio_features,'energy')/audio_features.length).toFixed(3);
        instrumentalness = (this.getSum(audio_features,'instrumentalness')/audio_features.length).toFixed(3);
        liveness = (this.getSum(audio_features,'liveness')/audio_features.length).toFixed(3);
        speechiness = (this.getSum(audio_features,'speechiness')/audio_features.length).toFixed(3);
        valence = (this.getSum(audio_features,'valence')/audio_features.length).toFixed(3);
        return {acousticness,danceability,energy,instrumentalness,liveness,speechiness,valence};
    },
    getSum: function(items,field){
        let sum = 0;
        for(var i=0; i< items.length ; i++){
            sum+=items[i][field];
        }
        return sum;
    }
  },
  components: {
    Loader,BarChart
  },
};
</script>
<style lang="scss" scoped>
h1,
h2,
h3,
p {
  margin: 0.2rem 0;
  color: white;
}
.theme-button-filled{
    margin-top: 1rem;
}
.playlist-info {
  position: relative;
  height: 100%;
  width: 100%;
  background: var(--bg-color);
}
.playlist-art{
    margin-bottom: 1rem;
}
.playlist-owner{
    opacity: 0.7;
}
.no-of-tracks{
    opacity: 0.85;
}
.tracks-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 30px;
  text-decoration: none;
  &:hover{
    .info-overlay-container{
      opacity: 1;
    }
  }
}
.track-art-info-container{
  display: inline-block;
    position: relative;
  height: 50px;
  width: 50px;
  margin-right: 15px;
}
.info-overlay{
  height: 30px;
  width: 30px;
}
.info-overlay-container{
  display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    color: rgb(255, 255, 255);
    opacity: 0;
    transition: all 0.3s ease;
    border-radius: 50%;
}
.track-art {
  display: inline-block;
  margin-right: 15px;
  border-radius: 50%;
  box-shadow: 0 0 20px -8px var(--alt-white);
}
.track-data {
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 10px;
}
.track-data-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
  text-align: left;
}
.track-data-time {
  color: var(--alt-white);
  font-size: 14px;
}
.track-name {
  color: var(--main-white);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
  font-size: 16px;
  font-weight: 500;
}
.track-artist-album {
  color: var(--alt-white);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
  color: rgb(155, 155, 155);
  font-size: 14px;
  margin-top: 3px;
}
@media screen and (min-width: 769px) {
    .content-container{
            padding-left: 110px;
    padding-right: 30px;
    }
    .info-container{
        display: flex;
    }
    .playlist-info-container{
        display: flex;
        flex-direction: column;
        width: 45%;
        align-items: center;
    }
    .playlist-tracks-container{
        width: 55%;
        display: inline-block;
        margin-left: 40px;
    }
}
@media screen and (max-width: 768px) {
    .playlist-info-container{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
    }
    .playlist-tracks-container{
        margin-top: 2rem;
    }
}
</style>