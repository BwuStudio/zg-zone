<template>
  <div>
    <Header />
    <Bar />

    <router-view />
  </div>
</template>

<script>
import Bar from "./Bar";
import Header from "./Header";

export default {
  name: "App",
  components: {
    Header: Header,
    Bar: Bar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  position: relative;
  padding: 0;
  margin: 0;
}
</style>
