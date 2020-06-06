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
          vertical
      >
        <v-stepper-step
            :key="`1-step`"
            :complete="element > 1"
            step="1"
            editable
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
            editable
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
                      :color="color.main"
                  ></v-checkbox>
                  <v-checkbox
                      class="mt-0"
                      v-model="selfDestructing"
                      label="Self-destructing alert"
                      :color="color.main"
                  ></v-checkbox>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="mb-5">
              <v-expansion-panel-header>Schedule alert</v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="d-flex">
                  <v-switch v-model="ScheduleAlert" class="ma-4" label="Schedule alert" :color="color.main"></v-switch>
                </div>
                <div class="block-schedule" v-if="ScheduleAlert">
                  <v-card class="pattern">
                    <v-card-text>Pattern</v-card-text>
                    <v-divider></v-divider>
                    <v-card-text class="cart-radios" >
                      <v-radio-group class="mt-0" v-model="pattern" column >
                        <v-radio label="once" value="bahamas" :color="color.main"></v-radio>
                        <v-radio label="dayle" value="bahrain" :color="color.main"></v-radio>
                        <v-radio label="weekly" value="bangladesh" :color="color.main"></v-radio>
                        <v-radio label="mouthy" value="barbados" :color="color.main"></v-radio>
                        <v-radio label="yearly" value="belarus" :color="color.main"></v-radio>
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
                            :color="color.main"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="start"
                          no-title
                          scrollable
                          :color="color.main"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            :color="color.main"
                            @click="startMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            text
                            :color="color.main"
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
                            :color="color.main"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="end"
                          no-title
                          scrollable
                          :color="color.main"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            :color="color.main"
                            @click="endMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            text
                            :color="color.main"
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
                              :color="color.main"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                            v-model="time"
                            format="24hr"
                            :color="color.main"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text :color="color.main" @click="timeMenu = false">Cancel</v-btn>
                          <v-btn text :color="color.main" @click="$refs.timeMenu.save(time)">OK</v-btn>
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
            editable
            :color="color.main"
        >
          Step 3
        </v-stepper-step>

        <v-stepper-content
            :key="`3-content`"
            step="3"
        >
          <v-container
              fluid
              class="cart-send"
          >
            <v-row align="center">
              <v-col
                  cols="12"
                  md="4">
                <v-card class="cart-user">

                  <v-text-field
                      color="success"
                      :loading="loading.user"
                      prepend-icon="mdi-magnify"
                      label="Search"
                      v-model="search.users"
                      @input="getListUsers()"
                  >
                  </v-text-field>
                  <v-data-table
                      fixed-header
                      height="450px"
                      v-model="selected.users"
                      :headers="headers.users"
                      :items="senders.users"
                      item-key="user_id"
                      show-select
                      class="elevation-1 mb-2"
                      hide-default-footer
                      :items-per-page="pageable.maxItems"
                  >
                    <template v-slot:item.online="{ item }">
                      <v-icon :color="getColor(item.online)">mdi-contactless-payment</v-icon>
                    </template>
                  </v-data-table>
                  <div class="text-center">
                    <v-pagination
                        v-model="pageable.pageUser"
                        circle
                        :page="pageable.pageUser"
                        :length="optionalPageUser.lengthPage"
                        :total-visible="optionalPageUser.totalVisiblePage"
                        :color="color.main"
                        @input="getListUsers"
                    ></v-pagination>
                  </div>

                </v-card>
              </v-col>
              <v-col
                  cols="12"
                  md="4">
                <v-card class="cart-group">

                  <v-text-field
                      color="success"
                      :loading="loading.group"
                      prepend-icon="mdi-magnify"
                      label="Search"
                      v-model="search.groups"
                      @input="getListGroups()"
                  ></v-text-field>
                  <v-data-table
                      fixed-header
                      height="450px"
                      v-model="selected.groups"
                      :headers="headers.groups"
                      :items="senders.groups"
                      item-key="group_id"
                      show-select
                      class="elevation-1 mb-2"
                      hide-default-footer
                      :items-per-page="pageable.maxItems"
                  >
                  </v-data-table>
                  <div class="text-center">
                    <v-pagination
                        v-model="pageable.pageGroup"
                        circle
                        :page="pageable.pageGroup"
                        :length="optionalPageGroup.lengthPage"
                        :total-visible="optionalPageGroup.totalVisiblePage"
                        :color="color.main"
                        @input="getListGroups"
                    ></v-pagination>
                  </div>

                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <v-btn class="continue btn send"
                 :color="color.main"
                 @click="saveAndSendAlert"
          >Send</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </div>
  </v-container>
</template>

<script>
import { mainColorTheme, modelAlert, toolbarOptions, setAlert} from "../utils/consts"
import { quillEditor } from 'vue-quill-editor'
import hljs from "highlight.js"
import dedent from 'dedent'
import axios from "axios";

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
      hidePriority: this.hidePriority,
      selfDestructing: this.selfDestructing,
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
      textCode: dedent`<p><br></p>>`,
      optionalPageUser: {
        totalVisiblePage: 7,
        lengthPage: 5,
      },
      optionalPageGroup: {
        totalVisiblePage: 4,
        lengthPage: 2,
      },
      loading: {
        user: true,
        group: true
      },
      pageable: {
        maxItems: 20,
        pageGroup: 1,
        pageUser: 1,
      },
      senders: {
        users: [],
        groups: []
      },
      search: {
        users: "",
        groups: ""
      },
      selected: {
        users: [],
        groups: []
      },
      headers: {
        users: [{
          text: 'Display name',
          align: 'start',
          sortable: true,
          value: 'display_name',
        },
          { text: 'Name', value: 'login' },
          { text: 'Online', value: 'online' }],
        groups: [{
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
          { text: 'ID', value: 'group_id' }]
      },
      singleSelect: true,
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
    createQueryParam( limit, page, search) {
      if(search !== "")
        return "?per="+limit+"&page="+page+"&like="+search+"&pol=1"
      return "?per="+limit+"&page="+page+"&pol=1"
    },
    getListUsers() {
      this.loading.user = true
      this.$store.dispatch("getListUsers", this.createQueryParam(this.pageable.maxItems,this.pageable.pageUser, this.search.users))
      .then(() => {
        const onlinelist = ["rostic", "ping", "kirill", "admin"]
        this.senders.users = this.$store.getters.listUsers.list.map(v => Object.assign(v, { online: onlinelist.includes(v.login) }))
        this.optionalPageUser.lengthPage = this.$store.getters.listUsers.pages
        this.loading.user = false
      })
    },
    getListGroups() {
      this.loading.group = true
      this.$store.dispatch("getListGroups", this.createQueryParam(this.pageable.maxItems,this.pageable.pageGroup, this.search.groups))
        .then(() => {
          this.senders.groups = this.$store.getters.listGroup.list
          this.optionalPageGroup.lengthPage = this.$store.getters.listGroup.pages
          this.loading.group = false
        })
    },
    saveAndSendAlert() {
      this.saveAlert().then(alertId => {
        this.sendAlert(alertId)
        this.$router.push("/")
      })
    },
    saveAlert() {
      const alert = modelAlert
      alert.alert.content = this.content
      alert.alert.title = "title"
      alert.alert.create_id = this.$store.getters.getUserId
      alert.alert_settings.priority = false
      alert.alert_settings.unobtrusive = false
      alert.schedule_alert.schedule = this.ScheduleAlert
      alert.schedule_alert.pattern = 1
      alert.type = 1
      // eslint-disable-next-line no-console
      console.log("SAVE",alert)
      return axios.post("/api/alerts/save", alert)
        .then(res => {
          // eslint-disable-next-line no-console
          console.log("SUCCESS SAVE",res.status,res.data)
          return res.data.alert_id
        })
        .catch(err => {
          throw err
        })
    },
    sendAlert(id) {
      const alert = setAlert
      alert.alert_id = id
      alert.sender_id = this.$store.getters.getUserId
      alert.groupList = this.selected.groups.map(group => parseInt(group.group_id, 10))
      alert.userList = this.selected.users.map(user => user.user_id)
      // eslint-disable-next-line no-console
      console.log("SEND",alert)
      axios.post("/api/alerts/send", alert)
        .then(res => {
          // eslint-disable-next-line no-console
          console.log("SEND")
          // eslint-disable-next-line no-console
          console.log("SUCCESS SEND",res.status)
        })
        .catch(err => {
          throw err
        })
    },
    getColor: (online) => online ? 'green' : 'grey'
  },
  computed: {
    contentCode() {
      return hljs.highlightAuto(this.content).value
    }
  },
  mounted() {
  },
  created: function () {
    this.getListUsers()
    this.getListGroups()
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
.cart-user {
  margin: 10px;
  height: 600px;
  width: 600px;
  padding: 16px;
}
.cart-group {
  margin: 10px;
  height: 600px;
  width: 400px;
  padding: 16px;
}
.cart-send {
  width: 100%;
}
</style>