<template>
  <div class="home">
    <div class="d-flex flex-column align-center">
      <img
        alt="Pokemon logo"
        src="../assets/pokemon_logo.png"
        transition="scale-transition"
        width="180"
      />
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
