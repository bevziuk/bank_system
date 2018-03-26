<template>
    <div>

        <p>Hello, {{name}} {{surname}}</p>

       <el-button type="primary" @click.prevent="onViewTrans">View transactions</el-button>
       <el-button type="primary" @click.prevent="onViewAccs">View accounts</el-button>
       <el-button type="primary" @click.prevent="onCreateAcc">Create account</el-button>
       <el-button type="primary" @click.prevent="onExit">Exit</el-button>

    </div>
</template>

<script>
import axios from '../my-axios.js';
import {storage} from '../my-axios.js';

export default {
    data () {
        return {
            name: '',
            surname: ''
        };
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
      onViewTrans() {
        this.$router.push("/transactions");
      },
      onViewAccs() {
        this.$router.push("/accounts");
      },
      async onCreateAcc() {
        try {
            const response = await axios.post('/accounts');
            console.log(response);
            this.$router.push("/accounts");
        } catch(error) {
            console.error(error);
        }
      },
      onExit() {
          storage.setToken('');
          this.$router.push('/');
      }
    },
    beforeMount() {
        this.loadUSerInfo();
    }
}
</script>

