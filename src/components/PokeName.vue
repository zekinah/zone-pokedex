<template>
  <div class="pokename">
    <h2>{{ msg }}</h2>
    <v-row
      align="center"
      justify="center"
      style="height: 70vh"
      v-if="initialLoading"
    >
      <v-progress-circular
        :size="50"
        color="red"
        indeterminate
      ></v-progress-circular>
    </v-row>
    <v-row v-else>
      <v-col v-for="p of pokemons" :key="p.id" cols="12" sm="12" md="4" lg="3">
        <v-card hover>
          <v-card-text class="d-flex flex-column align-center">
            <v-img
              alt="Pokemon Logo"
              contain
              :src="p.imageUrl"
              transition="scale-transition"
              width="120"
            />
            <span class="title text-capitalize">{{ p.name }}</span>
            <span class="title text-capitalize">{{ p.height }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center my-4" v-if="nextBatch">
      <v-btn color="red" @click="loadMore" dark :loading="loading"
        >Load More</v-btn
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PokeCard",
  props: {
    msg: String
  },
  created() {
    this.getAllPokemons();
  },
  data: () => ({
    pokemons: [],
    nextBatch: null,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
    initialLoading: true,
    loading: false
  }),
  methods: {
    async getAllPokemons() {
      this.initialLoading = true;
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
      // this.pokemons = res.data;
      this.pokemons = res.data.results.map(item => {
        const id = item.url.split("/")[item.url.split("/").length - 2];
        return {
          ...item,
          id,
          imageUrl: `${this.imageUrl}${id}.png`
        };
      });
      if (res.data.next) {
        this.nextBatch = res.data.next;
      }
      this.initialLoading = false;
    },
    async loadMore() {
      this.loading = true;
      const res = await axios.get(this.nextBatch);
      const pokemons = res.data.results.map(item => {
        const id = item.url.split("/")[item.url.split("/").length - 2];
        return {
          ...item,
          id,
          imageUrl: `${this.imageUrl}${id}.png`
        };
      });
      this.pokemons = [...this.pokemons, ...pokemons];
      if (res.data.next) {
        this.nextBatch = res.data.next;
      }
      this.loading = false;
    },
    async viewPokemon(id) {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + id
      );
      this.$refs.pokemonDetail.viewPokemon(data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
