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
    login: function() {
      const { email, password } = this;
      this.$store.dispatch("Auth", { email, password }).then(() => {
        this.$router.push("/");
      });
    },
    singIn: function() {
      const { email, password } = this;
      return this.$store
        .dispatch("Auth", {
          email: email,
          password: password
        })
        .then(() => {
          this.$router.push({ path: "/" });
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
