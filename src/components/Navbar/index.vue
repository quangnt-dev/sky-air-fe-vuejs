
<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
    <router-link class="navbar-brand" to="/">
      <img
        src="./../../assets/logo.png"
        width="50px"
        height="50px"
        alt="logo"
      />
    </router-link>
    <button
      class="navbar-toggler d-lg-none"
      type="button"
      data-toggle="collapse"
      data-target="#collapsibleNavId"
      aria-controls="collapsibleNavId"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavId">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <router-link class="nav-link" exact to="/">
            Home
            <span class="sr-only">(current)</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/admin">Admin</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/auth">Auth</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/airports">Airports</router-link>
        </li>
      </ul>
      <!-- <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="text" placeholder="Search" />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form> -->

      <div class="d-flex justify-content-between align-items-center">
        <div class="auth-btn mx-sm-4" v-if="!user">
          <button
            class="btn btn-outline-light bg-transparent my-2 my-sm-0 mx-sm-1"
            type="submit"
            data-toggle="modal"
            data-target="#m-signup"
          >
            Sign up
          </button>

          <!-- Button trigger modal -->
          <button
            class="btn btn-success my-2 my-sm-0 mx-sm-1"
            type="submit"
            data-toggle="modal"
            data-target="#m-login"
          >
            Log in
          </button>
          <!-- Modal -->
          <ModalLogin />
          <ModalSignUp />
        </div>

        <div class="d-flex align-items-center" v-else>
          <button
            class="btn btn-outline-light my-2 my-sm-0 mx-sm-1"
            type="submit"
            data-toggle=""
            data-target=""
            @click="handleLogout"
          >
            Log out
          </button>
          <span
            class="logined-user btn-outline-light border rounded-circle mx-sm-2"
          >
            <router-link to="/admin">
              <img
                src="../../assets/logo.png"
                width="30px"
                height="30px"
                alt="user"
              />
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import ModalLogin from "../ModalLogin";
import ModalSignUp from "../ModalSignUp";
import * as types from "../../store/modules/auth/constants";

import $ from "jquery";

export default {
  components: {
    ModalLogin,
    ModalSignUp,
  },
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    handleLogout() {
      $("#m-signup").modal("hide");
      this.$store.dispatch(types.A_AUTH_LOGOUT);
    },
  },
};
</script>

<style scoped>
/* .auth-btn {
} */
</style>
