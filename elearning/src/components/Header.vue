<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link
        class="spacing"
        v-for="routes in links"
        v-bind:key="routes.id"
        :to="`${routes.page}`"
      >{{routes.text}}</router-link>
    </nav>
  </header>
</template>

<script>
/* eslint-disable */
export default {
  name: "Header",
  data() {
    return {
      links: [
        {
          id: 0,
          text: "Hello World",
          page: "/HelloWorld"
        },
        {
          id: 1,
          text: "Home",
          page: "/Home"
        },
        {
          id: 2,
          text: "About",
          page: "/About"
        },
        {
          id: 3,
          text: "Contact",
          page: "/Contact"
        }
      ]
    };
  }
};
</script>
<style>
.spacing {
  margin-right: 10px;
}
</style>
