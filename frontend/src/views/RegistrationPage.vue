<template>

    <el-form :model="regForm" :rules="rules" ref="regForm" label-width="120px" class="demo-regForm">
      <el-form-item label="Username" prop="username">
        <el-input v-model="regForm.username" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password" class="padding">
        <el-input v-model="regForm.password" placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item label="Name" prop="name" class="padding">
        <el-input v-model="regForm.name" placeholder="Your name"></el-input>
      </el-form-item>
      <el-form-item label="Surname" prop="surname" class="padding">
        <el-input v-model="regForm.surname" placeholder="Your surname"></el-input>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="primary" @click.prevent="onSendData">Create account</el-button>
        <el-button type="text" @click.prevent="onSignIn">Sign in</el-button>
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

  .padding {
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
            regForm: {
                username: '',
                password: '',
                name: '',
                surname: ''
            },
            rules: {
                username: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                    { min: 3, max: 15, message: 'Length should be 3 to 5', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                    { min: 3, max: 15, message: 'Length should be 3 to 5', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                    { min: 3, max: 15, message: 'Length should be 3 to 5', trigger: 'blur' }
                ],
                surname: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                    { min: 3, max: 15, message: 'Length should be 3 to 5', trigger: 'blur' }
                ],
            }
        };
    },
    components: {
        //
    },
    methods: {
        async onSendData() {
            try {
                const response = await axios.post('/clients', this.regForm);
                console.log(response);
                this.$router.push("/userprofile");
            } catch(error) {
                console.log(error);
            }
        },
        onSignIn() {
            this.$router.push("/");
        }
    }
};

</script>
