<template>
  <div class="fade-block">
    <Logo />
    <Person />
    <Links />
    <Button />
  </div>
</template>

<script>
import Logo from "./Logo";
import Person from "./Person";
import Links from "./Links";
import Button from "./Button";

export default {
  name: "Information",
  components: {
    Logo,
    Person,
    Links,
    Button,
  },
};
</script>
<style scoped>
.fade-block {
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
}
</style>
