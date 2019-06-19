<template>
  <div>
    <div class="comments">
      <div v-for="comment of comments"
        class="comment"
        :key="comment.id">
        <span>
        {{ comment.by }}
        </span>
        <hr>
        <p v-html="comment.text"></p>
        <!-- <div v-if="comment.kids"> -->
        <div v-if="comment.kids"
          v-once
          @click="getChildComments(comment)">
          <strong>
            <em>Read Comments >> </em>
          </strong>
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
      if (!comment.comments.length) {
        for (let commentId of comment.kids) {
          fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}/.json`)
            .then(res => res.json())
            .then(jsonRes => {
              comment.comments.push({
                id: jsonRes.id,
                parent: jsonRes.parent,
                by: jsonRes.by,
                text: jsonRes.text,
                kids: jsonRes.kids,
                comments: [],
              })
            }) // end .then jsonRes
        } // End for
      }
    }, // end getChildComments
  }
};
</script>

<style scoped>
.comment {
  border: solid black 2px;
  /*margin-left: 5px;*/
  padding: 3px;
  /*margin: auto;*/
}
</style>
