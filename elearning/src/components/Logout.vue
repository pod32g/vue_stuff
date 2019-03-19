<template>
  <div></div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Logout",
  created() {
    this.$session = null;
    this.$cookies.remove("session");
    window.location.href = "/";
  }
};
</script>
