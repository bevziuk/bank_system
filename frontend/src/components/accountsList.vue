<template>
  <div>

    <el-container style="height: 500px; width: 800px; margin: auto; border: 1px solid #eee">
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <span>Accounts</span>
            </el-header>
            
            <el-main>
                <el-table :data="tableData">
                  <el-table-column type="index">
                  </el-table-column>
                  <el-table-column prop="_id" label="ID" width="300">
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
  
  .el-aside {
    color: rgb(105, 41, 41);
  }
</style>

<script>
import axios from '../my-axios.js';

export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
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
      console.log(index, row);
      try {
        const response = await axios.delete('/accounts/' + row._id);
        console.log(response);
        this.getData();
      } catch (error) {
        console.log(error);
      }
    },
  },
  beforeMount() {
      this.getData();
  }
};
</script>
