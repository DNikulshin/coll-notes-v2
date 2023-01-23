<template>
  <div v-cloak class="container mb-5">
    <div id="nav">
      <router-link to="/" class="nav-hover"
        ><i class="bi bi-house-fill fs-1 me-2"></i
      ></router-link>
      <router-link to="/notes" class="nav-hover"
        ><i class="bi bi-link-45deg fs-2"></i
        ><i class="bi bi-cloudy fs-1 me-2"></i
      ></router-link>
      <router-link to="/departments" class="nav-hover"
      ><i class="bi bi-link-45deg fs-2"></i
      ><i class="bi bi-people-fill fs-1"></i
      ></router-link>
      <router-link to="/photo-description" class="nav-hover"
      ><i class="bi bi-link-45deg fs-2"></i
      ><i class="bi bi-file-earmark-image fs-1"></i></router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
  column-gap: 2rem;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: brown;
    }
  }
}
[v-cloak] {
  display: none !important;
}
.nav-hover:hover {
  color: brown !important;
  text-decoration: none !important;
}
.input-shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
}
</style>



