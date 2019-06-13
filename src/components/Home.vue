<template>
  <div id="app">
    <div class="head">
      <div>Hacker News</div>
      <button
        class="btn prev"
        v-if="num > 20"
        @click="num -= 20">PREV</button>
      <button
        class="btn next"
        v-if="num < 440"
        @click="num += 20">NEXT</button>
    </div>
    <!-- <router-link -->
    <!-- :to="story"> -->
      <story-item
        v-for="(story, index) in stories.slice(num-20,num)"
        :title="story.title"
        :info="story.kids ? story.kids.length : 0">
        </story-item>
      <!-- </router-link> -->
  </div>
</template>

<script>
/* jshint esversion:7 */
import StoryItem from './components/StoryItem.vue'

export default {
  name: 'home',
  data() {
    return {
      // topStories: [],
      stories: [],
      num: 20
    }
  },
  components: {
    StoryItem
  },
  methods: {
    getStory(id) {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}/.json`)
        .then(res => res.json())
        .then(jsonRes => this.stories.push(jsonRes))
    },
  },
  created() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => res.json())
      .then(topStories => {
        for (let story of topStories) {
          this.getStory(story)
        }
      })
  }
}
</script>

<style>
#app {

}

.head {
  background-color: cyan;
  border: black 1px solid;
  padding: 6px 10px;
  text-align: center;
  font-size: 1.8em;
  height: 90px;
}

.btn {
  width: 45%;
  height: 50px;
  border-radius: 5px;
  border: .5px solid black;
  background-color: #bdc;
}

.prev {
  position: absolute;
  top: 55px;
  left: 15px;
}

.next {
  position: absolute;
  top: 55px;
  right: 15px;
}

</style>
