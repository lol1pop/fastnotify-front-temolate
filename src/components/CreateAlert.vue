<template>
  <v-container>
    <div>
      <!--        <v-row justify="space-around">-->
      <!--          <v-col cols="12">-->
      <!--            <v-slider v-model="steps" label="Steps" min="2" max="20"></v-slider>-->
      <!--          </v-col>-->
      <!--          <v-switch v-model="vertical" label="Vertical"></v-switch>-->
      <!--        </v-row>-->
      <v-stepper
          v-model="element"
          vertical="true"
      >
        <v-stepper-step
            :key="`1-step`"
            :complete="element > 1"
            step="1"
            editable="true"
            :color="color.main"
        >
          Step 1
        </v-stepper-step>

        <v-stepper-content
            :key="`1-content`"
            step="1"
        >
          <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
          ></v-card>

          <v-btn
              :color="color.main"
              @click="nextStep(1)"
          >
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step
            :key="`2-step`"
            :complete="element > 2"
            step="2"
            editable="true"
            :color="color.main"
        >
          Step 2
        </v-stepper-step>

        <v-stepper-content
            :key="`2-content`"
            step="2"
        >
          <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
          ></v-card>

          <v-btn
              :color="color.main"
              @click="nextStep(2)"
          >
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step
            :key="`3-step`"
            :complete="element > 3"
            step="3"
            editable="true"
            :color="color.main"
        >
          Step 3
        </v-stepper-step>

        <v-stepper-content
            :key="`3-content`"
            step="3"
        >
          <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
          ></v-card>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </div>
  </v-container>
</template>

<script>
import { mainColorTheme } from "../utils/consts"

export default {
  name: "CreateAlert",
  data() {
    return {
      element: 1,
      steps: 3,
      color: {
        background: mainColorTheme.background,
        main: mainColorTheme.main,
        dark: mainColorTheme.dark,
        light: mainColorTheme.light,
      }
    }
  },
  watch: {
    steps(val) {
      if (this.element > val) {
        this.element = val
      }
    }
  },
  methods: {
    nextStep(n) {
      if (n === this.steps) {
        this.element = 1
      } else {
        this.element = n + 1
      }
    },
  },
}
</script>

<style scoped>

</style>