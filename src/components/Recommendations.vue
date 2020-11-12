<template>
  <div class="recommendations-info">
    <div v-if="!dataReady">
      <Loader />
    </div>
    <div class="content-container" v-if="dataReady">
       <div>
          <div class="top-tracks-artists-heading"><h2>Recommended Tracks based on {{currentPlaylist.name}}</h2></div>
          <div class="theme-button-filled" v-if="!isFollowing">
          <a href="javascript:;" @click="createPlaylistNow()">SAVE PLAYLIST TO SPOTIFY</a>
          </div>
           <div class="theme-button-disabled" v-if="isFollowing">
          <a href="javascript:;">FOLLOWING</a>
          </div>
          <a
            class="tracks-grid"
            v-for="(item, index) in recTracks.tracks"
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
            <div class="theme-button-filled" v-if="!isFollowing">
          <a href="javascript:;" @click="createPlaylistNow()">SAVE PLAYLIST TO SPOTIFY</a>
          </div>
           <div class="theme-button-disabled" v-if="isFollowing">
          <a href="javascript:;">FOLLOWING</a>
          </div>
          </div>
    </div>
  </div>
</template>
<script>
import Loader from "./Loader";
import dummypic from '../assets/dummypic.png';
import { getPlaylist, getRecommendationsForTracks, getUser, createPlaylist, addTracksToPlaylist, followPlaylist, doesUserFollowPlaylist} from "../spotify";
import { catchErrors, getTrackHrefValue, formatDuration} from "../utils";
const getTrackUris = recommendations => recommendations.tracks.map(({ uri }) => uri);
export default {
  created() {
    catchErrors(this.getPlaylistData());
  },
  data() {
    return {
      playlistId: this.$route.params.playlistId,
      dataReady: false,
      currentPlaylist: null,
      recTracks: null,
      user: null,
      recPlaylistId: null,
      uris: null,
      isFollowing: false,
      dummypic: dummypic
    };
  },
  methods: {
    getPlaylistData: async function () {
      let currPlaylistRes = await getPlaylist(this.playlistId);
      this.currentPlaylist = currPlaylistRes.data;
      if(this.currentPlaylist){
          const {data} = await getRecommendationsForTracks(this.currentPlaylist.tracks.items);
          this.recTracks = data;
          const uris = getTrackUris(this.recTracks).join(',');
          this.uris = uris;
           this.dataReady = true;
      }
    },
    getTrackHrefValue: getTrackHrefValue,
    formatDuration: formatDuration,
    createPlaylistNow: async function(){
        if(this.currentPlaylist){
            let userRes = await getUser();
        this.user = userRes.data;
        const name = `Recommended Tracks Based on ${this.currentPlaylist.name}`;
        if(this.user){
            const { data } = await createPlaylist(this.user.id, name);
            this.recPlaylistId = data.id;
            if (this.recPlaylistId) {
                 catchErrors(this.addTracksAndFollow(this.recPlaylistId));
            }
        }

        }
    },
    addTracksAndFollow: async function(playlistId){
    const uris = this.uris;
    const { data } = await addTracksToPlaylist(playlistId, uris);
    if (data) {
      await followPlaylist(playlistId);
      catchErrors(this.isFollowingPlaylist(playlistId));
    }
    },
    isFollowingPlaylist:  async function(playlistId) {
    const  userId = this.user.id;
    const { data } = await doesUserFollowPlaylist(playlistId, userId);
    this.isFollowing = data[0];
  }
  },
  components: {
    Loader
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
.theme-button-disabled{
    width: max-content;
    margin: 2rem auto;
}
.recommendations-info {
  position: relative;
  height: 100%;
  width: 100%;
  background: var(--bg-color);
}
.theme-button-filled{
    width: max-content;
    margin: 2rem auto;
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
  margin-bottom: 2rem;
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