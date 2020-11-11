<template>
  <div class="recently-played">
    <div v-if="!dataReady">
      <Loader />
    </div>
    <div class="content-container" v-if="dataReady">
      <div>
        <div class="recently-played-heading"><h2>Recently Played</h2></div>
        <a
          class="tracks-grid"
          v-for="(item, index) in recentlyPlayed.items"
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
</template>
<script>
import Loader from "./Loader";
import { getRecentlyPlayed } from "../spotify";
import { catchErrors, formatDuration, getTrackHrefValue} from "../utils";
export default {
  created() {
    catchErrors(this.getRecent());
  },
  mounted() {},
  methods: {
    getRecent: async function () {
      let res = await getRecentlyPlayed();
      this.recentlyPlayed = res.data;
      this.dataReady = true;
    },
    formatDuration: formatDuration,
    getTrackHrefValue: getTrackHrefValue
  },
  data() {
    return {
      recentlyPlayed: null,
      dataReady: false,
    };
  },
  components: {
    Loader,
  },
};
</script>
<style lang="scss" scoped>
.recently-played {
  position: relative;
  height: 100%;
  width: 100%;
  background: var(--bg-color);
}
@media screen and (min-width: 769px) {
  .recently-played-heading {
    color: var(--main-white);
    h2 {
      margin-top: 0;
    }
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
}

@media screen and (max-width: 768px) {
  .recently-played-heading {
    color: var(--main-white);
    h2 {
      margin-top: 0;
    }
    display: block;
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