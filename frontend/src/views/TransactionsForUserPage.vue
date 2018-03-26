<template>
  <div>

    <transactions-list :data="tableData"></transactions-list>
{{acc_id}}
  </div>
</template>

<script>
import transactionsList from 'components/transactionsList';
import axios from '../my-axios.js';

export default {
  data() {
    return {
      tableData: []
    }
  },
  props: ['acc_id'],
  components: {
    transactionsList
  },
  mounted() {
    this.getData();
  },
  updated() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get('/transactions/' + (this.acc_id || ''));
        console.log(response);
        this.tableData = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
