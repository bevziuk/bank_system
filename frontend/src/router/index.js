import Vue from 'vue';
import Router from 'vue-router';
import AuthorizationPage from '../views/AuthorizationPage';
import RegistrationPage from '../views/RegistrationPage';
import AccountsPage from '../views/AccountsForUserPage';
import TransactionsPage from '../views/TransactionsForUserPage';
import RefillMoneyPage from '../views/RefillMoneyPage';
import PaymentPage from '../views/PaymentPage';
import {storage} from '../my-axios.js';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      //title: 'Authorization page',
      path: '/',
      component: AuthorizationPage
    },
    {
      //title: 'Registration page',
      path: '/registration',
      component: RegistrationPage
    },
    {
      title: 'View accounts',
      path: '/accounts',
      component: AccountsPage,
      beforeEnter: storage.checkToken
    },
    {
      path: '/transactions/:acc_id',
      component: TransactionsPage,
      beforeEnter: storage.checkToken, 
      props: true
    },
    {
      title: 'View transactions',
      path: '/transactions',
      component: TransactionsPage,
      beforeEnter: storage.checkToken
    },
    {
      //title: 'Refill page',
      path: '/accounts/refill/:acc_id',
      component: RefillMoneyPage,
      beforeEnter: storage.checkToken
    },
    {
      //title: 'Payment page',
      path: '/payment',
      component: PaymentPage,
      beforeEnter: storage.checkToken
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
