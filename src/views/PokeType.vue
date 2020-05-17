<template>
  <div class="poketype">
    <h1>{{ title }}</h1>
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col class="subtitle-1 text-center" cols="12">
        <v-card dark>
          <v-card-text class="d-flex flex-column align-center text-capitalize">
            <v-radio-group v-model="typename" :mandatory="false" row>
              <v-radio
                v-for="t of types"
                :key="t.name"
                :label="t.name"
                :value="t.name"
                @change="viewPerType(t.url)"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col class="subtitle-1" cols="12">
        <h2 class="text-center text-capitalize">{{ typename || null }}</h2>
        <v-card dark>
          <v-card-text class="d-flex flex-column align-center text-capitalize">
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "poketype",
  data: () => ({
    title: "Pokemon Types",
    types: [],
    typename: "",
    damageRelation: [],
    moveDamageClass: [],
    moves: [],
    pokemons: [],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
  }),
  created() {
    this.getTypesPokemon();
  },
  methods: {
    /** Get Types of Pokemon */
    async getTypesPokemon() {
      const { data } = await axios.get("https://pokeapi.co/api/v2/type");
      this.types = data.results;
    },
    async viewPerType(url) {
      const { data } = await axios.get(url);
      this.damageRelation = data.damage_relations;
      this.moveDamageClass = data.move_damage_class;
      this.moves = data.moves;
      this.pokemons = data.pokemon;
    }
  }
};
</script>
