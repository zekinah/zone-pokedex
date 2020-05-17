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
    <PokeHome msg="Welcome to Zone - Pokedex" />
  </div>
</template>

<script>
// @ is an alias to /src
import PokeHome from "@/components/PokeHome.vue";

export default {
  name: "home",
  components: {
    PokeHome
  }
};
</script>
