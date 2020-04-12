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
        <span class="headline text-capitalize">{{ detail.name }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div class="d-flex flex-column align-center">
          <v-img
            alt="Pokemon Logo"
            contain
            :src="detail.image"
            transition="scale-transition"
            width="200"
          />
        </div>
        <div class="cart-details">
          <div
            class="d-flex justify-space-between body-1 font-weight-bold border-bottom"
          >
            <span>Base Experience</span>
            <span>{{ detail.base_experience }} XP</span>
          </div>
          <div
            class="d-flex justify-space-between body-1 font-weight-bold border-bottom mt-3"
          >
            <span>Height</span>
            <span>{{ detail.height }} dm</span>
          </div>
          <div
            class="d-flex justify-space-between body-1 font-weight-bold border-bottom mt-3"
          >
            <span>Weight</span>
            <span>{{ detail.weight }} hg</span>
          </div>
          <div class="body-1 font-weight-bold mt-3">Types</div>
          <v-chip
            class="mr-2"
            color="primary"
            small
            v-for="t in detail.types"
            :key="t.type.name"
            >{{ t.type.name }}</v-chip
          >
          <div class="body-1 font-weight-bold mt-3">Abilities</div>
          <v-chip
            class="mr-2"
            color="red"
            small
            dark
            v-for="a in detail.abilities"
            :key="a.ability.name"
            >{{ a.ability.name }}</v-chip
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "PokeInfo",
  data: () => ({
    dialog: false,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
    detail: []
  }),
  methods: {
    viewPokemon(data) {
      this.detail = {
        ...data,
        image: `${this.imageUrl}${data.id}.png`
      };

      this.dialog = true;
    }
  }
};
</script>

<style></style>
