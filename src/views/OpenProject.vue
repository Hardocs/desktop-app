<template>
  <div class="content-center w-full m-auto text-center items-center flex-col">
    <h1 class="py-4">👇 (We no this is not ideal) Find a path in your file explorer where your <strong class="text-primary-100">hardocs</strong> project is and past it in the input field</h1>
    <OpenDocs class="m-auto"></OpenDocs>
  </div>
</template>

<script>
import OpenDocs from '@/components/OpenDocs';

export default {
  components: { OpenDocs }
};
</script>
