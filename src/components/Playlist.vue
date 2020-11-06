<template>
  <div class="top-artists">
    <div v-if="!dataReady">
      <Loader />
    </div>
    <div class="content-container" v-if="dataReady">
      <div>
        <div class="top-tracks-artists-heading">
          <h2>My playlists</h2>
        </div>
        <div
          class="artist-container"
        >
          <div class="artist-inner"  v-for="(item, index) in myPlaylist.items"
          v-bind:key="index">
              <img
            :src="item.images[0].url"
            alt="artist-art"
            class="artist-art"
            height="200"
            width="200"
          />
          <div class="artist-name">{{ item.name }}</div>
          <div class="number_tracks">{{item.tracks.total}} Tracks</div>
          </div>
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
import { catchErrors } from "../utils";
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
.artist-inner{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.top-artists {
  position: relative;
  height: 100%;
  width: 100%;
  background: var(--bg-color);
}
.artist-inner{
    display: inline-flex;
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
  .artist-inner{
      width: 200px;
      margin-bottom: 3rem;
      margin-left: 1rem;
    margin-right: 1rem;
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
  .artist-inner{
      width: 120px;
      margin-bottom: 2rem;
          margin-left: 0.75rem;
    margin-right: 0.75rem;
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
  padding-top: 2rem;
}
@media screen and (max-width:768px){
    .content-container {
  padding-right: 1rem;
  padding-left: 1rem;
}
   
}
</style>