<template>
    <div class="top-tracks">
        <div v-if="!dataReady">
            <Loader/>
        </div>
        <div class="content-container" v-if="dataReady">
            <div>
          <div class="top-tracks-artists-heading"><h2>Top Tracks</h2> 
            <div class="duration-filter">
                <div id="duration-long" class="duration duration-active" @click="setDuration('long')">
                   All Time
                </div>
                <div id="duration-medium" class="duration" @click="setDuration('medium')">
                    Last 6 Months
                </div>
                <div id="duration-short" class="duration" @click="setDuration('short')">
                   Last 4 Weeks
                </div>
            </div>
          </div>
          <a
            class="tracks-grid"
            v-for="(item, index) in topTracksSelected.items"
            v-bind:key="index"
            :href = "getTrackHrefValue(item.id)"
          >
            <div class="track-art-info-container">
              <img
              :src="item.album.images[2] && item.album.images[2].url || dummypic"
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
                <div class="track-name">{{ item.name }}</div>
                <div class="track-artist-album">
                  {{ item.artists[0].name }} &nbsp;·&nbsp; {{ item.album.name }}
                </div>
              </div>
              <div class="track-data-time">
                {{ formatDuration(item.duration_ms) }}
              </div>
            </div>
            </a>
          </div>
        </div>
    </div>
</template>
<script>
import Loader from "./Loader";
import {
  getTopTracksLong,
  getTopTracksMedium,
  getTopTracksShort,
} from "../spotify";
import { catchErrors, formatDuration, getTrackHrefValue} from "../utils";
import dummypic from '../assets/dummypic.png';
export default {
  created() {
    catchErrors(this.getTopTracks());
  },
  mounted() {
    
  },
  methods: {
    getTopTracks: async function () {
      let resLong = await getTopTracksLong();
      let resMedium = await getTopTracksMedium();
      let resShort = await getTopTracksShort();
      this.topTracksLong = resLong.data;
      this.topTracksMedium = resMedium.data;
      this.topTracksShort = resShort.data;
      this.topTracksSelected = this.topTracksLong;
      this.dataReady = true;
    },
    formatDuration: formatDuration,
    getTrackHrefValue: getTrackHrefValue,

    setDuration: function(duration){
          document.getElementById(this.prevSelected).classList.remove("duration-active");
          if(duration==="long"){
              this.topTracksSelected = this.topTracksLong;
              this.prevSelected="duration-long";
              document.getElementById("duration-long").classList.add("duration-active");
              
          }
          else if(duration==="medium"){
              this.topTracksSelected = this.topTracksMedium;
              this.prevSelected="duration-medium";
              document.getElementById("duration-medium").classList.add("duration-active");
          }
          else if(duration==="short"){
              this.topTracksSelected = this.topTracksShort;
               this.prevSelected="duration-short";
              document.getElementById("duration-short").classList.add("duration-active");
          }
      }
  },
  data() {
    return {
      topTracksLong: null,
      topTracksMedium: null,
      topTracksShort: null,
      topTracksSelected: null,
      prevSelected: "duration-long",
      dataReady: false,
      dummypic: dummypic
    };
  },
  components: {
    Loader,
  }
};
</script>
<style lang="scss" scoped>
.top-tracks {
  position: relative;
  height: 100%;
  width: 100%;
  background: var(--bg-color);
}
@media screen and (min-width: 769px) {
    .top-tracks-artists-heading {
  color: var(--main-white);
  h2{
      margin-top: 0;
  }
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.duration-filter{
    font-size: 16px;
    display: flex;
    justify-content: space-evenly;
}
.duration{
    margin-left: 1rem;
}
}

@media screen and (max-width: 768px){
    .top-tracks-artists-heading {
  color: var(--main-white);
  h2{
      margin-top: 0;
  }
  display: block;
}
.duration-filter{
    font-size: 14px;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1.5rem;
}
}
.duration{
    opacity: 0.8;
    position: relative;
    height: max-content;
    cursor: pointer;
    &::before{
        content: '';
        position: absolute;
        height: 1px;
        width: 0%;
        background: var(--main-green);
        bottom: 0;
        transition: width 0.3s ease;
    }
    &:hover{
        opacity: 1;
        &::before{
            width: 100%;
        }
    }
}
.duration-active{
    opacity: 1;
    &::before{
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        background: var(--main-green);
        bottom: 0;
        transition: width 0.3s ease;
    }
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
.content-container {
    padding-top: 3.5rem;
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
</style>