<template>
  <div class="about">
    <h1>About</h1>
    <v-content>
      <v-container>
        <h3>Zone - Pokédex</h3>
        <p>
          An open source Modern Design Pokédex. A fanbase experiment and no
          other intention to overide or add additional information that can
          cause false idea to the original site.
        </p>
        <p>
          Built with <a :href="vuejs" target="_blank">Vue JS</a>,
          <a :href="vuetify" target="_blank">Vuetify</a>, and
          <a :href="pokeapi" target="_blank">PokéAPI</a>.
        </p>
        <p>
          Special Thanks to <a :href="pokemon" target="_blank">Pokémon</a>, the
          original website.
        </p>
      </v-container>
    </v-content>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vuejs: "//vuejs.org/",
      vuetify: "//vuetifyjs.com",
      pokeapi: "//pokeapi.co/",
      pokemon: "//www.pokemon.com/us/"
    };
  }
};
</script>
