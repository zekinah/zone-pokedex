<template>
  <v-dialog
    max-width="400"
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title>
        <span class="pokemon-id text-capitalize">#{{ info.id }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div
          class="d-flex flex-column align-center"
          @mouseover="mouseHover = true"
          @mouseleave="mouseHover = false"
        >
          <v-img
            alt="Pokemon Logo"
            contain
            :src="info.imageDefault"
            transition="scale-transition"
            width="200"
            v-show="!mouseHover"
          />
          <v-img
            alt="Pokemon Logo"
            contain
            :src="info.imageBack"
            transition="scale-transition"
            width="200"
            v-show="mouseHover && info.imageBack"
          />
        </div>
        <div class="pokemon-info cart-infos">
          <div class="pokemon-name">
            <span class="title text-capitalize font-weight-black">{{
              info.name
            }}</span>
          </div>
          <div class="pokemon-description mt-3">
            <p class="font-weight-regular" v-if="dataSpecies">
              {{ description }}
            </p>
          </div>
          <div class="pokemon-data font-weight-medium mt-3">
            <div class="d-flex justify-space-between body-1 border-bottom">
              <span>Base Experience</span>
              <span>{{ info.base_experience }} XP</span>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between body-1 border-bottom mt-3">
              <span>Height</span>
              <span>{{ info.height }} dm</span>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between body-1 border-bottom mt-3">
              <span>Weight</span>
              <span>{{ info.weight }} hg</span>
            </div>
            <v-divider></v-divider>
            <div class="body-1 mt-3">Types</div>
            <v-chip
              class="ma-2 chip-type"
              color="primary"
              small
              v-for="t in info.types"
              :key="t.type.name"
              >{{ t.type.name }}</v-chip
            >
            <v-divider></v-divider>
            <div class="body-1 mt-3">Abilities</div>
            <v-chip
              class="ma-2 chip-ability"
              color="red"
              small
              dark
              v-for="a in info.abilities"
              :key="a.ability.name"
              >{{ a.ability.name }}</v-chip
            >
            <v-divider></v-divider>
            <div class="body-1 mt-3">Moves</div>
            <v-chip
              class="ma-2 chip-moves"
              color="pink lighten-3"
              small
              dark
              v-for="m in info.moves"
              :key="m.move.name"
              >{{ m.move.name }}</v-chip
            >
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  name: "PokeInfo",
  data: () => ({
    dialog: false,
    imageDefaultUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
    imageBackUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/",
    mouseHover: false,
    info: [],
    dataSpecies: [],
    description: ""
  }),
  methods: {
    viewPokemon(data) {
      this.info = {
        ...data,
        imageDefault: `${this.imageDefaultUrl}${data.id}.png`,
        imageBack: `${this.imageBackUrl}${data.id}.png`
      };
      this.dialog = true;
      this.getSpecies(data.id);
    },
    async getSpecies(id) {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon-species/" + id
      );
      this.dataSpecies = data.flavor_text_entries;
      const desc = this.dataSpecies.map(item => {
        const lang = item.language.name == "en" ? item.flavor_text : "";
        return {
          lang
        };
      });
      /** Filtered Object by removing null value*/
      // const filtered = desc.filter(function (el) {
      //   return el.lang != null;
      // });
      /** Distinct the Value of Object */
      const distinct = [
        ...new Map(desc.map(item => [item.lang, item])).values()
      ];
      var txt = "",
        d;
      for (d in distinct) {
        txt += distinct[d].lang + " ";
      }
      this.description = txt;
    }
  }
};
</script>

<style scoped lang="scss">
span.pokemon-id {
  font-size: 30px;
  opacity: 0.5;
}
div.pokemon-name {
  text-align: center;
}
div.pokemon-info.cart-infos {
  background: #fff;
  padding: 15px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
}
.v-card__text {
  padding: 0 !important;
}
</style>
