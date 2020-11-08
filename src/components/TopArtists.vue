<template>
  <div class="top-artists">
    <div v-if="!dataReady">
      <Loader />
    </div>
    <div class="content-container" v-if="dataReady">
      <div>
        <div class="top-tracks-artists-heading">
          <h2>Top Artists</h2>
          <div class="duration-filter">
            <div
              id="duration-long"
              class="duration duration-active"
              @click="setDuration('long')"
            >
              All Time
            </div>
            <div
              id="duration-medium"
              class="duration"
              @click="setDuration('medium')"
            >
              Last 6 Months
            </div>
            <div
              id="duration-short"
              class="duration"
              @click="setDuration('short')"
            >
              Last 4 Weeks
            </div>
          </div>
        </div>
        <div
          class="artist-container"
        >
          <a class="artist-inner"  v-for="(item, index) in topArtistsSelected.items"
          v-bind:key="index"
          :href="getArtistHrefValue(item.id)"
          >
              
          <div class="track-art-info-container">
              <img
              :src="item.images[2].url"
              height="50"
              width="50"
              alt="artist-art"
              class="artist-art"
            />
              <div class="info-overlay-container">
                <img src="../assets/info.png" height="50" width="50" class="info-overlay"/>
              </div>
            </div>
          <div class="artist-name">{{ item.name }}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from "./Loader";
import {
  getTopArtistsLong,
  getTopArtistsMedium,
  getTopArtistsShort,
} from "../spotify";
import { catchErrors, getArtistHrefValue } from "../utils";
export default {
  created() {
    catchErrors(this.getTopArtists());
  },
  mounted() {},
  methods: {
    getTopArtists: async function () {
      let resLong = await getTopArtistsLong();
      let resMedium = await getTopArtistsMedium();
      let resShort = await getTopArtistsShort();
      this.topArtistsLong = resLong.data;
      this.topArtistsMedium = resMedium.data;
      this.topArtistsShort = resShort.data;
      this.topArtistsSelected = this.topArtistsLong;
      console.log(
        "Res->",
        this.topArtistsLong,
        this.topArtistsMedium,
        this.topArtistsShort
      );
      this.dataReady = true;
    },
    getArtistHrefValue: getArtistHrefValue,

    setDuration: function (duration) {
      document
        .getElementById(this.prevSelected)
        .classList.remove("duration-active");
      if (duration === "long") {
        this.topArtistsSelected = this.topArtistsLong;
        this.prevSelected = "duration-long";
        document
          .getElementById("duration-long")
          .classList.add("duration-active");
      } else if (duration === "medium") {
        this.topArtistsSelected = this.topArtistsMedium;
        this.prevSelected = "duration-medium";
        document
          .getElementById("duration-medium")
          .classList.add("duration-active");
      } else if (duration === "short") {
        this.topArtistsSelected = this.topArtistsShort;
        this.prevSelected = "duration-short";
        document
          .getElementById("duration-short")
          .classList.add("duration-active");
      }
    },
  },
  data() {
    return {
      topArtistsLong: null,
      topArtistsMedium: null,
      topArtistsShort: null,
      topArtistsSelected: null,
      prevSelected: "duration-long",
      dataReady: false,
    };
  },
  components: {
    Loader,
  },
};
</script>
<style lang="scss" scoped>
.artist-inner{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    &:hover{
    .info-overlay-container{
      opacity: 1;
    }
  }
}
.top-artists {
  position: relative;
  height: 100%;
  width: 100%;
  background: var(--bg-color);
}
.artist-inner{
    display: inline-flex;
    &:hover{
    .info-overlay-container{
      opacity: 1;
    }
  }
}
@media screen and (min-width: 769px) {
    .artist-name {
  color: var(--main-white);
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 500;
  margin-top: 1rem;
  width: 200px;
}
  .artist-inner{
      width: 200px;
      margin-bottom: 3rem;
      margin-left: 1rem;
    margin-right: 1rem;
    &:hover{
    .info-overlay-container{
      opacity: 1;
    }
  }
  }
  .top-tracks-artists-heading {
    color: var(--main-white);
    h2 {
      margin-top: 0;
    }
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .duration-filter {
    font-size: 16px;
    display: flex;
    justify-content: space-evenly;
  }
  .duration {
    margin-left: 1rem;
  }
  .artist-art {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    box-shadow: 0 0 20px -8px var(--alt-white);
  }
  .track-art-info-container{
    width: 150px;
    height: 150px;
  display: inline-block;
    position: relative;
  margin-right: 15px;
}
}

@media screen and (max-width: 768px) {
    .artist-name {
  color: var(--main-white);
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  margin-top: 1rem;
  width: 120px;
}
  .artist-inner{
      width: 120px;
      margin-bottom: 2rem;
          margin-left: 0.75rem;
    margin-right: 0.75rem;
    text-decoration: none;
    &:hover{
    .info-overlay-container{
      opacity: 1;
    }
  }
  }
  .top-tracks-artists-heading {
    color: var(--main-white);
    h2 {
      margin-top: 0;
    }
    display: block;
  }
  .duration-filter {
    font-size: 14px;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1.5rem;
  }
  .artist-art {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    box-shadow: 0 0 20px -8px var(--alt-white);
  }
  .track-art-info-container{
    width: 100px;
    height: 100px;
  display: inline-block;
    position: relative;
  margin-right: 15px;
}
}
.duration {
  opacity: 0.8;
  position: relative;
  height: max-content;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    height: 1px;
    width: 0%;
    background: var(--main-green);
    bottom: 0;
    transition: width 0.3s ease;
  }
  &:hover {
    opacity: 1;
    &::before {
      width: 100%;
    }
  }
}
.duration-active {
  opacity: 1;
  &::before {
    content: "";
    position: absolute;
    height: 1px;
    width: 100%;
    background: var(--main-green);
    bottom: 0;
    transition: width 0.3s ease;
  }
}



.content-container {
  padding-top: 3.5rem;
}
@media screen and (max-width:768px){
    .content-container {
  padding-right: 1rem;
  padding-left: 1rem;
}
   
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