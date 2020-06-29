<template>
  <div class="homepage">
    <h1>{{ msg }}</h1>
    <v-row class="fill-height">
      <v-col cols="12">
        <v-card class="d-flex flex-column">
          <v-row class="fill-height">
            <v-col cols="12" lg="6" md="6" sm="12">
              <v-card class="d-flex flex-column align-center ml-3 mr-3">
                <v-img
                  :alt="pokemon.name"
                  contain
                  :src="pokemon.image"
                  transition="scale-transition"
                  width="500"
                />
              </v-card>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="12">
              <div class="top_card">
                <v-btn class="float-right" icon dark @click="getPokemon">
                  <v-icon>mdi-reload</v-icon>
                </v-btn>
              </div>
              <div class="pokemon__details">
                <div class="mt-3 mr-4 ml-4">
                  <h2 class="h3 text-capitalize">
                    #{{ pokemon.id }} {{ pokemon.name }}
                  </h2>
                  <v-chip
                    class="ma-2"
                    dark
                    v-for="t in pokeTypes"
                    :key="t.typename"
                    :class="t.typeclass"
                    >{{ t.typename }}</v-chip
                  >
                  <div class="body-1">
                    <p>{{ pokeInformation }}</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="pokemon-stats my-4">
                    <p class="mt2 body-1">
                      <span class="text-capitalize">Height:</span>
                      {{ pokemon.height }} m
                      <span class="text-capitalize">Weight:</span>
                      {{ pokemon.weight }} Kg
                    </p>
                  </div>
                </div>
                <div class="pokemon-stats my-4">
                  <div
                    class="pokemon-data font-weight-medium mt-3 mr-4 ml-4"
                    v-for="st in pokemon.stats"
                    :key="st.stat.name + '-label'"
                  >
                    <div
                      class="d-flex justify-space-between body-1 border-bottom"
                    >
                      <span class="text-capitalize">{{ st.stat.name }}</span>
                      <span>{{ st.base_stat }}</span>
                    </div>
                    <v-divider></v-divider>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Homepage",
  props: {
    msg: String
  },
  data: () => ({
    pokemon: [],
    pokeTypes: [],
    pokeInformation: "",
    imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/",
    imageDefaultUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
  }),
  created() {
    this.getPokemon();
  },
  methods: {
    getPokemon() {
      let id = Math.floor(Math.random() * 800);
      this.getData(id);
      this.getSpecies(id);
    },
    /** View Specific Pokemon */
    async getData(id) {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + id
      );
      this.setTypesColor(data.types);
      let imageID = this.addZero(id);
      let animatedImage = this.imageUrl + "" + imageID + ".png";
      // let defaultImage = this.imageDefaultUrl + "" + id + ".png";
      // let animatedImage = urlExists(animatedImage, defaultImage)
      this.pokemon = {
        ...data,
        image: animatedImage
      };
    },
    setTypesColor(types) {
      const type = types.map(item => {
        const typename = item.type.name;
        const typeclass = "v-chip-" + item.type.name;
        return {
          typename,
          typeclass
        };
      });
      this.pokeTypes = type;
    },
    async getSpecies(id) {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon-species/" + id
      );
      const desc = data.flavor_text_entries.findIndex(item => {
        let lang =
          item.language.name === "en" && item.version.name === "ultra-sun";
        return {
          lang
        };
      });
      this.pokeInformation = data.flavor_text_entries[desc].flavor_text;
    },
    /** Check if the image exists */
    urlExists(animatedImage, defaultImage) {
      var http = new XMLHttpRequest();
      http.open("POST", animatedImage);
      http.withCredentials = true;
      http.setRequestHeader("Content-Type", "application/json");
      http.send({ request: "authentication token" });
      return http.status != 404 ? animatedImage : defaultImage;
    },
    /** Add Zero Before the one and two digit number */
    addZero(num) {
      return num.toString().padStart(3, "0");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.homepage .top_card {
  position: relative;
}

.homepage button.float-right {
  position: absolute;
  right: 5px;
  top: -10px;
}
.v-card {
  border-radius: 20px !important;
}
</style>
