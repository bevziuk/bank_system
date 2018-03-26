<template>

    <el-form :model="authForm" :rules="rules" ref="authForm" label-width="120px">
      <el-form-item label="Username" prop="username">
        <el-input v-model="authForm.username" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password" class="password">
        <el-input v-model="authForm.password" type="password" placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="primary" @click.prevent="onSignIn">Sign in</el-button>
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
    padding-top: 20px;
  }
  
  .buttons {
    padding-top: 20px;
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
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                    { min: 3, max: 15, message: 'Length should be 3 to 5', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                    { min: 3, max: 15, message: 'Length should be 3 to 5', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
      async onSignIn() {
        try {
          const response = await axios.post('/clients/login', this.authForm);
          console.log(this.$route.query.backurl);
          this.$router.push(this.$route.query.backurl || "/userprofile");
        } catch(error) {
          console.log(error);
        }
      },
      onSignUp() {
        this.$router.push("/registration");
      }
    }
};
</script>
