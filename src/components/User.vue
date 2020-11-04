<template>
  <div class="user-profile">
    <div v-if="!dataReady">
      <Loader/>
    </div>
    <div class="user-container content-container" v-if="dataReady">
      <div class="user-overview">
        <img
          :src="user.images[0].url"
          height="192"
          width="192"
          aria-label="user-pic"
          alt="user-pic"
          class="display-pic"
        />
        <div>
          <h1 class="name">{{ user.display_name }}</h1>
        </div>
        <div class="follow-details">
          <div class="follow-detail">
            <p class="follow-detail-value">{{ user.followers.total }}</p>
            <p class="follow-detail-text">Followers</p>
          </div>
          <div class="follow-detail add-margin">
            <p class="follow-detail-value">
              {{ followedArtists.artists.total }}
            </p>
            <p class="follow-detail-text">Following</p>
          </div>
          <div class="follow-detail">
            <p class="follow-detail-value">{{ playlists.total }}</p>
            <p class="follow-detail-text">Playlists</p>
          </div>
        </div>
        <div class="theme-button">
          <a href=":javascript;" @click="signout()">LOGOUT</a>
        </div>
      </div>
      <div class="tracks_artists">
        <div>
          <div class="top-tracks-artists-heading"><h2>Top 10 Tracks</h2></div>
          <div
            class="tracks-grid"
            v-for="(item, index) in topTracks.items.slice(0, 10)"
            v-bind:key="index"
          >
            <img
              :src="item.album.images[2].url"
              height="50"
              width="50"
              alt="track-art"
              class="track-art"
            />
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
          </div>
        </div>
        <div>
          <div class="top-tracks-artists-heading"><h2>Top 10 Artists</h2></div>
          <div
            class="artist-grid"
            v-for="(item, index) in topArtists.items.slice(0, 10)"
            v-bind:key="index"
          >
            <img
              :src="item.images[2].url"
              height="50"
              width="50"
              alt="artist-art"
              class="artist-art"
            />
            <div class="artist-name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo, logout } from "../spotify";
import { catchErrors, formatDuration } from "../utils";
import Loader from './Loader';
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
    formatDuration: formatDuration,
  },
  components:{
    Loader
  }
};
</script>
<style lang="scss" scoped>
.user-profile {
  position: relative;
  height: 100%;
  width: 100%;
  background: var(--bg-color);
}
.user-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.display-pic {
  border-radius: 50%;
}
.name {
  color: var(--main-white);
  margin-bottom: 0;
}
.follow-details {
  display: flex;
  margin-bottom: 1rem;
}
.follow-detail {
}
.add-margin {
  margin: 0 1.25rem;
}
.follow-detail-value {
  color: var(--item-value-color);
  font-weight: 900;
}
.follow-detail-text {
  color: var(--item-text-color);
  text-transform: uppercase;
  font-size: var(--fs-small);
  font-weight: 600;
}
.tracks_artists {
  margin-top: 60px;
}
@media screen and (min-width: 769px) {
  .tracks_artists {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 70px;
    width: 100%;
    margin-top: 60px;
  }
}
.top-tracks-artists-heading {
  color: var(--main-white);
}
@media screen and (max-width: 768px){
.top-tracks-artists-heading {
  color: var(--main-white);
  margin-top: 60px;
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
.artist-art {
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
.artist-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 30px;
}
.artist-name {
  color: var(--main-white);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
}

</style>