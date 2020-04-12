<template>
  <v-card hover @click="$emit('VIEW_POKEMON', data.id)" dark>
    <v-card-text class="d-flex flex-column align-center">
      <v-img
        :alt="data.name"
        contain
        :src="data.imageUrl"
        transition="scale-transition"
        width="120"
      />
      <span class="title text-capitalize">{{ data.name }}</span>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "PokeCard",
  props: ["data"]
};
</script>
