<template>
  <div>

    <el-container style="height: 500px; width: 1000px; margin: auto; border: 1px solid #eee">
        <el-container>
            <el-header style="text-align: right">
                <span id="tr_label">Transactions</span>
            </el-header>
            
            <el-main>
                <el-table :data="data">
                  <el-table-column type="index">
                  </el-table-column>
                  <el-table-column prop="_id" label="Transaction (ID)" width="300">
                  </el-table-column>
                  <el-table-column prop="account_id" label="Account (ID)" width="300">
                  </el-table-column>
                  <el-table-column prop="sum" label="UAH" width="100">
                  </el-table-column>
                  <el-table-column prop="date" label="Date" width="185">
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

  #tr_label { 
    font-size: 18px;
    color: rgb(110, 16, 218);
  }
</style>

<script>
import axios from '../my-axios.js';

export default {
  props: ['data']
};



</script>
