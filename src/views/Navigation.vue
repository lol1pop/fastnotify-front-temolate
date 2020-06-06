<template>
  <v-app>
    <v-app-bar
        app
        :color="color.main"
        dark
        clipped-left
        v-if="showInterface"
    >
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            :src="require('../assets/logo.png')"
            transition="scale-transition"
            width="40"
        />
        <span class="shrink mt-1 hidden-sm-and-down">Fast<span
            class="font-weight-light">Notify</span></span>
      </div>
      <v-spacer/>
      <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
        app
        dark
        v-model="primaryDrawer.drawer"
        :color="color.main"
        :expand-on-hover="primaryDrawer.expandOnHover"
        :mini-variant="primaryDrawer.miniVariant"
        :clipped="primaryDrawer.clipped"
        v-if="showInterface"
    >
      <v-list
          dense
          nav
      >
        <template v-for="(item, i) in items">
          <v-row
              v-if="item.heading"
              :key="i"
              align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
                cols="6"
                class="text-right"
            >
              <v-btn
                  small
                  text
              >edit
              </v-btn>
            </v-col>
          </v-row>
          <v-divider
              v-else-if="item.divider"
              :key="i"
              dark
              class="my-4"
          />
          <v-list-item
              v-else
              :key="i"
              :href="item.link"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container>
        <v-fade-transition mode="out-in">
          <router-view/>
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import { mainColorTheme } from "../utils/consts"

export default {
  name: "Nav",
  components: {},
  computed: {
    showInterface() {
      return this.$route.path !== "/login"
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log("router", this.$route)
  },
  data: () => ({
    items: [
      {text: "Create alert", icon: "mdi-application", link: "/created-alert"},
      {text: "Send alert", icon: "mdi-application-export", link: "/send-alert"},
      {text: "Draft alert", icon: "mdi-inbox-arrow-down-outline"},
      {text: "Template alert", icon: "mdi-animation-outline"},
      {divider: true},
      {text: "Surveys alert", icon: "mdi-ballot-outline"},
      {divider: true},
      {text: "Publishers List", icon: "mdi-account-tie-voice-outline"},
      {text: "Policies", icon: "mdi-account-badge-alert-outline"},
      {divider: true},
      {text: "Reports", icon: "mdi-chart-bell-curve-cumulative"},
      {text: "Help", icon: "mdi-help"},
      {divider: true},
    ],
    primaryDrawer: {
      drawer: true,
      model: null,
      type: "default (no property)",
      clipped: true,
      right: false,
      expandOnHover: true,
      miniVariant: true,
    },
    color: {
      background: mainColorTheme.background,
      main: mainColorTheme.main,
      dark: mainColorTheme.dark,
      light: mainColorTheme.light,
    },
  }),
  created() {
    this.$store.dispatch("checkLogged")
  }
}
</script>

<style>
.shrink.mt-1.hidden-sm-and-down {
  font-size: 27px;
  font-family: "Fira Code Retina";
}
</style>