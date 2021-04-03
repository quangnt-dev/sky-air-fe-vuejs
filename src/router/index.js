import Vue from 'vue';
import VueRouter from 'vue-router';

import jwtDecode from "jwt-decode";
import Toastr from "toastr/build/toastr.min.js";
import $ from "jquery";


import HomeTemplate from '../views/HomeTemplate';
import AdminTemplate from '../views/AdminTemplate';
import Auth from '../views/AuthPage';

Vue.use( VueRouter );

const routes = [
  // HomeTemplate
  {
    path: '/',
    name: 'HomeTemplate',
    component: HomeTemplate,

    children: [
      {
        path: '/',
        name: 'HomePage',
        component: () => import( '../views/HomeTemplate/HomePage' )
      },
      {
        path: '/about',
        name: 'AboutPage',
        component: () => import( '../views/HomeTemplate/AboutPage' )
      },
      {
        path: "flight/:id",
        component: () => import( "./../views/HomeTemplate/FoundFlightsPage" ),
      },
      {
        path: "seat/:id",
        component: () => import( "./../views/Seats" ),
      },
      {
        path: "airports",
        component: () => import( "./../views/HomeTemplate/AirportPage" ),
      },
      {
        path: "airports/:id",
        component: () => import( "./../views/HomeTemplate/DetailAirportPage" ),
      },
    ],
  },

  // AdminTemplate
  {
    path: '/admin',
    name: 'AdminTemplate',
    redirect: "/admin/dashboard",
    component: AdminTemplate,


    children: [
      {
        path: '/admin/dashboard',
        name: 'DashboardPage',
        component: () => import( '../views/AdminTemplate/DashboardPage' ),

        beforeEnter ( to, from, next ) {
          if ( localStorage.getItem( "token" ) ) {
            try {
              const decode = jwtDecode( localStorage.getItem( "token" ) );
              if ( decode.userType.toLowerCase() === "admin".toLowerCase() ) {
                next();
              } else {
                throw new Error();
              }
            } catch ( error ) {
              localStorage.removeItem( "token" );
              Toastr.warning(
                "<button type='button' class='btn btn-secondary mr-2' id='closeToastr' >Close</button> <button type='button' class='btn btn-success' id='dispatchHandleRouter'>Yes</button>",
                "You need to login?",
                {
                  closeButton: true,
                  timeOut: 0,
                  positionClass: "toast-top-center",
                  tapToDismiss: false,
                  onShown: function () {
                    $( "#dispatchHandleRouter" ).click( function () {
                      Toastr.remove();
                      next( "/admin/login" );
                    } );
                    $( "#closeToastr" ).click( function () {
                      Toastr.remove();
                    } );
                  }
                }
              );
            }
          }
          else {
            router.push( '/admin/login' );
          }
        }
      },

      {
        path: "/admin/tickets",
        component: () => import( "./../views/AdminTemplate/TicketPage" ),
      },
      {
        path: "/admin/airports",
        component: () => import( "./../views/AdminTemplate/AirportPage" ),
      },
      {
        path: "/admin/airports/:id/edit",
        component: () => import( "./../views/AdminTemplate/EditAirportPage" ),
      },
      {
        path: "/admin/airports/add",
        component: () => import( "./../views/AdminTemplate/AddAirportPage" ),
      },
      {
        path: "/admin/accounts",
        component: () => import( "./../views/AdminTemplate/AccountPage" ),
      },
      {
        path: "/admin/accounts/add",
        component: () => import( "./../views/AdminTemplate/AddAccountPage" ),
      },
      {
        path: "/admin/accounts/update",
        component: () => import( "./../views/AdminTemplate/EditAccountPage" ),
      },
      {
        path: "/admin/about",
        component: () => import( "./../views/AdminTemplate/AboutPage" ),
      },
      {
        path: "/admin/flights",
        component: () => import( "./../views/AdminTemplate/FlightPage" ),
      },
      {
        path: "/admin/flights/add",
        component: () => import( "./../views/AdminTemplate/FlightPage" ),
      },
      {
        path: "/admin/flights/:id/edit",
        component: () => import( "./../views/AdminTemplate/EditFlightPage" ),
      }

    ]
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import( "./../views/AdminTemplate/LoginAdminPage" ),
    // component: Auth,
  },

  // Auth
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,

    children: [
      {
        path: '/auth',
        name: 'Login',
        component: () => import( '../components/ModalLogin' )
      }
    ],
  },

  // PageNotFound
  {
    path: "/:patchMatch(.*)*",
    component: () => import( "./../views/PageNotFound" ),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter( {
  mode: 'history',
  base: process.env.BASE_URL,
  routes
} );

export default router;
