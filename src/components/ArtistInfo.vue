<template>
  <div class="artist-info">
    <div v-if="!dataReady">
      <Loader />
    </div>
    <div class="content-container" v-if="dataReady">
       <div class="artist-art-name-container">
            <img :src="artistInfo.images[1] && artistInfo.images[1].url || dummypic" height="250" width="250" alt="artist-art" class="artist-art"/>
            <div>
                <h1>{{artistInfo.name}}</h1>
            </div>
       </div>
       <div class="artist-details">
           <div class="artist-detail-item">
                <div class="detail-name">
                    FOLLOWERS
                </div>
               <div class="detail-value">
                   {{artistInfo.followers.total}}
               </div>
           </div>
           <div class="artist-detail-item">
                <div class="detail-name">
                    GENRES
                </div>
               <div class="detail-value">
                   <div v-for="(item,index) in artistInfo.genres" v-bind:key="index">
                       {{item}}
                   </div>
               </div>
           </div>
           <div class="artist-detail-item">
                <div class="detail-name">
                    POPULARITY
                </div>
               <div class="detail-value">
                    {{artistInfo.popularity}}%
               </div>
           </div>
       </div>
       <div class="theme-button-filled" v-if="!isFollowing">
          <a href="javascript:;" @click="followArtistNow()">FOLLOW</a>
       </div>
       <div class="theme-button-disabled" v-if="isFollowing">
          <a href="javascript:;">FOLLOWING</a>
       </div>
    </div>
  </div>
</template>
<script>
import Loader from "./Loader";
import { getArtist, doesUserFollowArtist, followArtist} from "../spotify";
import { catchErrors} from "../utils";
import dummypic from '../assets/dummypic.png';
export default {
  created() {
    catchErrors(this.getArtistData());
  },
  data() {
    return {
      artistId: this.$route.params.artistId,
      dataReady: false,
      artistInfo: null,
      isFollowing: null,
      dummypic: dummypic
    };
  },
  methods: {
    getArtistData: async function () {
      let artistInfoRes = await getArtist(this.artistId);
      this.artistInfo = artistInfoRes.data;
      let following = await doesUserFollowArtist(this.artistId);
      this.isFollowing = following.data[0];
      this.dataReady = true;
    },
    followArtistNow: async function(){
        let res = await followArtist(this.artistInfo.id);
        if(res && (res.status === 204 || res.status===200))
        this.isFollowing=true;
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
.artist-info {
  position: relative;
  height: 100%;
  width: 100%;
  background: var(--bg-color);
}
.artist-art{
    border-radius: 50%;
    margin-bottom: 1rem;
}
.artist-art-name-container{
   display: flex;
    flex-direction: column;
    align-items: center;
}
.artist-details{
    margin-top: 2rem;
    display: flex;
    justify-content: space-around;
}
.detail-name{
    color: var(--main-white);
    opacity: 0.8;
    font-size: 14px;
    margin-bottom: 0.5rem;
}
.detail-value{
    color: var(--alt-green);
    font-size: 16px;
    font-weight: 600;
}
.artist-detail-item{
    display: flex;
    flex-direction: column;
}
.theme-button-disabled{
    width: max-content;
    margin: 2rem auto;
}
.theme-button-filled{
    width: max-content;
    margin: 2rem auto;
}
</style>