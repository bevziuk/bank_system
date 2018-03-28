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
      <el-form-item class="reg_buttons">
        <el-button type="primary" @click.prevent="submitForm('regForm')">Create account</el-button>
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
        padding-top: 25px;
    }

    .reg_buttons {
        padding-top: 30px;
    }
</style>

<script>
import axios from '../my-axios.js';

export default {
    data() {
        var checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Input username'));
            }
            else if (value.length < 3 || value.length > 15) {
                return callback(new Error('Length should be 3 to 15'));
            }
            (async () => {
                try {
                    const response = await axios.post('/clients', {username: this.regForm.username, 
                        is_checking: true});
                    if (response.data.length > 0) {
                        return callback(new Error('Username is already taken'));
                    }
                    else {
                        callback();
                    }
                } catch (error) {
                    console.log(error);
                }
            })();
        };
        return {
            regForm: {
                username: '',
                password: '',
                name: '',
                surname: ''
            },
            rules: {
                username: [
                    { validator: checkUsername, required: true, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Input password', trigger: 'blur' },
                    { min: 5, max: 15, message: 'Length should be 5 to 15', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: 'Input name', trigger: 'blur' },
                    { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
                ],
                surname: [
                    { required: true, message: 'Input surname', trigger: 'blur' },
                    { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        async onSendData() {
            try {
                const response = await axios.post('/clients', this.regForm);
                console.log(response);
                this.$router.push("/accounts");
            } catch(error) {
                console.log(error);
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.onSendData();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        onSignIn() {
            this.$router.push("/");
        }
    }
};

</script>
