<template>

    <el-form :model="refillForm" :rules="rules" ref="refillForm" label-width="120px" class="demo-refillForm">
      <el-form-item>
        <span>Input sum:</span>
      </el-form-item>
      <el-form-item label="Sum" prop="count">
        <el-input v-model.number="refillForm.count" placeholder="UAH"></el-input>
      </el-form-item>
      <el-form-item class="ref_button">
        <el-button type="primary" @click.prevent="submitForm('refillForm')">Refill</el-button>
      </el-form-item>
    </el-form>

</template>

<style>
    .ref_button {
        padding-top: 30px;
    }
</style>

<script>
import axios from '../my-axios.js';

export default {
    data() {
        return {
            refillForm: {
                count: '',
            },
            rules: {
                count: [
                    { required: true, message: 'Input the sum'},
                    { type: 'number', min: 1, message: 'Sum must be a number'}
                ]
            }
        };
    },
    methods: {
        async onRefill() {
            try {
                const response = await axios.put(this.$router.history.current.path, this.refillForm);
                console.log(response);
                this.$router.push("/accounts");
            } catch(error) {
                console.log(error);
            }
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.onRefill();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>
