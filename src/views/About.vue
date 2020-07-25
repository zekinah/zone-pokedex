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
        <p>
          This project has now newest version, more clean code and optimized,
          you can visit it here
          <a :href="version2" target="_blank">Zone-Pokédex2</a>. Thank you for
          appreciation.
        </p>
      </v-container>
    </v-content>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vuejs: "https://vuejs.org/",
      vuetify: "https://vuetifyjs.com",
      pokeapi: "https://pokeapi.co/",
      pokemon: "https://www.pokemon.com/us/",
      version2: "https://zonepokedex2.netlify.app/"
    };
  }
};
</script>
