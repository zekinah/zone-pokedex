<template>
  <div class="pokegeneration">
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
      <v-col class="subtitle-1" cols="12">
        <div color="basil">
          <v-card-text class="d-flex flex-column align-center text-uppercase">
            <v-select
              v-model="selectedGen"
              :items="generations"
              label="Generation"
              item-text="name"
              item-value="url"
              outlined
              dense
              dark
              @change="viewPerGeneration()"
            ></v-select>
          </v-card-text>
          <v-tabs background-color="transparent" dark grow>
            <v-tab>Pokemon List</v-tab>
            <v-tab>Moves</v-tab>
            <v-tab>Types</v-tab>
            <!-- List of Pokemeon -->
            <v-tab-item>
              <v-row>
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
              <div
                class="text-center my-4"
                v-if="nextBatchPokemon"
                v-show="nextBatchPokemon"
              >
                <v-btn
                  @click="loadMorePokemon"
                  dark
                  :loading="loadMorePokemonLoading"
                  class="load-more"
                  >Load More Pokémon</v-btn
                >
              </div>
            </v-tab-item>
            <!-- Moves -->
            <v-tab-item>
              <v-row>
                <v-col>
                  <v-chip
                    class="ma-2 chip-ability"
                    color="blue-grey darken-4"
                    dark
                    v-for="move in moves"
                    :key="move.name"
                    >{{ move.name }}</v-chip
                  >
                </v-col>
              </v-row>
              <div
                class="text-center my-4"
                v-if="nextBatchMove"
                v-show="nextBatchMove"
              >
                <v-btn
                  @click="loadMoreMove"
                  dark
                  :loading="loadMoreMoveLoading"
                  class="load-more"
                  >Load More Pokémon</v-btn
                >
              </div>
            </v-tab-item>
            <!-- Type -->
            <v-tab-item>
              <v-row>
                <v-col>
                  <v-chip
                    class="ma-2"
                    dark
                    v-for="t in types"
                    :key="t.typename"
                    :class="t.typeclass"
                    >{{ t.typename }}</v-chip
                  >
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-col>
    </v-row>
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
  name: "PokeGen",
  props: {
    msg: String
  },
  created() {
    this.getAllPokemons();
    this.getAllMoves();
    this.getAllTypes();
    this.getAllGenerations();
  },
  data: () => ({
    title: "Generation",
    pokemons: [],
    moves: [],
    types: [],
    generations: [],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
    initialLoading: true,
    loadMorePokemonLoading: false,
    loadMoreMoveLoading: false,
    limitPokemon: 20,
    limitMove: 100,
    nextBatchPokemon: null,
    nextBatchMove: null,
    fab: false,
    selectedGen: null
  }),
  methods: {
    /** Get all Pokemon */
    async getAllPokemons() {
      this.initialLoading = true;
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=" + this.limitPokemon
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
        this.nextBatchPokemon = res.data.next;
      }
      this.initialLoading = false;
    },
    /** Get all Moves */
    async getAllMoves() {
      this.initialLoading = true;
      const res = await axios.get(
        "https://pokeapi.co/api/v2/move/?offset=20&limit=" + this.limitMove
      );
      this.moves = res.data.results;
      if (res.data.next) {
        this.nextBatchMove = res.data.next;
      }
      this.initialLoading = false;
    },
    /** Get all Type */
    async getAllTypes() {
      const res = await axios.get("https://pokeapi.co/api/v2/type/");
      this.types = res.data.results;
      this.setTypesColor();
    },
    /** Loadmore Pokemon */
    async loadMorePokemon() {
      this.loadMorePokemonLoading = true;
      const res = await axios.get(this.nextBatchPokemon);
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
        this.nextBatchPokemon = res.data.next;
      }
      this.loadMorePokemonLoading = false;
    },
    /** Loadmore Moves */
    async loadMoreMove() {
      this.loadMoreMoveLoading = true;
      const res = await axios.get(this.nextBatchMove);
      const moves = res.data.results;
      this.moves = [...this.moves, ...moves];
      if (res.data.next) {
        this.nextBatchMove = res.data.next;
      }
      this.loadMoreMoveLoading = false;
    },
    async getAllGenerations() {
      const { data } = await axios.get("https://pokeapi.co/api/v2/generation/");
      this.generations = data.results;
      this.generations.unshift({ name: "All", url: "all" });
    },
    async viewPerGeneration() {
      function compare(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      if (this.selectedGen == "all") {
        this.getAllPokemons();
        this.getAllMoves();
        this.getAllTypes();
      } else {
        const { data } = await axios.get(this.selectedGen);
        const pokemonPerGeneration = data.pokemon_species.sort(compare);
        const pokemons = pokemonPerGeneration.map(item => {
          const id = item.url.split("/")[item.url.split("/").length - 2];
          return {
            ...item,
            id,
            imageUrl: `${this.imageUrl}${id}.png`
          };
        });
        this.pokemons = pokemons;
        this.moves = data.moves.sort(compare);
        this.types = data.types;
        this.setTypesColor();
      }
    },
    /** Setting Pokemon Type Color */
    setTypesColor() {
      const type = this.types.map(item => {
        const typename = item.name;
        const typeclass = "v-chip-" + item.name;
        return {
          typename,
          typeclass
        };
      });
      this.types = type;
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
