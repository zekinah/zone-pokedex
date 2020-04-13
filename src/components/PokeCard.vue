<template>
  <v-card hover @click="$emit('VIEW_POKEMON', data.id)" dark>
    <v-card-text class="d-flex flex-column align-center">
      <span class="pokemon-id text-capitalize">#{{ data.id }}</span>
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

<style scoped lang="scss">
span.pokemon-id {
  display: block;
  position: absolute;
  font-size: 90px;
  height: 100%;
  width: 100%;
  right: 20px;
  text-align: right;
  top: 50px;
  opacity: 0.5;
}
</style>
