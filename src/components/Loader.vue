<template>
  <div class="loader-wrapper">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>
<style lang="scss" scoped>
.loader-wrapper {
  position: absolute;
  width: 100%;
  height: 100vh;
  margin-top: 50vh;
}

.loader-wrapper > div {
  width: 18px;
  height: 18px;
  background-color: #2ebd59;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: bounce-anim 1.4s infinite ease-in-out both;
  animation: bounce-anim 1.4s infinite ease-in-out both;
}

.loader-wrapper .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.loader-wrapper .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes bounce-anim {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes bounce-anim {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>