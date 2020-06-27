<template>
  <div class="pokelist">
    <h1>{{ title }}</h1>
    <v-row
      class="fill-height"
      align-content="center"
      justify="center"
      v-if="initialLoading"
    >
      <v-col class="subtitle-1 text-center" cols="12">
        Initializing...
      </v-col>
      <v-col cols="6">
        <v-progress-linear
          color="green accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="subtitle-1 text-center" cols="12">
        <v-card dark>
          <v-card-text class="d-flex flex-column align-center text-capitalize">
            <v-radio-group row v-model="genValue" :mandatory="false">
              <v-radio label="All" value="all" @change="fetchAll"></v-radio>
              <v-radio
                v-for="gen of generations"
                :key="gen.id"
                :label="gen.name"
                :value="gen.url"
                @change="viewPerGeneration(gen.url)"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-for="poke of pokemons"
        :key="poke.id"
        cols="12"
        sm="12"
        md="4"
        lg="3"
      >
        <PokeCard :data="poke" @VIEW_POKEMON="viewPokemon" />
      </v-col>
    </v-row>
    <div class="text-center my-4" v-if="nextBatch" v-show="nextBatch">
      <v-btn @click="loadMore" dark :loading="loadMoreloading" class="load-more"
        >Load More Pokémon</v-btn
      >
    </div>
    <PokeInfo ref="pokemonInfo" />
    <v-btn
      class="scroll-top"
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";
import PokeCard from "@/components/PokeCard.vue";
import PokeInfo from "@/components/PokeInfo.vue";

export default {
  name: "PokeList",
  props: {
    msg: String
  },
  created() {
    this.getAllPokemons();
    this.getAllGenerations();
  },
  data: () => ({
    title: "List of Pokémon",
    pokemons: [],
    generations: [],
    pokemonPerGeneration: [],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
    initialLoading: true,
    loadMoreloading: false,
    limit: 12,
    nextBatch: null,
    fab: false,
    genValue: "all"
  }),
  methods: {
    /** Get Pokemon */
    async getAllPokemons() {
      this.initialLoading = true;
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=" + this.limit
      );
      this.pokemons = res.data.results.map(subdata => {
        const id = subdata.url.split("/")[subdata.url.split("/").length - 2];
        return {
          id,
          ...subdata,
          imageUrl: `${this.imageUrl}${id}.png`
        };
      });
      if (res.data.next) {
        this.nextBatch = res.data.next;
      }
      this.initialLoading = false;
    },
    /** Loadmore */
    async loadMore() {
      this.loadMoreloading = true;
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
      this.loadMoreloading = false;
    },
    /** Get all Generations */
    fetchAll() {
      this.getAllPokemons();
    },
    async getAllGenerations() {
      const { data } = await axios.get("https://pokeapi.co/api/v2/generation/");
      this.generations = data.results;
    },
    async viewPerGeneration(url) {
      function compare(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      const { data } = await axios.get(url);
      this.pokemonPerGeneration = data.pokemon_species.sort(compare);
      const pokemons = this.pokemonPerGeneration.map(item => {
        const id = item.url.split("/")[item.url.split("/").length - 2];
        return {
          ...item,
          id,
          imageUrl: `${this.imageUrl}${id}.png`
        };
      });
      this.pokemons = pokemons;
      this.nextBatch = false;
    },
    /** View Specific Pokemon */
    async viewPokemon(id) {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + id
      );
      this.$refs.pokemonInfo.viewPokemon(data);
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  },
  components: {
    PokeCard,
    PokeInfo
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
button.scroll-top.v-btn {
  background-color: #003459 !important;
}
</style>
