<template>
  <Navbar v-if="!inLoginPage" />
  <router-view />
</template>
<script>
import Navbar from "./components/Navbar";
export default {
  data() {
    return {
      isLoginPage: true,
      location: window.location.pathname || "/",
    };
  },
  components: {
    Navbar,
  },
  computed: {
    inLoginPage: function () {
      if (this.location === "/") return true;
      else return false;
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  position: relative;
}

:root {
  --bg-color: #121212;
  --main-green: #21d760;
  --alt-green: #1ba74b;
  --main-white: #ffffff;
  --alt-white: #9e9e9e;
  --item-text-color: #ffffffb3;
  --item-value-color: #1ba74b;
  --nav-item-hover-color: #333232;
  --fs-small: 12px;
}
.content-container {
  padding-top: 4rem;
  padding-right: 2rem;
  padding-left: 2rem;
  padding-bottom: 5rem;
}
@media (min-width: 769px) {
  .content-container {
    padding-top: 4rem;
    padding-left: 200px;
    padding-right: 120px;
    padding-bottom: 5rem;
  }
}
.theme-button {
  border: 1.5px solid var(--alt-green);
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  transition: all 0.3s ease;
  a {
    text-decoration: none;
    color: var(--main-white);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
  }
  &:hover {
    background: var(--alt-green);
  }
}
</style>
