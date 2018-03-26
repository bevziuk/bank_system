<template>

    <el-form ref="form" :model="form" label-width="80px" label-position="top">
      <el-form-item label="Accounts">
        <el-select v-model="form.account" placeholder="Select account">
          <el-option v-for="acc in accounts" v-if="acc.count > 0" :label="acc.count" :value="acc._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="sum">
        <div>Sum: {{this.sum}} UAH</div>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button size="mini" type="info" @click.prevent="onPay">Pay</el-button>
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

  .sum {
    padding-top: 20px;
  }
  
  .buttons {
    padding-top: 10px;
  }
</style>

<script>
import axios from '../my-axios.js';

export default {
  data() {
    return {
      form: {
        account: ''
      },
      sum: 1,
      accounts: []
    }
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get('/accounts');
        console.log(response);
        this.tableData = response.data;
        this.accounts = response.data;        
        console.log(this.accounts);
      } catch (error) {
        console.log(error);
      }
    },
    async onPay() {
        try {
            const response = await axios.post('/transactions', {_id: this.form.account, sum: this.sum});
            console.log(response);
            this.$router.push('/transactions/' + this.form.account);
        } catch (error) {
            console.log(error);
        }
    }
  },
  beforeMount() {
      this.getData();
  }
};
</script>
