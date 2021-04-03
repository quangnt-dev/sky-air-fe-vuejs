import Vue from "vue";
import Vuex from "vuex";

import auth from './modules/auth';
import user from './modules/user';
import airport from './modules/airport';
import flight from './modules/flight';
import seat from './modules/seat';

Vue.use( Vuex );

// export const store =  new Vuex.Store( {
//   modules: {
//     auth
//   }
// } );
export default new Vuex.Store( {
  modules: {
    auth,
    user,
    airport,
    flight,
    seat,
  }
} );
