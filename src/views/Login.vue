<template>
  <v-container>
    <div class="auth-container">
      <div class="auth">
        <div id="logo"></div>
        <span class="sign-in">Sign in</span>
        <v-card-text class="auth-fields"
        @click="test">
          <v-text-field
              v-model="login"
              :rules="nameRules"
              counter
              label="Login"
              success
              required
          ></v-text-field>
          <v-text-field
              v-model="password"
              :rules="nameRules"
              counter
              :type="isActiveEye ? 'text' : 'password'"
              :append-icon="isActiveEye ? 'mdi-eye' : 'mdi-eye-off'"
              label="Password"
              hint="At least 4 characters"
              success
              required
              @click:append="isActiveEye = !isActiveEye"
          ></v-text-field>
        </v-card-text>
        <button :disabled="!isValid1 || !isValid2 || !isValid3 || !password" class="button button__sign-in" type="primary" @click="singInByToken">Sing In</button>
      </div>
    </div>
  </v-container>
</template>

<script>
import {checkIfExpired} from "../utils/utils"

const correctRegExp = /^[A-Za-z0-9]+$/

export default {
  name: "Login",
  data() {
    return {
      login: undefined,
      password: undefined,
      passwordFieldType: "password",
      isActiveEye: false,
      errorSigIn: "",
      isValid1: false,
      isValid2: false,
      isValid3: false,
      nameRules: [
        v => {
          this.isValid1 = !!v
          return !!v || "Name is required"
        },
        v => {
          this.isValid2 = !!v && v.length >= 4
          return !!v && v.length >= 4 || "Name must be at less than 4 characters"
        },
        v => {
          this.isValid3 = correctRegExp.test(v)
          return correctRegExp.test(v) || "Name not must be symbols"
        }
      ]
    }
  },
  computed: {
    isDisableButton() {
      return this.isValid
    },
    isLogged() {
      this.log("[Login] checking in $store.state:", this.$store.getters.isAuthenticatedToken())
      this.log("[Login] checking in localstorage: ", checkIfExpired())
      const storedToken = checkIfExpired()
      if (storedToken) {
        this.$store.commit("setAuthToken", storedToken)
      }
      return this.$store.getters.isAuthenticatedToken()
    },
  },
  methods: {
    test() {
      // eslint-disable-next-line no-console
      console.log()
    },
    singInByToken() {
      const {login, password} = this
      this.$store.dispatch("authByToken", {login, password})
        .then(() => {
          this.$router.push("/")
        })
    },
  }
}
</script>

<style scoped>
.auth-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow: auto;
}

.auth {
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  width: 323px;
  height: 437px;
  border-radius: 10px;
  padding: 0.1px 0 0 30px;
  overflow: hidden;
  position: relative;
}
.auth-fields {
  margin-top: 25px;
  padding-left: 0px;
}

* {
  font-family: 'Roboto', sans-serif;
  background-size: contain;
  background-repeat: no-repeat;
}

#logo {
  background-image: url(../assets/logo_fn.png);
  width: 184px;
  height: 23px;
  margin-top: 30px;
}

.sign-in {
  font-size: 25px;
  color: #616161;
  margin-top: 18px;
  margin-bottom: 40px;
  line-height: 45px;
  height: 25px;
}

.wrapper__sign-in {
  width: 293px;
  height: 50px;
  margin-top: 26px;
  position: relative;
}

input {
  border: none;
  outline: 0;
  height: 24px;
  width: 100%;
  box-shadow: 0px 2px 0px 0px #e0e0e0;
  color: #000;
  font-size: 16px;
  line-height: 24px;
}

.wrapper_login_sign-in.err input {
  box-shadow: 0px 2px 0px 0px #d50000;
}

.wrapper_password_sign-in.err input {
  box-shadow: 0px 2px 0px 0px #d50000;
}

.button {
  border: none;
}

.button__sign-in {
  position: absolute;
  opacity: 1;
  width: 90px;
  height: 32px;
  right: 30px;
  bottom: 30px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 3px;
  background: #4bb04b;
  color: #fff;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
}

.button__eye {
  opacity: 0.70;
  position: absolute;
  border-radius: 7px;
  width: 16px;
  height: 16px;
  right: 7px;
  bottom: 10px;
  cursor: pointer;
}

.button__eye.view {
}

.button:disabled {
  cursor: default;
  opacity: 0.20;
}

.error {
  margin-top: 20px;
  font-size: 14px;
  font-weight: bold;
  visibility: hidden;
}

.error.view {
  color: #d50000;
  visibility: visible;
}

.error_login {
  margin-top: 5px;
  font-size: 10px;
  color: #d50000;
}

.error_password {
  margin-top: 5px;
  font-size: 10px;
  color: #d50000;
}

h3 {
  visibility: hidden;
  font-size: 10px;
  color: #757575;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>