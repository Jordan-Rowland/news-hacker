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
    getStory() {
      // eslint-disable-next-line
      // console.log('Getting Story ', this.storyId)
      fetch(`https://hacker-news.firebaseio.com/v0/item/${this.storyId}/.json`)
        .then(res => res.json())
        .then(jsonRes => this.story = jsonRes)
        .then(() => this.getComments(this.story))
    },
    getComments(parentElement) {
      for (let commentId of parentElement.kids) {
        // eslint-disable-next-line
        console.log('Getting parent comment', commentId)
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
            // console.log('Getting Comment', commentId)
            // console.log(jsonRes)
            if (jsonRes.kids.length &&
                jsonRes.text.length) {
              for (let childCommentId of jsonRes.kids) {
                // eslint-disable-next-line
                console.log('Getting child', childCommentId)
                this.getChildComments(childCommentId)
              }
            }
          }) // End .then jsonRes
          // .then((jsonRes) => {
          //   for (let childCommentId of jsonRes) {
          //     console.log('Getting child comment', commentId)
          //     // eslint-disable-next-line
          //     this.getChildComments(childCommentId)
          //   }
          // })
      }
    }, // End getComments
    getChildComments(childElement) {
      for (let commentId of childElement) {
        // eslint-disable-next-line
        // console.log('Getting Child Comments', commentId)
        fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}/.json`)
          .then(res => res.json())
          .then(jsonRes => childElement.comments.push({
            id: jsonRes.id,
            parent: jsonRes.parent,
            by: jsonRes.by,
            text: jsonRes.text,
            kids: jsonRes.kids,
            comments: [],
          })) // end .then jsonRes
          .then(() => {
            if (childElement.comments.length) {
              // console.log('Getting Comment', commentId)
              // console.log('childElement.comments.length')
              for (let childOfChild of childElement.comments) {
                this.getChildComments(childOfChild)
              }
            }
          }) // End then if childElement.comments.length
      } // End for
    }, // end getChildComments
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
