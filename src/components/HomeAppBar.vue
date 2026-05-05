<script setup>
  defineProps(['searchText'])
  defineEmits(['update:searchText'])
</script>

<template>
  <v-app-bar :elevation="5">
    <v-app-bar-title>Application Bar,,,,</v-app-bar-title>

    <template #append>
      <v-btn icon="mdi-heart" />
      <v-btn icon="mdi-dots-vertical" />
    </template>

    <!-- TODO Сделать поле поиска закругленным. Мб еще поработать со стилями!! -->
    <v-text-field
      flat
      hide-details
      label="Search"
      :model-value="searchText"
      prepend-inner-icon="mdi-magnify"
      single-line
      variant="solo-filled"
      @update:model-value="$emit('update:searchText', $event)"
    />
  </v-app-bar>
</template>
