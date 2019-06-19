<template>
  <div>
    <h2><a href="story.url">{{ story.title }}</a></h2>
    <app-comment
    :comments="comments"></app-comment>
  </div>
</template>

<script>
/* jshint esversion: 9 */
import Comment from './Comment.vue'
export default {
  name: 'story',
  data() {
    return {
      storyId: this.$route.params.id,
      story: {},
      comments: []
    };
  },
  components: {
    'app-comment': Comment,
  },
  methods: {
    getStory() {
      // eslint-disable-next-line
      fetch(`https://hacker-news.firebaseio.com/v0/item/${this.storyId}/.json`)
        .then(res => res.json())
        .then(jsonRes => this.story = jsonRes)
        .then(() => this.getComments(this.story))
    },
    getComments(parentElement) {
      for (let commentId of parentElement.kids) {
        // eslint-disable-next-line
        fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}/.json`)
          .then(res => res.json())
          .then(jsonRes => {
            this.comments.push({
              id: jsonRes.id,
              parent: jsonRes.parent,
              by: jsonRes.by,
              text: jsonRes.text,
              kids: jsonRes.kids,
              comments: [],
            });
          }) // End .then jsonRes
      } // End for
    }, // End getComments
  }, // End methods
  created() {
    this.getStory();
  }
};
</script>

<style scoped>
.comment {
  border: solid black 2px;
  margin-left: 5px;
  padding: 3px;
}
</style>
