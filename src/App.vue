<template>
  <div id="app">
     <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
     <v-navigation />
  </div>
</template>

<script>
import vNavigation from "@/views/Navigation"
export default {
  name: 'app',
  components: {
    vNavigation
  }
}
</script>