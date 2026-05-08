<script setup>
  defineProps({
    page: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  })

  defineEmits(['update:page'])
</script>

<template>
  <div class="text-center">
    <v-pagination
      :length="totalPages"
      :model-value="page"
      rounded="circle"
      :total-visible="7"
      @update:model-value="$emit('update:page', $event)"
    />
  </div>
</template>
