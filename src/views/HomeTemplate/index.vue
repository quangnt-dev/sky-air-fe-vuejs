<template>
  <div class="home-template">
    <Header />
    <!-- <h1>Home-template</h1> -->
    <!-- <h1 class="text-success">{{ message }}</h1> -->
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    message() {
      // return this.$store.state.auth.message;
    },
  },
};
</script>

<style>
</style>
