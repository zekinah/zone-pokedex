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
        { title: "Pokémon List", icon: "mdi-image", link: "/pokemon-list" },
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
</style>
