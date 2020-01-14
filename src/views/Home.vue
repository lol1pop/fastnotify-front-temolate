<template>
    <v-app>
        <v-container>
            <v-app-bar
                    app
                    color="success"
                    dark
                    clipped-left
            >
                <div class="d-flex align-center">
                    <v-img
                            alt="Vuetify Logo"
                            class="shrink mr-2"
                            contain
                            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                            transition="scale-transition"
                            width="40"
                    />
                    <v-img
                            alt="Vuetify Name"
                            class="shrink mt-1 hidden-sm-and-down"
                            contain
                            min-width="100"
                            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                            width="100"
                    />
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
                    v-model="drawer"
                    :color="color"
                    :expand-on-hover="expandOnHover"
                    :mini-variant="miniVariant"
                    dark
                    clipped
            >
                <v-list
                        dense
                        nav
                >
                    <v-divider/>

                    <v-list-item
                            v-for="item in items"
                            :key="item.title"
                            link
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-content>
                <v-card>
                    <router-view/>
                </v-card>
            </v-content>
        </v-container>
    </v-app>
</template>


<script>

  export default {
    name: "Home",

    components: {},

    data: () => ({
      drawer: true,
      items: [
        {title: "Dashboard", icon: "mdi-view-dashboard"},
        {title: "Photos", icon: "mdi-image"},
        {title: "About", icon: "mdi-help-box"},
      ],
      right: false,
      expandOnHover: true,
      color: "success",
    }),
  }
</script>