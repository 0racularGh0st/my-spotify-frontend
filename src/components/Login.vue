<template>
  <div class="login-page">
    <div class="content">
      <img
        class="logo"
        src="../assets/spotify-icon-small.png"
        height="60"
        width="60"
        aria-label="spotify-logo"
        alt="logo"
      />
      <h1 class="app-name">My Spotify Profile</h1>
      <a href="http://localhost:8888/login" class="login-button"
        ><h2 class="login">Login with Spotify</h2></a
      >
      <h3 class="disclaimer">
        Note: Login process is done through Spotify's authorization flow. No
        Login information is store in this site.
      </h3>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-page {
  position: relative;
  background: #121212;
  height: 100vh;
  width: 100vw;
}
.content {
  position: absolute;
  width: 100vw;
  margin: 0 auto;
}
.logo {
  margin-top: 34vh;
}
.app-name {
  color: #ffffff;
}
.login-button {
  text-decoration: none;
  color: #ffffff;
}
.login {
  background: #1ba74b;
  width: max-content;
  margin: auto;
  padding: 1rem 2rem;
  border-radius: 2rem;
  transition: all 0.3s ease;
}
.login:hover{
  background: #21d760;
}
.disclaimer {
  color: #ffffff;
  opacity: 0.6;
  width: 90%;
  margin: 2rem auto;
}
</style>