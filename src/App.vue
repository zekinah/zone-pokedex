<template>
  <v-app dark>
    <div class="overflow-hidden">
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
        <!-- <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn> -->
      </v-app-bar>
      <v-container>
        <router-view />
      </v-container>
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
    </div>
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
        {
          title: "Generation",
          icon: "mdi-pokemon-go",
          link: "/pokemon-generation"
        },
        { title: "About", icon: "mdi-help-box", link: "/about" }
      ],
      activeBtn: 1,
      gitHub: "//github.com/zekinah/"
    };
  },
  metaInfo() {
    return { 
        title: "Zone Pokedex - a modern design pokedex",
        meta: [
            { name: 'description', content:  'Build for the pokemon lover and enthusiast. Made with ❤️ by Zekinah Lecaros '},
            { property: 'og:title', content: "Zone Pokedex - a modern design pokedex"},
            { property: 'og:site_name', content: 'Zone Pokedex'},
            { property: 'og:type', content: 'website'},    
            { name: 'robots', content: 'index,follow'} 
        ]
    }
  }
};
</script>
