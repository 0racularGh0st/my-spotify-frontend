<template>
  <div class="top-artists">
    <div v-if="!dataReady">
      <Loader />
    </div>
    <div class="content-container" v-if="dataReady">
      <div>
        <div class="my-playlist-heading">
          <h2>My Playlists</h2>
        </div>
        <div
          class="my-playlist-container"
        >
          <a class="playlist-inner"  v-for="(item, index) in myPlaylist.items"
          v-bind:key="index"
          :href="getPlaylistHrefValue(item.id)"
          >
              
          <div class="track-art-info-container">
              <img
            :src="item.images[0].url"
            alt="playlist-art"
            class="playlist-art"
            height="200"
            width="200"
          />
              <div class="info-overlay-container">
                <img src="../assets/info.png" height="50" width="50" class="info-overlay"/>
              </div>
            </div>
          <div class="playlist-name">{{ item.name }}</div>
          <div class="number_tracks">{{item.tracks.total}} Tracks</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from "./Loader";
import {
  getPlaylists
} from "../spotify";
import { catchErrors, getPlaylistHrefValue} from "../utils";
export default {
  created() {
    catchErrors(this.getMyPlaylists());
  },
  mounted() {},
  methods: {
    getMyPlaylists: async function () {
      let res = await getPlaylists();
      this.myPlaylist = res.data;
      console.log(
        "Res->",
        this.myPlaylist
      );
      this.dataReady = true;
    },
    getPlaylistHrefValue: getPlaylistHrefValue
  },
  data() {
    return {
      myPlaylist: null,
      dataReady: false,
    };
  },
  components: {
    Loader,
  },
};
</script>
<style lang="scss" scoped>
.playlist-inner{
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
.playlist-inner{
    display: inline-flex;
     text-decoration: none;
     &:hover{
    .info-overlay-container{
      opacity: 1;
    }
  }
}
@media screen and (min-width: 769px) {
    .playlist-name {
  color: var(--main-white);
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 500;
  margin-top: 1rem;
  width: 200px;
}
.number_tracks {
  color: var(--main-white);
  opacity: 0.5;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  margin-top: 3px;
  width: 200px;
}
  .playlist-inner{
      width: 200px;
      margin-bottom: 3rem;
      margin-left: 1rem;
    margin-right: 1rem;
    text-decoration: none;
    &:hover{
    .info-overlay-container{
      opacity: 1;
    }
  }
  }
  .my-playlist-heading {
    color: var(--main-white);
    h2 {
      margin-top: 0;
    }
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .playlist-art {
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
    .playlist-name {
  color: var(--main-white);
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  margin-top: 1rem;
  width: 120px;
}
.number_tracks {
  color: var(--main-white);
  opacity: 0.5;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 500;
  margin-top: 3px;
  width: 200px;
}
  .playlist-inner{
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
  .my-playlist-heading {
    color: var(--main-white);
    h2 {
      margin-top: 0;
    }
    display: block;
  }
  .playlist-art {
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

.content-container {
  padding-top: 3rem;
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