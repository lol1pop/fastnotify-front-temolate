<template>
  <v-form v-model="valid">
    <div class="auth-container">
      <div class="auth">
        <div id="logo"></div>
        <span class="sign-in">Sign in</span>
        <div class="wrapper__sign-in wrapper_login_sign-in" :class="{ err:!!isUnCorrectLogin }">
          <h3>Login</h3>
          <input required v-model="login" @input="checkCorrectLogin" type="text" placeholder="Email" id="user-login" />
          <div class="error_login" v-if="!!isUnCorrectLogin">Wrong login</div>
        </div>
        <div class="wrapper__sign-in wrapper_password_sign-in" :class="{ err:!!isUnCorrectPassword }">
          <h3>Password</h3>
          <input required v-model="password" @input="checkCorrectPassword" :type="passwordFieldType" placeholder="Password" />
          <button class="button button__eye" :class="{ view: isActiveEye }" @click="switchVisibility"/>
          <div class="error_password" v-if="!!isUnCorrectPassword">Wrong password</div>
        </div>
        <div class="error" :class="{ view: !!errorSigIn }"><span>{{ errorSigIn }}</span></div>
        <button :disabled="isDisableButton" class="button button__sign-in" type="primary" @click="singInByToken">Sing In</button>
      </div>
    </div>
    <v-container>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="First name"
              required
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="lastname"
              :rules="nameRules"
              label="Last name"
              required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
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
      isUnCorrectLogin: false,
      isUnCorrectPassword: false,
      errorSigIn: "",
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ]
    }
  },
  computed: {
    isDisableButton() {
      return !!this.isUnCorrectLogin || !!this.isUnCorrectPassword || (!this.login || !this.password)
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
    checkCorrectLogin() {
      if (this.login.length === 0) {
        this.isUnCorrectLogin = false
        return
      }
      this.isUnCorrectLogin = this.login.length < 3 || !correctRegExp.test(this.login)
    },
    checkCorrectPassword() {
      if (this.password.length === 0) {
        this.isUnCorrectPassword = false
        return
      }
      this.isUnCorrectPassword = this.password.length < 3 || !correctRegExp.test(this.password)
    },
    singInByToken() {
      const {login, password} = this
      this.$store.dispatch("authByToken", {login, password})
        .then(() => {
          this.$router.push("/")
        })
    },
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password"
      this.isActiveEye = this.passwordFieldType === "text"
    },
  },
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
  background-image: url(../assets/eye.png);
  position: absolute;
  border-radius: 7px;
  width: 16px;
  height: 16px;
  right: 7px;
  bottom: 10px;
  cursor: pointer;
}

.button__eye.view {
  background-image: url(../assets/eye_off.png);
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