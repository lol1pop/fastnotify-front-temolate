<template>
  <v-container
      fluid
      class="cart-group">
    <v-row >
<!--      <v-col cols="12">-->
      <v-card
          width="450px"
          class="ma-3"
      >
        <v-card-text>
          <v-text-field
              color="success"
              :loading="loading"
              prepend-icon="mdi-magnify"
              label="Search"
              v-model="search"
              @input="getListGroup"
          ></v-text-field>
          <v-data-table
              :loading="loading" loading-text="Loading... Please wait"
              fixed-header
              hide-default-footer
              color="success"
              min-height="200px"
              :headers="header"
              :items="listGroup"
              item-key="group_id"
              class="elevation-1 mb-2"
              :items-per-page="pageItems"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon
                  size="30"
                  @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
              <v-icon
                  size="30"
                  @click="chainUser(item)"
              >
                mdi-link-variant-plus
              </v-icon>
            </template>
          </v-data-table>
          <v-text-field
              v-model="newGroup"
              :rules="stackRules"
              label="Add new group"
              prepend-icon="mdi-account-multiple-plus"
              :append-outer-icon="newGroup ? 'mdi-send' : 'mdi-tree-outline'"
              required
              outlined
              clear-icon="mdi-close-circle"
              clearable
              color="green darken-1"
              @click:append-outer="save"
              @click:prepend="save"
          ></v-text-field>
          <div class="text-center pt-2">
            <v-pagination
                :color="color.main"
                v-model="page"
                :page="page"
                :length="pageCount"
                :total-visible="4"
                @input="getListGroup"
            ></v-pagination>
          </div>
        </v-card-text>
      </v-card>
<!--      </v-col>-->
<!--      <v-col cols="12">-->
      <vEditGroup :chain="chain"></vEditGroup>
<!--      </v-col>-->
    </v-row>
  </v-container>
</template>

<script>
import { headerTableGroups } from "@/utils/hedars_table"
import { mainColorTheme } from "@/utils/consts"
import axios from "axios";
import vEditGroup from "@/components/EditGroup"

const correctRegExp = /^[A-Za-z0-9\s]+$/
export default {
  name: "Groups",
  components: {
    vEditGroup
  },
  data() {
    return {
      dialog: false,
      agree: false,
      color: mainColorTheme,
      header: headerTableGroups,
      listGroup: [],
      newGroup: "",
      pageCount: 1,
      pageItems: 10,
      page: 1,
      search: null,
      loading: true,
      isValid: false,
      chain: null,
      stackRules: [
        v => {
          this.isValid = correctRegExp.test(v)
          return correctRegExp.test(v) || "Name not must be symbols"
        }
      ]
    }
  },
  watch: {

  },
  methods: {
    getListGroup() {
      this.loading = true
      const query = {
        per: this.pageItems,
        page: this.page,
        pol: this.$store.getters.getUserId,
        like: this.search
      }
      axios.get("/api/groups", { params: query})
        .then(res => {
          this.pageCount = res.data.pages
          this.listGroup = res.data.list
        })
        .catch(err => {
          throw err
        })
      this.loading = false
    },
    deleteItem (item) {
      axios.delete(`/api/groups/${ item.group_id }`)
        .then(()=> this.getListGroup())
        .catch(err => {
          throw err
        })
    },
    save() {
      if(this.isValid)
      axios.post("/api/groups",  JSON.stringify(this.newGroup) ,{ headers: {"Content-Type": "application/json"} })
        .then(() => this.getListGroup())
        .catch(err => {
          throw err
        })
      this.newGroup = null
    },
    chainUser(item) {
      this.chain = item;
    }
  },
  computed: {
  },
  mounted() {
    this.getListGroup()
  }
}
</script>

<style scoped>
.cart-group {
  max-height: 500px;
}
.cart-create-group {
  margin: 10px;
  padding: 25px;
  width: 420px;
  justify-content: center;
}
</style>