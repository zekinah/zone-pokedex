<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <v-row>
      <v-col
        v-for="card of cardsOption"
        :key="card.title"
        cols="12"
        sm="12"
        md="4"
        lg="4"
      >
        <v-card hover dark :to="card.link">
          <v-card-text class="d-flex flex-column align-center">
            <span class="text-capitalize">{{ card.title }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: () => ({
    cardsOption: [
      { title: "Home", icon: "mdi-view-dashboard", link: "/" },
      { title: "Pokémon List", icon: "mdi-pokeball", link: "/pokemon-list" },
      { title: "Generation", icon: "mdi-view-comfy", link: "#" },
      {
        title: "Types",
        icon: "mdi-format-list-bulleted-type",
        link: "/pokemon-type"
      },
      { title: "Region", icon: "mdi-pokemon-go", link: "#" },
      { title: "About", icon: "mdi-help-box", link: "/about" }
    ]
  })
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
