<template>
  <v-container>
    <v-card
        class="cart-create-user">
      <v-text-field
          refs="login"
          v-model="user.DisplayName"
          :rules="stackRules"
          label="Отоброжаемое имя"
          counter
          required
          color="green darken-1"
      ></v-text-field>
      <v-text-field
          v-model="user.Email"
          :rules="emailRule"
          label="Почтовый адресс"
          counter
          color="green darken-1"
      ></v-text-field>
      <v-text-field
          v-model="user.Login"
          :rules="stackRules"
          label="Логин"
          counter
          hint="Не мение 4-х символов"
          required
          color="green darken-1"
      ></v-text-field>
      <v-text-field
          v-model="user.Password"
          :rules="stackRules"
          label="Пароль"
          :type="isActiveEye ? 'text' : 'password'"
          :append-icon="isActiveEye ? 'mdi-eye' : 'mdi-eye-off'"
          counter="25"
          hint="Не мение 4-х символов"
          required
          @click:append="isActiveEye = !isActiveEye"
          color="green darken-1"
      ></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-fab-transition>
          <v-btn v-show="validate" color="green" fab dark @click="save">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card-actions>
    </v-card>
    <v-snackbar
        v-model="snackbar.status"
        :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}
        <v-btn
            :color="snackbar.color"
            text
            @click="snackbar.status = false"
        >
          {{ snackbar.textBtn }}
        </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import {mainColorTheme} from "@/utils/consts"
import axios from "axios"

const correctRegExp = /^[A-Za-z0-9]+$/
// eslint-disable-next-line no-control-regex,no-unused-vars
const correctEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export default {
  name: "CreatedUser",
  data() {
    return {
      snackbar: {
        timeout: 2000,
        status: false,
        text: "",
        textBtn: "Close",
        color: "green",
      },
      colors: mainColorTheme,
      loading: false,
      isActiveEye: false,
      isValid: {
        v1: false,
        v2: false,
        v3: false,
        v4: true
      },
      stackRules: [
        v => {
          this.isValid.v1 = !!v
          return !!v || "Это поле обязательно"
        },
        v => {
          this.isValid.v2 = !!v && v.length >= 4
          return !!v && v.length >= 4 || "Поле должно содержать не мение 4-х символов"
        },
        v => {
          this.isValid.v3 = correctRegExp.test(v)
          return this.isValid.v3 || "Можно использовать только латинские буквы и цифры"
        },
      ],
      emailRule: [() => {
        this.isValid.v4 = this.user.Email ? correctEmail.test(this.user.Email) : true
        return this.isValid.v4 || "Некорректный почтовый адресс"
      }],
      user: {
        Login: null,
        Password: null,
        Email: null,
        DisplayName: null,
      },
    }
  },
  computed: {
    checkIsValid() {
      return this.isValid.v1 && this.isValid.v2 && this.isValid.v3 && this.isValid.v4
    },
    checkAllRequer() {
      return !!this.user.DisplayName && !!this.user.Login && !!this.user.Password
    },
    validate() {
      return this.checkAllRequer && this.checkIsValid
    },
  },
  methods: {
    save() {
      axios.post("/api/users", this.user)
        .then(() => {
          this.snackbar = {
            status: true,
            text: "Новый пользователь успешно создан",
            textBtn: "Ok",
            color: "green",
          }
          this.user = {
            Login: null,
            Password: null,
            Email: null,
            DisplayName: null,
          }
        })
        .catch(err => {
          this.snackbar = {
            timeout: 10000,
            status: true,
            text: "Ошибка при создании нового пользователя",
            textBtn: "Закрыть",
            color: "red",
          }
          throw err
        })
    },
  },
}
</script>

<style scoped>
.cart-create-user {
  margin: 10px;
  padding: 25px;
  width: 420px;
  justify-content: center;
}
</style>