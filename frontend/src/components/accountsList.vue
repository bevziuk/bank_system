<template>
  <div>

    <el-container style="height: 500px; width: 800px; margin: auto; border: 1px solid #eee">
      <el-container>
        <el-header style="text-align: right">
          <span id="acc_label">Hello, {{name}} {{surname}}</span>
          <el-button type="primary" @click.prevent="onCreateAcc" class="new_acc">Create account</el-button>
          <el-button type="primary" @click.prevent="onExit">Exit</el-button>
        </el-header>
        
        <el-main>
          <el-table :data="tableData">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="_id" label="Account (ID)" width="300">
            </el-table-column>
            <el-table-column prop="count" label="UAH" width="120">
            </el-table-column>
            <el-table-column
              label="Operations">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="info"
                  @click.prevent="handleDetails(scope.$index, scope.row)">Details</el-button>
                <el-button
                  size="mini"
                  @click.prevent="handleRefill(scope.$index, scope.row)">Refill</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click.prevent="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  #acc_label { 
    font-size: 18px;
    padding-right: 30%;
    color: rgb(110, 16, 218);
  }
</style>

<script>
import axios from '../my-axios.js';
import {storage} from '../my-axios.js';

export default {
  data() {
    return {
      tableData: [],
      name: '',
      surname: ''
    }
  },
  methods: {
    async loadUSerInfo() {
      try {
          const response = await axios.get('/clients');
          console.log(response);
          this.name = response.data.name;
          this.surname = response.data.surname;
      } catch(error) {
          console.error(error);
      }
    },
    async getData() {
      try {        
        const response = await axios.get('/accounts');
        console.log(response);
        this.tableData = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    handleDetails(index, row) {
        console.log(index, row);
        this.$router.push('/transactions/' + row._id);
    },
    handleRefill(index, row) {
        console.log(index, row);
        this.$router.push('/accounts/refill/' + row._id);
    },
    async handleDelete(index, row) {
      try {
        const response = await axios.delete('/accounts/' + row._id);
        console.log(response);
        this.getData();
      } catch (error) {
        console.log(error);
      }
    },
    async onCreateAcc() {
      try {
          const response = await axios.post('/accounts');
          console.log(response);
          this.getData();
      } catch(error) {
          console.error(error);
      }
    },
    onExit() {
      storage.setToken('');
      this.$router.push('/');
    },
  },
  beforeMount() {
      this.loadUSerInfo();
      this.getData();
  }
};
</script>
