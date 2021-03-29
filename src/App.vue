<template>
  <div id="app">
    <Information msg="kubes" />
  </div>
</template>

<script>
import Information from "./components/Information.vue";

export default {
  name: "App",
  components: {
    Information,
  },
};
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

body {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  color: #fff;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  position: relative;
  animation: change 20s ease-in-out infinite;
}
@keyframes change {
  0% {
    background-position: 0% 0%;
  }
  10% {
    background-position: 0% 50%;
  }
  20% {
    background-position: 0% 100%;
  }
  30% {
    background-position: 50% 100%;
  }
  40% {
    background-position: 100% 100%;
  }
  50% {
    background-position: 100% 50%;
  }
  60% {
    background-position: 100% 0%;
  }
  70% {
    background-position: 50% 0%;
  }
  80% {
    background-position: 0% 0%;
  }
}
#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
/* .fade-block {
  opacity: 0;
  animation-delay: 2s;
  animation: fadein 3s ease;
  animation-fill-mode: forwards;
}
@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
} */
</style>
