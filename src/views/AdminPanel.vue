<template>
    <div id="app">
        <v-app id="inspire">
            <v-container>
                <v-card
                        height="600"
                >
                    <v-navigation-drawer
                            v-model="drawer"
                            :color="color"
                            :expand-on-hover="expandOnHover"
                            :mini-variant="miniVariant"
                            absolute
                            dark
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
                </v-card>
            </v-container>
        </v-app>
    </div>
</template>

<script>
    export default {
        name: "Navigation",
        data () {
            return {
                drawer: true,
                items: [
                    { title: 'Dashboard', icon: 'mdi-view-dashboard' },
                    { title: 'Photos', icon: 'mdi-image' },
                    { title: 'About', icon: 'mdi-help-box' },
                ],
                right: false,
                expandOnHover: true,
                color: "success"

            }
        },
        computed: {  }
    }
</script>

<style scoped>

</style>