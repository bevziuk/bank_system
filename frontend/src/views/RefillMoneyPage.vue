<template>

    <el-form :model="refillForm" :rules="rules" ref="refillForm" label-width="120px" class="demo-refillForm">
      <el-form-item>
        <span>Input sum:</span>
      </el-form-item>
      <el-form-item label="Sum" prop="count">
        <el-input v-model.number="refillForm.count" placeholder="UAH"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="submitForm('refillForm')">Refill</el-button>
      </el-form-item>
    </el-form>

</template>

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
                    { required: true, message: 'Sum is required'},
                    { type: 'number', message: 'Sum must be a number'}
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
                    console.log(this.refillForm);
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
