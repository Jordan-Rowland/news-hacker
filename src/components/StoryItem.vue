<template>
  <div class="story-item">
    <div class="title">
      <h4>
        {{ title }}
      </h4>
      <em class="details">
      {{ score }} points by {{ by }},
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
    time: [Number, String],
    by: String,
    score: Number,
  }
};
</script>

<style scoped>
.story-item {
  margin-top: 5px;
  color: #efe;
}

.title {
  border: #393C3E 1px solid;
  background-color: #393C3E;
  padding: 10px;
}

h4 {
  margin: 3px;
}

.details {
  margin: 10px;
  font-size: .8em;
}
</style>
