<template>
  <div>
    <h1 class="text-7xl font-semibold my-8">{{ companyName }}</h1>
  </div>
</template>
<script>
export default {
  name: "Logo",
  data() {
    return {
      companyName: "kubes",
    };
  },
};
</script>

<style scoped>
@font-face {
  font-family: Protomolecule-Medium;
  src: url(../assets/Protomolecule-Medium.ttf);
}
h1 {
  font-family: "Protomolecule-Medium";
}
</style>
