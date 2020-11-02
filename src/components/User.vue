<template>
  <div class="user-profile">
    <div class="user-container content-container" v-if="dataReady">
      <div class="user-overview" >
        <img :src="user.images[0].url" height="192" width="192" aria-label="user-pic" alt="user-pic" class="display-pic"/>
        <div><h1 class="name">{{ user.display_name }}</h1></div>
        <div class="follow-details">
            <div class="follow-detail">
                <p class="follow-detail-value">{{user.followers.total}}</p>
                <p class="follow-detail-text">Followers</p>
            </div>
            <div class="follow-detail add-margin">
                <p class="follow-detail-value">{{followedArtists.artists.total}}</p>
                <p class="follow-detail-text">Following</p>
            </div>
            <div class="follow-detail">
                <p class="follow-detail-value">{{playlists.total}}</p>
                <p class="follow-detail-text">Playlists</p>
            </div>
        </div>
        <div class="theme-button">
          <a href=":javascript;"  @click="signout()">LOGOUT</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo, logout } from "../spotify";
import { catchErrors } from "../utils";
export default {
  data() {
    return {
      user: null,
      followedArtists: null,
      playlists: null,
      topArtists: null,
      topTracks: null,
      dataReady: false,
    };
  },
  created() {
    catchErrors(this.getData());
  },
  methods: {
    getData: async function () {
      const {
        user,
        followedArtists,
        playlists,
        topArtists,
        topTracks,
      } = await getUserInfo();
      await this.assignData(
        user,
        followedArtists,
        playlists,
        topArtists,
        topTracks
      );
      console.log(user, followedArtists, playlists, topArtists, topTracks);
      console.log("The User is:", this.user);
    },
    assignData: async function (
      user,
      followedArtists,
      playlists,
      topArtists,
      topTracks
    ) {
      this.user = user;
      this.followedArtists = followedArtists;
      this.playlists = playlists;
      this.topArtists = topArtists;
      this.topTracks = topTracks;
      this.dataReady = true;
      return;
    },
    signout: function () {
      logout();
    },
  },
};
</script>
<style lang="scss" scoped>
.user-profile {
  position: relative;
  height: 100vh;
  width: 100vw;
  background: var(--bg-color);
}
.user-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.display-pic{
  border-radius: 50%;
}
.name{
  color: var(--main-white);
}
.follow-details{
  display: flex; 
  margin-bottom: 1rem;
}
.follow-detail{
  
}
.add-margin{
    margin: 0 1.25rem;
  }
.follow-detail-value{
  color: var(--item-value-color);
  font-weight: 900;
}
.follow-detail-text{
  color: var(--item-text-color);
  text-transform: uppercase;
  font-size: var(--fs-small);
  font-weight: 600;
}
</style>