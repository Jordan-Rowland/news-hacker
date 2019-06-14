<template>
  <div>
    {{ storyId }}
    {{ story }}

    <h2>{{ story.title }}</h2>
    <p>
    <a href="story.url">Read Article</a>
    </p>

{{ story.kids }}

    <p v-for="comment in comments">
      {{ comment.text }}
    </p>
  </div>
</template>

<script>
/* jshint esversion: 9 */
export default {
  name: 'story',
  data() {
    return {
      storyId: this.$route.params.id,
      story: {},
      comments: []
    };
  },
  methods: {
    getStory() {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${this.storyId}/.json`)
        .then(res => res.json())
        .then(jsonRes => this.story = jsonRes)
    },
    getComments() {
      for (let commentId of this.story.kids) {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}/.json`)
          .then(res => res.json())
          .then(jsonRes => this.comments.push(jsonRes))
      }
    },
  },
  created() {
    this.getStory();
    this.getComments();
  }
};
</script>

<style scoped>

</style>
