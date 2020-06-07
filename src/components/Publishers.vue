<template>
  <v-container
      fluid
      class="cart-publisher">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">To delete?</v-card-title>
          <v-card-text>Are you sure you want to delete this item?.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="disagreef">Disagree</v-btn>
            <v-btn color="green darken-1" text @click="agreef">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
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
              @input="getListPublisher"
          ></v-text-field>
          <v-data-table
              :loading="loading" loading-text="Loading... Please wait"
              fixed-header
              hide-default-footer
              color="success"
              min-height="200px"
              :headers="header"
              :items="listPublisher"
              item-key="publisher_id"
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
            </template>
            <template v-slot:item.role="{ item }">
              <v-chip color="success" dark>
                <v-avatar left>
                  <v-icon>{{item.role == "USER" ? "mdi-account-tie-outline": "mdi-account-tie-voice-outline"}}</v-icon>
                </v-avatar>
                {{ item.role }}
              </v-chip>
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination
                :color="color.main"
                v-model="page"
                :page="page"
                :length="pageCount"
                :total-visible="4"
                @input="getListPublisher"
            ></v-pagination>
          </div>
        </v-card-text>
      </v-card>
      <v-card
      class="cart-create-pub">
        <v-text-field
            v-model="newPublisher.user.Login"
            :rules="stackRules"
            label="Login"
            counter
            required
            color="green darken-1"
        ></v-text-field>
        <v-text-field
            v-model="newPublisher.user.Password"
            :rules="stackRules"
            label="Password"
            :type="isActiveEye ? 'text' : 'password'"
            :append-icon="isActiveEye ? 'mdi-eye' : 'mdi-eye-off'"
            counter="25"
            hint="At least 4 characters"
            required
            @click:append="isActiveEye = !isActiveEye"
            color="green darken-1"
        ></v-text-field>
        <v-autocomplete
            v-model="newPublisher.policyId"
            :rules="[() => {isValid.v4 = !!newPublisher.policyId ; return !!newPublisher.policyId || 'This field is required';}]"
            :items="typePolicyRule"
            label="Policy Rule"
            placeholder="Select..."
            required
            chips
            color="green darken-1"
        ></v-autocomplete>
        <v-card-actions
            class="mt-10">
          <v-spacer></v-spacer>
          <v-btn :disabled="!validate" color="green darken-1" text @click="save">Add Publisher</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { headerTablePublisher, typePolicyRule } from "@/utils/hedars_table"
import { mainColorTheme } from "@/utils/consts"
import axios from "axios";
const correctRegExp = /^[A-Za-z0-9]+$/

export default {
  name: "Publishers",
  data() {
    return {
      dialog: false,
      agree: false,
      color: mainColorTheme,
      header: headerTablePublisher,
      listPublisher: [],
      pubId: null,
      newPublisher: {
        user: {
          Login: "",
          Password: ""
        },
        policyId: ""
      },
      pageCount: 1,
      pageItems: 10,
      page: 1,
      search: null,
      loading: true,
      isValid: {
        v1: false,
        v2: false,
        v3: false,
        v4: false
      },
      stackRules: [
        v => {
          this.isValid.v1 = !!v
          return !!v || "Name is required"
        },
        v => {
          this.isValid.v2 = !!v && v.length >= 4
          return !!v && v.length >= 4 || "Name must be at less than 4 characters"
        },
        v => {
          this.isValid.v3 = correctRegExp.test(v)
          return correctRegExp.test(v) || "Name not must be symbols"
        }
      ],
      typePolicyRule: typePolicyRule,
      passwordFieldType: "password",
      isActiveEye: false,

    }
  },
  methods: {
    getListPublisher() {
      this.loading = true
      const query = {
        per: this.pageItems,
        page: this.page,
        pol: this.$store.getters.getUserId,
        like: this.search
      }
      axios.get("/api/publishers", { params: query})
        .then(res => this.listPublisher = res.data)
        .catch(err => {
          throw err
        })
      this.loading = false
    },
    deleteItem (item) {
       axios.delete(`/api/publishers/${ item.publisher_id }`)
        .then(()=> this.getListPublisher())
        .catch(err => {
          throw err
        })
    },
    save() {
      const indexPol = this.typePolicyRule.indexOf(this.newPublisher.policyId) + 1
      const data = this.newPublisher.user
      axios.post("/api/publishers",  data , { params: { policyId: indexPol } })
        .then(() => this.getListPublisher())
        .catch(err => {
          throw err
        })
    },
    disagreef() {
      this.dialog = false
      this.agree = false
    },
    agreef() {
      this.dialog = false
      this.agree = true
    }
  },
  computed: {
    validate() {
      return this.isValid.v1 && this.isValid.v2 && this.isValid.v3 && this.isValid.v4
    },
  },
  mounted() {
    this.getListPublisher()
  }
}
</script>

<style scoped>
.cart-publisher {
  height: 800px;
}
.cart-create-pub {
  margin: 10px;
  padding: 25px;
  width: 420px;
  justify-content: center;
}
</style>