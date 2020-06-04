<template>
  <v-container>
    <div>
      <!--        <v-row justify="space-around">-->
      <!--          <v-col cols="12">-->
      <!--            <v-slider v-model="steps" label="Steps" min="2" max="20"></v-slider>-->
      <!--          </v-col>-->
      <!--          <v-switch v-model="vertical" label="Vertical"></v-switch>-->
      <!--        </v-row>-->
      <v-dialog
          v-model="dialogErrorStep1"
          max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Fields empty?</v-card-title>
          <v-card-text>
            Check pls your fields!
          </v-card-text>
<!--          <v-card-actions>-->
<!--            <v-spacer></v-spacer>-->
<!--            <v-btn-->
<!--                color="green darken-1"-->
<!--                text-->
<!--                @click="dialog = false"-->
<!--            >-->
<!--              Disagree-->
<!--            </v-btn>-->
<!--            <v-btn-->
<!--                color="green darken-1"-->
<!--                text-->
<!--                @click="dialog = false"-->
<!--            >-->
<!--              Agree-->
<!--            </v-btn>-->
<!--          </v-card-actions>-->
        </v-card>
      </v-dialog>
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
              class="mb-5 cart-editor"
          >
            <quill-editor
                class="editor"
                :value="content"
                :options="editorOption"
                @change="onEditorChange"
            />
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>HTML code</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <code class="hljs" v-html="contentCode"></code>
                  <v-textarea
                      label="code"
                      placeholder="Placeholder"
                      outlined
                      v-model="textCode"
                  ></v-textarea>
                  <v-btn class="continue btn"
                         :color="color.main"
                         @click="saveCode"
                  >
                    Save
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>

          <v-btn class="continue btn"
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
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>Alert settings</v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="panel-priority-alert">
                  <v-checkbox
                      v-model="hidePriority"
                      label="Hide Priority"
                  ></v-checkbox>
                  <v-checkbox
                      class="mt-0"
                      v-model="selfDestructing"
                      label="Self-destructing alert"
                  ></v-checkbox>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="mb-5">
              <v-expansion-panel-header>Schedule alert</v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="d-flex">
                  <v-checkbox
                      v-model="ScheduleAlert"
                      label="Schedule alert"
                  ></v-checkbox>
                </div>
                <div class="block-schedule" v-if="ScheduleAlert">
                  <v-card class="pattern">
                    <v-card-text>Pattern</v-card-text>
                    <v-divider></v-divider>
                    <v-card-text class="cart-radios" >
                      <v-radio-group class="mt-0" v-model="pattern" column>
                        <v-radio label="once" value="bahamas"></v-radio>
                        <v-radio label="dayle" value="bahrain"></v-radio>
                        <v-radio label="weekly" value="bangladesh"></v-radio>
                        <v-radio label="mouthy" value="barbados"></v-radio>
                        <v-radio label="yearly" value="belarus"></v-radio>
                      </v-radio-group>
                    </v-card-text>
                    <v-divider></v-divider>
                  </v-card>
                  <v-card class="option">
                    <v-card-text>Option</v-card-text>
                    <v-divider></v-divider>
                    <v-card-text class="cart-data" >
                    <v-menu
                        ref="startMenu"
                        v-model="startMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="start"
                        transition="scale-transition"
                        min-width="290px"
                        offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="start"
                            class="mt-3"
                            label="Start Date"
                            prepend-icon="mdi-calendar"
                            dense
                            readonly
                            outlined
                            hide-details
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="start"
                          no-title
                          scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="startMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.startMenu.save(start)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-menu
                        ref="endMenu"
                        v-model="endMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="end"
                        transition="scale-transition"
                        min-width="290px"
                        offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="end"
                            class="mt-3"
                            label="End Date"
                            prepend-icon="mdi-calendar"
                            dense
                            readonly
                            outlined
                            hide-details
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="end"
                          no-title
                          scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="endMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.endMenu.save(end)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                      <v-menu
                          ref="timeMenu"
                          v-model="timeMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="time"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                              v-model="time"
                              label="Time"
                              prepend-icon="mdi-clock"
                              class="mt-3"
                              dense
                              readonly
                              outlined
                              hide-details
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                            v-model="time"
                            format="24hr"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="timeMenu = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.timeMenu.save(time)">OK</v-btn>
                        </v-time-picker>
                      </v-menu>
                    </v-card-text>
                  </v-card>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-btn class="continue btn"
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
import { toolbarOptions } from "../utils/consts"
import { quillEditor } from 'vue-quill-editor'
import hljs from "highlight.js"
import dedent from 'dedent'

export default {
  name: "CreateAlert",
  title: "Theme: snow",
  components: {
    quillEditor
  },
  data() {
    return {
      element: 1,
      steps: 3,
      dialogErrorStep1: false,
      color: {
        background: mainColorTheme.background,
        main: mainColorTheme.main,
        dark: mainColorTheme.dark,
        light: mainColorTheme.light,
      },
      hidePriority: false,
      selfDestructing: false,
      ScheduleAlert: false,
      startMenu: false,
      start: "2020-01-12",
      endMenu: false,
      end: "2020-01-27",
      timeMenu: false,
      time: null,
      editorOption: {
        modules: {
          toolbar: toolbarOptions,
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
      content: dedent`<span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am snow example! </span></h1><p><br>`,
      textCode: dedent`<p><br></p>>`
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
      if(this.content !== ""){
        this.dialogErrorStep1 = false
      if (n === this.steps) {
        this.element = 1
      } else {
        this.element = n + 1
      }} else {
        this.dialogErrorStep1 = true
      }
    },
    onEditorChange(value) {
      this.content = value.html
    },
    onHtmlChange(value) {
      this.content = value
    },
    saveCode(){
      this.content = this.textCode
    },
  },
  computed: {
    contentCode() {
      return hljs.highlightAuto(this.content).value
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
@import "../../node_modules/highlight.js/styles/tomorrow.css";
@import "../../node_modules/quill/dist/quill.core.css";
@import "../../node_modules/quill/dist/quill.snow.css";
@import "../style/overlaid.style.css";
.continue.btn {
  color: white;
}
.cart-editor {
  display: flex;
  flex-direction: column;
}
.editor {
  height: 400px;
  overflow: hidden;
}
code {
  width: 100%;
  /*height: 200px;*/
  margin: 5px;
  border: 1px solid #ccc;
  overflow-y: auto;
  resize: vertical;
}
.panel-priority-alert {
  display: flex;
  flex-direction: column;
}
.block-schedule {
  display: flex;
  flex-direction: row;
}
.block-schedule .pattern {
  margin-right: 50px;
}
.cart-radios {
  height: 200px;
  width: 200px;
}

</style>