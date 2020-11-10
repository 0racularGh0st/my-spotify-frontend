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
      <a href="https://nigeldavid.in" target="_blank" rel="noopener noreferrer" class="my-website-link"><p class="my-website-by">Developed By </p><p class="my-website">Nigel David Tariang</p></a>
      <a href="http://localhost:8888/login" rel="noopener noreferrer" class="login-button"
        ><h4 class="login">Login with Spotify</h4></a
      >
      <p class="disclaimer">
        Note: Login process is done through Spotify's official authorization flow. No
        Login information is stored in this site.
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-page {
  position: relative;
  background: var(--bg-color);
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
  color: var(--main-white);
}
.login-button {
  text-decoration: none;
  color: var(--main-white);
}
.login {
  background:var(--alt-green);
  width: max-content;
  margin: auto;
  padding: .7rem 2rem;
  border-radius: 2rem;
  transition: all 0.3s ease;
}
.login:hover{
  background: var(--main-green);
}
.disclaimer {
  color: var(--main-white);
  opacity: 0.6;
  max-width: 300px;
  margin: 2rem auto;
}
.my-website-link{
  text-decoration: none;
  display: flex;
  justify-content: center;
}
.my-website-by{
  color: var(--main-white);
  opacity: 0.7;
  text-decoration: none;
  margin-right: 6px;
}
.my-website{
  color: var(--main-white);
  opacity: 0.7;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: all .3s ease;
  &:hover{
    opacity: 1;
    color: var(--alt-green);
  }
}
</style>