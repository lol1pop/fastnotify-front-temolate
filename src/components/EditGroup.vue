<template>
  <v-card
      min-width="500"
      max-width="700"
      class="ma-3"
  >
    <v-container class="py-0">
      <v-row
          align="center"
          justify="start"
      >
        <v-col
            v-for="(selection, i) in selections"
            :key="selection.user_id"
            class="shrink"
        >
          <v-chip
              :disabled="loading"
              close
              @click:close="selected.splice(i, 1)"
          >
            <v-icon
                left
                v-text="icon"
            ></v-icon>
            {{ selection.login }}
          </v-chip>
        </v-col>

        <v-col v-if="!allSelected" cols="12">
          <v-text-field
              ref="search"
              v-model="search"
              full-width
              hide-details
              label="Search"
              single-line
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
<!--    <v-divider v-if="!allSelected"></v-divider>-->
    <v-list
        class="list-user">
      <template v-for="item in users">
        <v-list-item
            v-if="uniqueUser(item)"
            :key="item.user_id"
            :disabled="loading"
            @click="selected.push(item)"
        >
          <v-list-item-avatar><v-icon></v-icon></v-list-item-avatar>
          <v-list-item-title v-text="item.display_name"></v-list-item-title>
          <v-list-item-subtitle>{{ `(@${item.login})`}}</v-list-item-subtitle>
        </v-list-item>
      </template>
    </v-list>
    <v-card-actions
    class="chain">
        <v-btn
            v-show="!hidden"
            color="pink"
            dark
            fab
            @click="chainUser"
        >
          <v-icon>mdi-link-variant-plus</v-icon>
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  props: ['chain'],
  data: () => ({
    hidden: true,
    loading: false,
    search: '',
    selected: [],
    userList: [],
    icon: "mdi-account-tie",
    group: null
  }),

  computed: {
    allSelected () {
      if(this.selected == null && this.userList == null) return false
      return this.selected.length === this.userList.length
    },
    users () {
      const search = this.search.toLowerCase()

      if (!search) return this.userList

      return this.userList.filter(item => {
        const name = item.display_name && item.display_name.toLowerCase()
        const login = item.login.toLowerCase()
        return name && name.indexOf(search) > -1 || login.indexOf(search) > -1
      })
    },
    selections () {
      const selections = []
      for (const selection of this.selected) {
        selections.push(selection)
      }
      return selections
    }
  },
  watch: {
    selected () {
      this.search = ''
      if(this.selected == null || this.selected.length === 0) { this.hidden = true }else { this.hidden = false }
    },
    chain() {
      this.hidden = false
      this.selected = []
      this.getListUserToId(this.chain.group_id).then(res => {
          this.group = res.group
          const unique = []
          for (const selection of res.users) {
            var flag = true
            for(const uniq of unique) {
              if(uniq.user_id === selection.user_id) flag = false
            }
            if(flag) unique.push(selection)
          }
          this.pushToSelected(unique)
          this.getListUsers()
        })
    }
  },
  methods: {
    createQueryParam( limit, page, search) {
      if(search !== "")
        return "?per="+limit+"&page="+page+"&like="+search+"&pol=1"
      return "?per="+limit+"&page="+page+"&pol=1"
    },
    getListUsers() {
      this.loading = true
      this.$store.dispatch("getListUsers", this.createQueryParam(16,1, ""))
        .then(() => {
          this.userList = this.$store.getters.listUsers.list
          //this.pageCount = this.$store.getters.listUsers.pages//todo
          this.loading = false
        })
    },
    getListUserToId(id) {
      return axios.get(`/api/groups/${id}`)
        .then( res => {
          return res.data
        })
        .catch(err => { throw err})
    },
    pushToSelected(list) {
      const selections = []
      for (const selection of list) {
        selections.push(selection)
      }
      this.selected = selections
    },
    chainUser() {
      this.hidden = true
      const listuser = this.selected.map(v => v.user_id)
      axios.post(`/api/groups/${this.group.group_id}/add-users`,listuser)
      .then(() => {

      })
      .catch(err => {throw err})
    },
    uniqueUser(item) {
      for(const selection of this.selected) {
        if(item.user_id === selection.user_id) return  false
      }
      return true
    }
  },
  mounted() {
    //this.getListUsers()
  }
}
</script>

<style scoped>
.list-user {
  max-height: 500px;
  overflow: hidden;
  overflow-y: auto;
}
.chain {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>