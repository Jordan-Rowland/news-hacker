<template>
  <div>
    <h2><a href="story.url">{{ story.title }}</a></h2>
    <!-- {{ story }} -->
    <div class="comments">
      <div v-for="comment in comments"
        class="comment"
        :key="comment.id">
        <!-- {{ comment }} -->
        <span>
        {{ comment.by }}
        </span>
        <hr>
        {{comment.id}}
        <p v-html="comment.text">
        </p>
        <!-- {{comment.kids}} <br> -->
        <!-- {{comment.comments}} -->
        <div v-for="(childComment, childIndex) in comment.comments"
        :key="childIndex">
          <div class="comment">
            <span>
        {{ childComment.by }}
        </span>
        <hr>
        PARENT: {{ childComment.parent }}<br>
        {{childComment.id}}
        <p v-html="childComment.text">
        </p>
          </div>
        </div>
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
  },
  methods: {
    getChildComments(childElement) {
      for (let commentId of childElement.kids) {
        // eslint-disable-next-line
        console.log('Getting Child Comments', commentId)
        fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}/.json`)
          .then(res => res.json())
          .then(jsonRes => childElement.comments.push({
            id: jsonRes.id,
            parent: jsonRes.parent,
            by: jsonRes.by,
            text: jsonRes.text,
            kids: jsonRes.kids,
            comments: [],
          }))
      }
    },
    getStory() {
      // eslint-disable-next-line
      console.log('Getting Story ', this.storyId)
      fetch(`https://hacker-news.firebaseio.com/v0/item/${this.storyId}/.json`)
        .then(res => res.json())
        .then(jsonRes => this.story = jsonRes)
        .then(() => this.getComments(this.story))
        .then(() => {
          // console.log('NEXT THEN')
          // if (this.comments.length) {
          //   console.log('Comments exist')
          // }
          //   for (let childComment of this.comments) {
          //     // eslint-disable-next-line
          //     console.log('Comment of comment', childComment)
          //     getChildComments(childComment)
          //   }
        })
    },
    getComments(parentElement) {
      for (let commentId of parentElement.kids) {
        // eslint-disable-next-line
        console.log('Getting Comment', commentId)
        fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}/.json`)
          .then(res => res.json())
          .then(jsonRes => this.comments.push({
            id: jsonRes.id,
            parent: jsonRes.parent,
            by: jsonRes.by,
            text: jsonRes.text,
            kids: jsonRes.kids,
            comments: [],
          }))
          .then(() => {
            for (let childComment of this.comments) {
              // eslint-disable-next-line
            this.getChildComments(childComment)
            }
          })
      }
    },
  },
  created() {
    this.getStory();
  }
};
</script>

<style scoped>
.comment {
  border: solid black 2px;
}
</style>
