<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link :to="{path:'/detail/1'}">Detail</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>
