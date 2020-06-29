<template>
  <div class="home">
    <div class="d-flex flex-column align-center">
      <img
        alt="Pokemon logo"
        src="../assets/images/pokemon_logo.png"
        transition="scale-transition"
        width="300"
      />
    </div>
    <PokeHome msg="Randomizer" />
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
