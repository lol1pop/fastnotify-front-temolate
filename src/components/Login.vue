<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name</label>
      <input required v-model="email" type="text" placeholder="Snoopy" />
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password" />
      <hr />
      <button type="primary" @click="singIn">Log In</button>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { checkIfExpired } from "../utils/utils";

export default {
  name: "Login",
  data() {
    return {
      email: undefined,
      password: undefined
    };
  },
  computed: {
    isLogged() {
      this.log("[Login] checking in $store.state:", this.$store.getters.isAuthenticated);
      this.log("[Login] checking in localstorage: ", checkIfExpired());
      const storedToken = checkIfExpired();
      if (storedToken) {
        this.$store.commit("setAuthToken", storedToken);
      }
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    login() {
      const {email, password} = this;
      this.$store.dispatch("AuthByToken", {email, password})
              .then(() => {
                this.$router.push("/");
              });
    },
    singIn() {
      const {email, password} = this;
      return this.$store.dispatch("AuthWithPolicy", {email, password})
              .then(() => {
                this.$router.push({path: "/"});
              })
              .catch((err) => {
                this.$message({
                  message: "Incorrect credentials. Please try again" + err,
                  type: "error"
                });
              });
    }
  }
};
</script>

<style scoped>
  h3 {
    margin: 40px 0 0;
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