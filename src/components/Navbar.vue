<template>
  <nav>
    <div>
      <img
        class="logo"
        src="../assets/spotify-icon-small.png"
        height="40"
        width="40"
        aria-label="spotify-logo"
        alt="logo"
      />
    </div>
    <div class="nav-links-container">
      <div class="nav-links">
        <a
          id="profile"
          href="/user"
          rel="noopener noreferrer"
          aria-label=""
          class="nav-item"
          @click="trackActive('profile')"
        >
          <img
            src="../assets/profile.svg"
            height="24"
            width="24"
            aria-label="profile"
            alt="profile"
            class="nav-item-img"
          />
          <div class="nav-item-text">Profile</div>
        </a>
        <a
          id="top_tracks"
          href="/top_tracks"
          rel="noopener noreferrer"
          aria-label=""
          class="nav-item"
          @click="trackActive('top_tracks')"
        >
          <img
            src="../assets/tracks.svg"
            height="24"
            width="24"
            aria-label="tracks"
            alt="tracks"
            class="nav-item-img"
          />
          <div class="nav-item-text">Top Tracks</div>
        </a>
        <a
          id="top_artists"
          href="/top_artists"
          rel="noopener noreferrer"
          aria-label=""
          class="nav-item"
          @click="trackActive('top_artists')"
        >
          <img
            src="../assets/artists.svg"
            height="24"
            width="24"
            aria-label="artist"
            alt="artist"
            class="nav-item-img"
          />
          <div class="nav-item-text">Top Artists</div>
        </a>
        <a
          id="recent"
          href="/recently_played"
          rel="noopener noreferrer"
          aria-label=""
          class="nav-item"
          @click="trackActive('recent')"
        >
          <img
            src="../assets/recent.svg"
            height="24"
            width="24"
            aria-label="recent"
            alt="recent"
            class="nav-item-img"
          />
          <div class="nav-item-text">Recent</div>
        </a>
        <a
          id="playlist"
          href="/playlists"
          rel="noopener noreferrer"
          aria-label=""
          class="nav-item"
          @click="trackActive('playlist')"
        >
          <img
            src="../assets/playlist.svg"
            height="24"
            width="24"
            aria-label="playlist"
            alt="playlist"
            class="nav-item-img"
          />
          <div class="nav-item-text">Playlists</div>
        </a>
      </div>
    </div>
  </nav>
</template>
<script>
const navItems = () => {
  const profile = document.getElementById("profile");
  const toptracks = document.getElementById("top_tracks");
  const topArtists = document.getElementById("top_artists");
  const recentlyPlayed = document.getElementById("recent");
  const playlist = document.getElementById("playlist");
  if (window.location.pathname.startsWith("/user")) profile.classList.add("isactive");
  if (window.location.pathname === "/top_tracks") toptracks.classList.add("isactive");
  if (window.location.pathname === "/top_artists") topArtists.classList.add("isactive");
  if (window.location.pathname === "/recently_played") recentlyPlayed.classList.add("isactive");
  if (window.location.pathname === "/playlists") playlist.classList.add("isactive");

};
export default {
  data() {
    return {
      prevActive: null
    }
  },
  mounted() {
    navItems();
  },
  methods: {
    trackActive: function(id){
        if(this.prevActive!==null){
          document.getElementById(this.prevActive).classList.remove("isactive");
        }
        this.prevActive=id;
    }
  }
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  nav {
    display: block;
    position: fixed;
    height: 70px;
    width: 100%;
    background: black;
    z-index: 100;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 9px 2px;
    top: auto;
    bottom: 0px;
    position: fixed;
  }
  .logo {
    display: none;
  }
  .nav-links-container {
    height: 100%;
  }
  .nav-links {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 100%;
    align-items: center;
    a {
      text-decoration: none;
    }
  }
  .nav-item-text {
    text-decoration: none;
    color: var(--main-white);
    opacity: 0.7;
    font-size: 12px;
    transition: all 0.3s ease;
  }
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background: none;
    transition: all 0.3s ease;
    position: relative;
    height: 70px;
    width: 100%;
    &::before {
      content: "";
      height: 3px;
      width: 0%;
      background: var(--alt-green);
      position: absolute;
      transition: opacity 0.3s ease;
      opacity: 0;
      top: 0;
    }
    &:hover {
      background: var(--nav-item-hover-color);
      .nav-item-img {
        opacity: 1;
      }
      .nav-item-text {
        opacity: 1;
      }
      &::before {
        width: 100%;
        opacity: 1;
      }
    }
  }
  .isactive {
    &::before {
     content: "";
      height: 3px;
      width: 100%;
      background: var(--alt-green);
      position: absolute;
      top: 0;
      transition: opacity 0.3s ease;
      opacity: 1;
    }
  }
  .nav-item-img {
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  .nav-item-text {
    text-decoration: none;
    color: var(--main-white);
    opacity: 0.7;
    font-size: 12px;
    transition: all 0.3s ease;
  }
}
@media screen and (min-width: 769px) {
  nav {
    display: block;
    position: fixed;
    height: 100%;
    width: 80px;
    background: black;
    z-index: 100;
    padding: 1rem 0rem;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 9px 2px;
  }
  .nav-links-container {
    display: flex;
    flex-direction: column;
    height: calc(100% - 96px);
    justify-content: center;
  }
  .logo {
    margin-bottom: 0.5rem;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
    a {
      text-decoration: none;
    }
  }
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 60px;
    background: none;
    transition: all 0.3s ease;
    position: relative;
    &::before {
      content: "";
      height: 0%;
      width: 5px;
      background: var(--alt-green);
      position: absolute;
      left: 0;
      transition: height 0.3s ease;
      opacity: 0;
    }
    &:hover {
      background: var(--nav-item-hover-color);
      .nav-item-img {
        opacity: 1;
      }
      .nav-item-text {
        opacity: 1;
      }
      &::before {
        height: 100%;
        opacity: 1;
      }
    }
  }
  .isactive {
    &::before {
      content: "";
      height: 100%;
      width: 5px;
      background: var(--alt-green);
      position: absolute;
      left: 0;
      transition: height 0.3s ease;
      opacity: 1;
    }
  }
  .nav-item-img {
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  .nav-item-text {
    text-decoration: none;
    color: var(--main-white);
    opacity: 0.7;
    font-size: 12px;
    transition: all 0.3s ease;
  }
}
</style>