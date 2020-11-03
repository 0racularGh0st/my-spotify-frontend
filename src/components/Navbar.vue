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
      <a href="javascript:;" rel="noopener noreferrer" aria-label="" class="nav-item">
        <img src="../assets/profile.svg" height="24"
        width="24" aria-label="profile" alt="profile" class="nav-item-img"/>
        <div class="nav-item-text">Profile</div>
      </a>
      <a href="javascript:;" rel="noopener noreferrer" aria-label="" class="nav-item">
        <img  src="../assets/profile.svg" height="24"
        width="24" aria-label="profile" alt="profile" class="nav-item-img"/>
        <div class="nav-item-text">Profile</div>
      </a>
      <a href="javascript:;" rel="noopener noreferrer" aria-label="" class="nav-item">
        <img src="../assets/profile.svg" height="24"
        width="24" aria-label="profile" alt="profile" class="nav-item-img"/>
        <div class="nav-item-text">Profile</div>
      </a>
      <a href="javascript:;" rel="noopener noreferrer" aria-label="" class="nav-item">
        <img  src="../assets/profile.svg" height="24"
        width="24" aria-label="profile" alt="profile" class="nav-item-img"/>
        <div class="nav-item-text">Profile</div>
      </a>
      <a href="javascript:;" rel="noopener noreferrer" aria-label="" class="nav-item">
        <img src="../assets/profile.svg" height="24"
        width="24" aria-label="profile" alt="profile" class="nav-item-img"/>
        <div class="nav-item-text">Profile</div>
      </a>
    </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
nav {
  display: none;
}
@media (min-width: 769px) {
  nav {
    display: block;
    position: fixed;
    height: 100%;
    width: 80px;
    background: black;
    z-index: 100;
    padding: 1rem 0rem;
  }
  .nav-links-container{
      display: flex;
    flex-direction: column;
    height: calc(100% - 96px);
    justify-content: center;
  }
  .logo{
      margin-bottom:.5rem;
  }
  .nav-links{
      display: flex;
      flex-direction: column;
      a{
          text-decoration: none;
      }
  }
  .nav-item{
      display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 60px;
  }
  .nav-item-img{
    opacity: 0.7;
  }
  .nav-item-text{
      text-decoration: none;
      color: var(--main-white);
      opacity: 0.7;
      font-size: 12px;
  }
}
</style>