<template>
<div>
  <div class="comments">
    <div v-for="comment of comments"
      class="comment"
      :key="comment.id">
      <div class="comment-by">
      {{ comment.by }}
      </div>
      <hr>
      <div class="comment-body">
        <p v-html="comment.text"></p>
        <div v-if="comment.kids"
          v-once
          @click="getChildComments(comment)">
          <div class="read-more">
            <strong>
              <em> >>> </em>
            </strong>
          </div>
          </div>
            <comment
            :comments="comment.comments"
            ></comment>
      </div>
      </div>
  </div>
</div>
</template>

<script>
/* jshint esversion: 9 */
export default {
  name: 'comment',
  data() {
    return {
      // childComments: false,
    };
  },
  props: {
    comments: Array,
  },
  methods: {
    getChildComments(comment) {
      // console.log(comments)
      // for (let comment of comments) {
        if (!comment.comments.length) {
          for (let commentId of comment.kids) {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}/.json`)
              .then(res => res.json())
              .then(jsonRes => {
                if (!jsonRes.deleted) {
                  comment.comments.push({
                    id: jsonRes.id,
                    parent: jsonRes.parent,
                    by: jsonRes.by,
                    text: jsonRes.text,
                    kids: jsonRes.kids,
                    comments: [],
                  })
                }
              }) // End .then jsonRes
          } // End for commentId
        } // End if
      // } // End for comment
    }, // end getChildComments
  },
};
</script>

<style scoped>
.comment {
  border: solid #ccc 2px;
}

.comment-by {
  background-color: #393C3E;
}

.comment-body {
  padding: 0 3px;
}

hr {
  color: #ccc;
  height: .1px;
  margin: 1px;
}

.read-more {
  margin: 10px;
  background-color: #393C3E;
}

.read-more:hover {
  cursor: pointer;
}

</style>
