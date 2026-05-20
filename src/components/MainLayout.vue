<script setup>
  import HomeAppBar from '@/components/HomeAppBar.vue'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'
</script>

<template>
  <HomeAppBar />

  <v-layout>
    <NavigationDrawer />

    <div class="w-100">
      <router-view />
    </div>
  </v-layout>
</template>
