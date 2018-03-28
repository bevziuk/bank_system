<template>

    <el-form :model="authForm" :rules="rules" ref="authForm" label-width="120px">
      <el-form-item label="Username" prop="username">
        <el-input v-model="authForm.username" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password" class="password">
        <el-input v-model="authForm.password" type="password" placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item class="auth_buttons">
        <el-button type="primary" @click.prevent="submitForm('authForm')">Sign in</el-button>
        <el-button type="text" @click.prevent="onSignUp">Sign up?</el-button>
      </el-form-item>
    </el-form>  

</template>

<style>
  .el-form {
    margin-top: 80px;
  }

  .el-form-item {
    width: 40%;
    margin: auto;
    text-align: center;
  }

  .password {
    padding-top: 25px;
  }
  
  .auth_buttons {
    padding-top: 30px;
  }
</style>

<script>
import axios from '../my-axios.js';

export default {
  data() {
        return {
            authForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: 'Input username', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Input password', trigger: 'blur' },
                ]
            }
        };
    },
    methods: {
      async onSignIn() {
        try {
          const response = await axios.post('/clients/login', this.authForm);
          console.log(this.$route.query.backurl);
          this.$router.push(this.$route.query.backurl || "/accounts");
        } catch(error) {
          console.log(error);
        }
      },
      submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.onSignIn();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
      onSignUp() {
        this.$router.push("/registration");
      }
    }
};
</script>
