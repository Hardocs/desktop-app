<template>
  <div class="border-solid border-b border-gray-25 py-4 w-full flex gap-3 border-b-1">
    <!-- <p>{{ menuActions }}</p> -->
    <div v-for="item in menuActions" :key="item.name">
        <router-link v-if='item.name && item.name !== "Index"' class="primary-button" :to="{ path: item.path}">
          {{item.name}}
        </router-link>
    </div>
  </div>
</template>
<script>
import { routes } from '@/router/index.js';
export default {
  name: 'MenuBar',
  computed:{
    menuActions(){
      return routes;
    }
  },
};
</script>