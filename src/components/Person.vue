<template>
  <div class="py-8">
    <h2 class="text-3xl">{{ name }}</h2>
    <p class="text-xl">
      {{ title }}
    </p>
  </div>
</template>
<script>
export default {
  name: "Person",
  data() {
    return {
      name: "Helge Johansen",
      title: "System Developer",
    };
  },
};
</script>
