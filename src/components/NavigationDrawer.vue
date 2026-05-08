<script setup>
  import { ref } from 'vue'
  // TODO проверить сохранение rail в localStorage
  const drawer = ref(true)
  const items = [
    { icon: 'mdi-home-city', title: 'Home', value: 'home' },
    { icon: 'mdi-account', title: 'My Account', value: 'account' },
    { icon: 'mdi-account-group-outline', title: 'Users', value: 'users' },
  ]
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    class="pa-0"
    color="indigo"
    expand-on-hover
    permanent
    rail
    :rail-width="80"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="User"
      >
        <template #prepend>
          <v-avatar
            class="mx-1"
            size="40"
          />
        </template>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in items"
        :key="item.value"
        class="pl-5"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
      />
    </v-list>
  </v-navigation-drawer>
</template>
