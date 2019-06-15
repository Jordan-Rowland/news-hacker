<template>
  <div>
<!--     {{ storyId }}
    {{ story }} -->

    <h2><a href="story.url">{{ story.title }}</a></h2>

    <!-- {{ story.kids }}
    {{ comments }} -->
    <div class="comments">
      <div v-for="(comment, index) in comments"
        class="comment"
        :key="index">
        <span>
        {{ comment.by }}
        </span>
        <hr>
        <p>
        {{ comment.text }}
        </p>
      </div>
    </div>
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
  computed: {
    getStory() {
      console.log('Getting Story ', this.storyId)
      fetch(`https://hacker-news.firebaseio.com/v0/item/${this.storyId}/.json`)
        .then(res => res.json())
        .then(jsonRes => this.story = jsonRes)
        .then(() => this.getComments())
    },
  },
  methods: {
    getComments() {
      console.log('Getting Comments')
      for (let commentId of this.story.kids) {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}/.json`)
          .then(res => res.json())
          .then(jsonRes => this.comments.push(jsonRes))
      }
    },
  },
  created() {
    this.getStory;
    // this.getComments();
  }
};
</script>

<style scoped>
.comment {
  border: solid black 2px;
}
</style>
