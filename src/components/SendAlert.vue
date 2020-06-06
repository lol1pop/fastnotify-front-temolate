<template>
  <v-container>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-card-text>
      <v-text-field
          color="success"
          :loading="loading"
          prepend-icon="mdi-magnify"
          label="Search"
          v-model="searchAlert"
          @input="getListAlerts"
      >
      </v-text-field>
      <v-dialog v-model="dialogSend" max-width="900px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ "Selected senders" }}</span>
          </v-card-title>
          <v-container
              fluid
              class="cart-send"
          >
            <v-row align="center">
              <v-col
                  cols="7">
                <v-card class="cart-user">

                  <v-text-field
                      color="success"
                      :loading="loading2.user"
                      prepend-icon="mdi-magnify"
                      label="Search"
                      v-model="search.users"
                      @input="getListUsers"
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
                  cols="5">
                <v-card class="cart-group">

                  <v-text-field
                      color="success"
                      :loading="loading2.group"
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeSend">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Send</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ "Template view Alert" }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-card height="400px" >
                <div class="alert-header"></div>
                <v-row>
                  <v-col cols="7" class="pa-1 pl-4">
                    <v-img
                        class="white--text align-end"
                        height="50px"
                        max-width="200px"
                        contain
                        src="data:image/png;base64,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"
                    ></v-img>
                  </v-col>
                  <v-col cols="5" class="pa-0">
                    <v-card-subtitle class="pa-3">Create date: <br> {{ dateCreate() }}</v-card-subtitle>
                  </v-col>
                </v-row>
                <v-card-title
                  class="pa-2">
                  {{ viewItem.title }}
                </v-card-title>
                <v-card-text
                  class="pa-2 cart-show-editor"
                >
                  <quill-editor
                      class="editor"
                      :value="viewItem.contents"
                      :options="editorOption"
                      disabled
                      :scrollingContainer=true
                  />
                </v-card-text>
              </v-card>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="resendItem">Send</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-data-table
          :loading="loading" loading-text="Loading... Please wait"
          fixed-header
          hide-default-footer
          color="success"
          min-height="200px"
          v-model="selectedAlert"
          :headers="header"
          :items="listAlerts"
          item-key="alert_id"
          show-select
          class="elevation-1 mb-2"
          :items-per-page="pageableMaxItems"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
              :size="sizeIcon"
              color="success"
              @click="resendItem(item)"
          >
            mdi-autorenew
          </v-icon>
          <v-icon
              :size="sizeIcon"
              color="success"
              @click="stopOrStartItem(item)"
          >
            {{ item.sсheduled ? "mdi-play-circle" : "mdi-pause-circle"}}
          </v-icon>
          <v-icon
              :size="sizeIcon"
              color="success"
              @click="viewAlert(item)"
          >
            mdi-message-text-outline
          </v-icon>
        </template>
        <template v-slot:item.type="{ item }">
          <v-icon
              :size="sizeIcon"
              color="success">
            {{ iconType[item.type.toString()] }}
          </v-icon>
        </template>
        <template v-slot:item.sender="{ item }">
          <v-chip color="success" dark>
            <v-avatar left>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{ item.sender }}
          </v-chip>
        </template>
        <template v-slot:no-data>
          <v-btn class="del btn" :color="color.main" @click="getListAlerts">Reset</v-btn>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-row>
          <v-col
              cols="1"
          >
            <v-btn class="del btn" :color="color.main" @click="deleteItem">Delete</v-btn>
          </v-col>
          <v-col
              cols="1"
          >
            <v-combobox
                v-model="pageableMaxItems"
                :items="pageble"
                label="Items on page"
                outlined
                dense
            ></v-combobox>
          </v-col>
          <v-col
              cols="20"
          >
            <v-pagination
                :color="color.main"
                v-model="page"
                :page="page"
                :length="pageCount"
                :total-visible="20"
                @input="getListAlerts"
            ></v-pagination>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-container>
</template>

<script>
import { headersTableAlert, typeAlert, headersTableUserGroup } from "@/utils/hedars_table"
import { mainColorTheme, setAlert } from "@/utils/consts"
import axios from "axios";
import { quillEditor } from 'vue-quill-editor'
import hljs from "highlight.js"
import dedent from 'dedent'

export default {
  name: "SendAlert",
  components: {
    quillEditor
  },
  data() {
    return{
      overlay: false,
      dialog: false,
      dialogSend: false,
      loading: true,
      searchAlert: null,
      viewItem: {
        title: "",
        date_create: "2020-06-06T21:12:47.650Z"
      },
      selectedAlert: [],
      listAlerts: [],
      color: {
        background: mainColorTheme.background,
        main: mainColorTheme.main,
        dark: mainColorTheme.dark,
        light: mainColorTheme.light,
      },
      header: headersTableAlert,
      headers: headersTableUserGroup,
      iconType: typeAlert,
      sizeIcon: 30,
      pageble: [10,20,50,100,200],
      pageCount: 50,
      pageableMaxItems: 10,
      page: 1,
      editedIndex: -1,
      optionalPageUser: {
        totalVisiblePage: 4,
        lengthPage: 5,
      },
      optionalPageGroup: {
        totalVisiblePage: 4,
        lengthPage: 2,
      },
      selected: {
        users: [],
        groups: []
      },
      loading2: {
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
      editorOption: {
        modules: {
          toolbar: false,
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
      content: dedent`<p><br></p>>`
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    pageableMaxItems() {
      this.page = 1
      this.getListAlerts()
    }
  },
  methods: {
    getListAlerts() {
      this.loading = true
      const query = {
        per: this.pageableMaxItems,
        page: this.page,
        like: this.searchAlert
      }
      const count = 616
      return axios.get("/api/alerts/sent",{ params: query })
        .then(res => {
          this.listAlerts = res.data.list
          this.loading = false
          this.pageCount = Math.floor(count/this.pageableMaxItems)
        })
        .catch(err => {
          throw err
        })
    },
    getColor: (online) => online ? 'green' : 'grey',
    removeAlertFormListId(list) {
      const id = list[0]
      const subarray = list.splice(0, 1)
      axios.delete(`api/alerts/${id}`)
        .then(() => {
            this.removeAlertFormListId(subarray)
      }).catch( err => {
        this.overlay = false
        throw err
      })
    },
    deleteItem() {
      this.overlay = true
      //const alertId = this.selectedAlert.map(item => item.alert_id)
      //this.removeAlertFormListId(alertId)
      this.selectedAlert.forEach((alert) => {
        const indexDel = this.listAlerts.indexOf(alert)
        this.listAlerts.splice(indexDel,1)
      })
      //confirm('Are you sure you want to delete this item? ') && this.desserts.splice(index, 1)
      this.overlay = false
    },
    resendItem(item) {
      this.viewItem = item //Object.assign({}, item)
      this.dialogSend = true
      this.getListUsers()
      this.getListGroups()
    },
    stopOrStartItem(item) {
      !!item
    },
    viewAlert(item) {
      this.viewItem = item //Object.assign({}, item)
      this.dialog = true
    },
    save() {
      if (this.editedIndex > -1) {
       // Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
       // this.desserts.push(this.editedItem)
      }
      this.close()
    },
    closeSend() {
      this.dialogSend = false
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        //this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    createQueryParam( limit, page, search) {
      if(search !== "")
        return "?per="+limit+"&page="+page+"&like="+search+"&pol=1"
      return "?per="+limit+"&page="+page+"&pol=1"
    },
    getListUsers() {
      // const query = {
      //   per: this.pageable.maxItems,
      //   page: this.pageable.pageUser,
      //   like: this.search.users
      // }
      this.loading2.user = true
      this.$store.dispatch("getListUsers", this.createQueryParam(this.pageable.maxItems,this.pageable.pageUser, this.search.users))
        .then(() => {
          const onlinelist = ["rostic", "ping", "kirill", "admin"]
          this.senders.users = this.$store.getters.listUsers.list.map(v => Object.assign(v, { online: onlinelist.includes(v.login) }))
          this.optionalPageUser.lengthPage = this.$store.getters.listUsers.pages
          this.loading2.user = false
        })
    },
    getListGroups() {
      this.loading2.group = true
      this.$store.dispatch("getListGroups", this.createQueryParam(this.pageable.maxItems,this.pageable.pageGroup, this.search.groups))
        .then(() => {
          this.senders.groups = this.$store.getters.listGroup.list
          this.optionalPageGroup.lengthPage = this.$store.getters.listGroup.pages
          this.loading2.group = false
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
    dateCreate() {
      const date = new Date(this.viewItem.date_create)
      return date.toLocaleString()
    }
  },
  computed: {
  },
  mounted() {
    //компонент поместился в ДОМ дерево
  },
  created() {
    //компонент создается
    this.getListAlerts()
  }

}
</script>

<style scoped>
.del.btn {
  color: white;
}
.alert-header {
  background: #00c853;
  height: 70px;
  max-width: 428px;
}
.editor {
  max-height: 200px;
  overflow-y: auto;
}
</style>