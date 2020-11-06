<template>
  <div class="recently-played">
    <div v-if="!dataReady">
      <Loader />
    </div>
    <div class="content-container" v-if="dataReady">
      <div>
        <div class="recently-played-heading"><h2>Recently Played</h2></div>
        <div
          class="tracks-grid"
          v-for="(item, index) in recentlyPlayed.items"
          v-bind:key="index"
        >
          <img
            :src="item.track.album.images[2].url"
            height="50"
            width="50"
            alt="track-art"
            class="track-art"
          />
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from "./Loader";
import { getRecentlyPlayed } from "../spotify";
import { catchErrors, formatDuration } from "../utils";
export default {
  created() {
    catchErrors(this.getRecent());
  },
  mounted() {},
  methods: {
    getRecent: async function () {
      let res = await getRecentlyPlayed();
      this.recentlyPlayed = res.data;
      console.log("Res->", this.recentlyPlayed);
      this.dataReady = true;
    },
    formatDuration: formatDuration,
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
  .duration-filter {
    font-size: 16px;
    display: flex;
    justify-content: space-evenly;
  }
  .duration {
    margin-left: 1rem;
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
  .duration-filter {
    font-size: 14px;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1.5rem;
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
.tracks-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 30px;
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
</style>