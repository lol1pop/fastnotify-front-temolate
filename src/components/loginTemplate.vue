<template>
  <el-row type="flex" justify="space-around" align="middle">
    <el-col :span="16" type="flex" class="row-bg" justify="space-around">
      <div class="grid-content bg-purple-light">
        <el-card :body-style="{ padding: '0px' }" v-loading="isLoading">
          <img src="../assets/logo.png" class="image login-image">
          <el-form
            status-icon
            ref="ruleForm"
            label-width="100px"
            class="login-form"
            :rules="rules"
            :model="ruleForm"
          >
            <el-form-item label="Name" prop="name">
              <el-input v-model="ruleForm.name" class="login-input" id="login"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                class="login-input"
                id="password"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">Log In</el-button>
              <el-button @click="resetForm('ruleForm')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the login'));
      }
      setTimeout(() => {
        callback();
      }, 1000);
    };
    const checkPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please input the password'));
      }
      setTimeout(() => {
        callback();
      }, 1000);
    };
    return {
      ruleForm: {
        name: '',
        pass: '',
      },
      rules: {
        name: [
          { validator: checkName, trigger: 'blur' },
        ],
        pass: [
          { validator: checkPass, trigger: 'blur' },
        ],
      },
      isLoading: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          return this.$store
            .dispatch('AUTH', {
              email: this.ruleForm.name,
              password: this.ruleForm.pass,
            })
            .then(() => {
              //this.$emit('load');
              this.isLoading = false;
              this.$router.push({ path: '/configs' });
              
            })
            .catch(() => {
              this.open1();
              this.isLoading = false;
            });
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    open1() {
      this.$message({
        showClose: true,
        message: 'Incorrect credentials. Please try again',
        type: 'error',
      });
    },
  },
};
</script>

<style lang="scss">
body {
  background-color:rgb(240, 240, 240);
}

.grid-content {
  max-width: 420px;
  margin: auto;
  margin-top: 200px;
}

.login-image {
  display: block;
  width: 50%;
  margin-left: auto;
  margin-bottom: 20px;
  padding: 20px 20px 0 0;
}

.login-form {
  padding: 20px;
  padding-right: 40px;
}

.login-input {
  max-width: 300px;
}
</style>

