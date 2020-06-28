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
            v-show="mouseHover"
          />
        </div>
        <div class="pokemon-info cart-infos">
          <div class="pokemon-name">
            <p class="headline text-capitalize font-weight-black">
              {{ info.name }}
            </p>
          </div>
          <div class="pokemon-type text-center">
            <v-chip
              class="ma-2"
              dark
              v-for="t in pokeTypes"
              :key="t.typename"
              :class="t.typeclass"
              >{{ t.typename }}</v-chip
            >
          </div>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" lg="12">
                <div class="pokemon-stats my-4">
                  <div
                    class="pokemon-data font-weight-medium mt-3"
                    v-for="st in info.stats"
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
              </v-col>
              <v-col cols="12" sm="12" lg="12">
                <v-row justify="center">
                  <v-tabs class="title font-weight-medium">
                    <v-tab>Information</v-tab>
                    <v-tab>Profile</v-tab>
                    <v-tab>Moves</v-tab>
                    <!--Information-->
                    <v-tab-item>
                      <v-card flat>
                        <v-card-text>
                          <div class="pokemon-description mt-3">
                            <p class="body-2" v-if="dataSpecies">
                              {{ pokeDescription }}
                            </p>
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-tab-item>
                    <!--Profile-->
                    <v-tab-item>
                      <v-card flat>
                        <v-card-text>
                          <div class="pokemon-data font-weight-medium mt-3">
                            <div
                              class="d-flex justify-space-between body-1 border-bottom"
                            >
                              <span>Base Experience</span>
                              <span>{{ info.base_experience }} XP</span>
                            </div>
                            <v-divider></v-divider>
                            <div
                              class="d-flex justify-space-between body-1 border-bottom mt-3"
                            >
                              <span>Height</span>
                              <span>{{ info.height }} dm</span>
                            </div>
                            <v-divider></v-divider>
                            <div
                              class="d-flex justify-space-between body-1 border-bottom mt-3"
                            >
                              <span>Weight</span>
                              <span>{{ info.weight }} hg</span>
                            </div>
                            <v-divider></v-divider>
                            <div class="body-1 mt-3">Abilities</div>
                            <v-chip
                              class="ma-2 chip-ability"
                              color="red"
                              dark
                              v-for="a in info.abilities"
                              :key="a.ability.name"
                              >{{ a.ability.name }}</v-chip
                            >
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-tab-item>
                    <!--Moves-->
                    <v-tab-item>
                      <v-card flat>
                        <v-card-text>
                          <v-chip
                            class="ma-2 chip-moves"
                            color="blue-grey darken-4"
                            dark
                            v-for="m in info.moves"
                            :key="m.move.name"
                            >{{ m.move.name }}</v-chip
                          >
                        </v-card-text>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
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
    pokeDescription: "",
    pokeTypes: []
  }),
  methods: {
    viewPokemon(data) {
      var imageGetFront = this.imageDefaultUrl + "" + data.id + ".png";
      var imageGetBack = this.imageBackUrl + "" + data.id + ".png";
      let imageBackPath = this.urlExists(imageGetBack, imageGetFront);
      this.info = {
        ...data,
        imageDefault: imageGetFront,
        imageBack: imageBackPath
      };
      this.dialog = true;
      this.getSpecies(data.id);
      this.setTypesColor(this.info.types);
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
      this.pokeDescription = txt;
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
    /** Check if the image exists */
    urlExists(imageGetBack, imageGetFront) {
      try {
        var http = new XMLHttpRequest();
        http.open("HEAD", imageGetBack, false);
        http.send();
        return http.status != 404 ? imageGetBack : imageGetFront;
      } catch (error) {
        // console.error(error);
      }
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
