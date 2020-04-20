<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="teal--text text--accent-4">
          <v-list-item v-for="item in items" :key="item.icon" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Pokémon</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
    <v-footer padless dark dense>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }}
        © All rights reserved. Made with ❤️ by
        <strong>
          <a :href="gitHub" target="_blank">Zekinah Lecaros</a>
        </strong>
        .
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: "Home", icon: "mdi-view-dashboard", link: "/" },
        { title: "Pokémon List", icon: "mdi-pokeball", link: "/pokemon-list" },
        { title: "Generation", icon: "mdi-view-comfy", link: "#" },
        { title: "Types", icon: "mdi-format-list-bulleted-type", link: "#" },
        { title: "Region", icon: "mdi-pokemon-go", link: "#" },
        { title: "About", icon: "mdi-help-box", link: "/about" }
      ],
      activeBtn: 1,
      gitHub: "//github.com/zekinah/"
    };
  },
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Teko:600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@500&display=swap");

$body-font-family: "Baloo Bhaina 2";
$title-font: "Teko";
.v-application {
  font-family: $body-font-family, cursive !important;
  .title {
    font-family: $body-font-family, cursive !important;
  }
}
#app {
  font-family: $body-font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(1deg, #152d2c 0%, #37ce8a 100%);
  background-size: cover;
  background-repeat: no-repeat;
  color: #ffffff;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.v-application a {
  text-decoration: none;
  color: #37ce8a !important;
}

header.v-sheet.v-app-bar {
  border-bottom-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
}

.v-card.v-card--hover {
  border-radius: 20px !important;
}

.v-card {
  background-color: #ffffff5e !important;
  border-color: transparent !important;
}

.v-dialog {
  background: linear-gradient(1deg, #152d2c 0%, #37ce8a 100%);
  border-top-left-radius: 35px !important;
  border-top-right-radius: 35px !important;
}
h1 {
  color: #ffffff;
  text-align: center;
}

header.v-sheet.v-sheet--tile.theme--dark {
  background-color: #003459 !important;
  border-color: transparent !important;
}

button.v-btn.load-more {
  background: linear-gradient(0.31deg, #983639 0.7%, #ff686b 99.3%);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

footer.v-footer {
  background: linear-gradient(90deg, #152d2c 0%, #707070 100%);
}

/** Type of Pokemon Color */
.v-chip-bug {
  background: #a8b820 !important;
}
.v-chip-dark {
  background: #705848 !important;
}
.v-chip-dragon {
  background: #7038f8 !important;
}
.v-chip-electric {
  background: #f8d030 !important;
}
.v-chip-fairy {
  background: #ee99ac !important;
}
.v-chip-fighting {
  background: #c03028 !important;
}
.v-chip-fire {
  background: #f08030 !important;
}
.v-chip-flying {
  background: #a890f0 !important;
}
.v-chip-ghost {
  background: #705898 !important;
}
.v-chip-grass {
  background: #78c850 !important;
}
.v-chip-ground {
  background: #e0c068 !important;
}
.v-chip-ice {
  background: #98d8d8 !important;
}
.v-chip-normal {
  background: #a8a878 !important;
}
.v-chip-poison {
  background: #a040a0 !important;
}
.v-chip-psychic {
  background: #f85888 !important;
}
.v-chip-rock {
  background: #b8a038 !important;
}
.v-chip-steel {
  background: #b8b8d0 !important;
}
.v-chip-water {
  background: #6890f0 !important;
}
.v-chip-unknown {
  background: #68a090 !important;
}
</style>
