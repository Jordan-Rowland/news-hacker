<template>
  <div>
    <div class="title">
      <h3>
        {{ title }}
      </h3>
    </div>
    <div class="info">
      <em>
        {{ time }} | Comments: {{ info }}
      </em>

    </div>
  </div>
</template>

<script>
/* jshint esversion: 9 */
export default {
  name: 'storyItem',
  data() {
    return {

    };
  },
  props: {
    title: String,
    info: Number,
    time: [Number, String]
  }
};
</script>

<style scoped>
.title {
  border: black 1px solid;
  background-color: lightblue;
  padding: 0 10px;
}

.info {
  border: black 1px solid;
  background-color: #ddd;
  padding: 0 10px;
}
</style>
