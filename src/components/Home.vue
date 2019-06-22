<template>
<div>
  <div class="head">
    <button
      @click="getStories('topstories')"
      class="btn btn-small">Top</button>
    <button
      @click="getStories('newstories')"
      class="btn btn-small">New</button>
    <button
      @click="getStories('beststories')"
      class="btn btn-small">Best</button>
    <div>Hacker News</div>
    <button
      class="btn prev"
      v-if="num > 20"
      @click="num -= 20">PREV</button>
    <button
      class="btn next"
      v-if="num <= 499"
      @click="num += 20">NEXT</button>
  </div>
  <div
  v-for="(story, index) in stories.slice(num-20,num)"
   :key="index">
    <router-link
      :to="{ name: 'story', params: {id: story.id, storyProp: 'hello'} }">
      <!-- {{ story }} -->
    <story-item
      :title="story.title"
      :by="story.by"
      :score="story.score"
      :info="story.kids ? story.kids.length : 0"
      :time="Date(story.time).substr(4,11)"/>
    </router-link>
  </div>
</div>
</template>

<script>
/* jshint esversion:7 */
import StoryItem from './StoryItem.vue'

export default {
  name: 'home',
  data() {
    return {
      // stories: [],
      num: 20,
    }
  },
  components: {
    StoryItem
  },
  computed: {
    stories() {
      return this.$store.state.stories
    }
  },
  methods: {
    getStories(category) {
      if (!this.stories.length) {
        // eslint-disable-next-line
        console.log('Calling Top Articles')
        fetch(`https://hacker-news.firebaseio.com/v0/${category}.json`)
          .then(res => res.json())
          .then(topStories => {
            for (let story of topStories) {
              this.getStory(story)
            }
          })
      }
      else {
        // eslint-disable-next-line
        console.log('Retrieving stories from Store')
      }
    },
    getStory(id) {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}/.json`)
        .then(res => res.json())
        .then(jsonRes => this.$store.state.stories.push(jsonRes))
    },
  },
  created() {
    this.getStories('beststories')
  },
}
</script>

<style>

html, body {
  background-color: #010;
  color: white;
  font-family: "Arial"
}

a {
  text-decoration: none;
  color: white;
}

/*a:after {

}*/

.head {
  /*background-color: #ccd;*/
  border: black 1px solid;
  padding: 6px 10px;
  text-align: center;
  font-size: 1.8em;
  height: 130px;
}

.btn {
  width: 45%;
  height: 50px;
  border-radius: 2.5px;
  border: .5px solid black;
  background-color: #393C3E;
  color: white;
}

.btn-small{
  width: 30%;
  height: 30px;
  margin: 3px;
  /*position: relative;*/
}

.prev {
  position: absolute;
  top: 95px;
  left: 15px;
}

.next {
  position: absolute;
  top: 95px;
  right: 15px;
}

</style>
