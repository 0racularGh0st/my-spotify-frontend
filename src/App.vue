<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
:root {
  --bg-color: #121212;
  --main-green: #21d760;
  --alt-green: #1ba74b;
  --main-white: #ffffff;
  --item-text-color: #ffffffb3;
  --item-value-color: #1ba74b;
  --fs-small: 12px;
}
.content-container {
  padding-top: 4rem;
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
  &:hover{
    background: var(--alt-green);
  }
}
</style>
