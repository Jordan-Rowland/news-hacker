<template>
<div>
  <div class="head">
    <button
      @click="storyCategory = 'topstories'"
      class="btn btn-small">Top</button>
    <button
      @click="storyCategory = 'newstories'"
      class="btn btn-small">New</button>
    <button
      @click="storyCategory = 'beststories'"
      class="btn btn-small">Best</button>
    <div>Hacker News</div>
    <button
      class="btn prev"
      v-if="num > 50"
      @click="decrement">PREV</button>
    <button
      class="btn next"
      v-if="num <= 499"
      @click="incrementStories">NEXT</button>
  </div>
  <div
  v-for="(story, index) in stories.slice(num-50,num)"
   :key="index">
    <router-link
      :to="{ name: 'story', params: {id: story.id} }">
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
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import StoryItem from './StoryItem.vue';

export default {
  name: 'home',
  data() {
    return {
      storyCategory: 'beststories',
    }
  },
  components: {
    StoryItem
  },
  computed: {
    ...mapGetters([
      'num',
      'topIds',
      'topstories'
    ]),
    stories() {
      if (this.storyCategory == 'topstories'){
        return this.$store.state.topstories.sort((a,b) => {
          return b.id > a.id
        })
      }
      else if (this.storyCategory == 'newstories'){
        return this.$store.state.newstories.sort((a,b) => {
          return b.id > a.id
        })
      }
      else if (this.storyCategory == 'beststories'){
        return this.$store.state.beststories.sort((a,b) => {
          return b.id > a.id
        })
      }
    },
    // sortedList() {

    // },
  },
  methods: {
    ...mapMutations([
      'increment',
      'decrement'
    ]),
    incrementStories() {
      this.$store.state.num += 50
      console.log(this.topIds.length)
      console.log(this.topstories.length)
      if (this.num >= this.$store.state.topstories.length) {
        for (let i in this.$store.state.topIds.slice(this.num-50,this.num)) {
          this.getStory(this.$store.state.topIds[i],'topstories')
          this.getStory(this.$store.state.newIds[i],'newstories')
          this.getStory(this.$store.state.bestIds[i],'beststories')
        }
      }
    },
    getStories(category) {
      if (!this.$store.state.topstories.length) {
        fetch(`https://hacker-news.firebaseio.com/v0/${category}.json`)
          .then(res => res.json())
          .then(stories => {
            for (let id of stories) {
              if (category == 'topstories') {
                // eslint-disable-next-line
                this.$store.state.topIds.push(id)
              }
              else if (category == 'newstories') {
                // eslint-disable-next-line
                this.$store.state.newIds.push(id)
              }
              else {
                // eslint-disable-next-line
                this.$store.state.bestIds.push(id)
              }
            }
            for (let id of stories.slice(this.num-50,this.num)) {
              this.getStory(id, category)
            }
          })
      }
    },
    getStory(id, category) {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}/.json`)
        .then(res => res.json())
        .then(jsonRes => {
          if (category == 'topstories') {
            // eslint-disable-next-line
            console.log('fetching top')
            this.$store.state.topstories.push(jsonRes)
          }
          else if (category == 'newstories') {
            // eslint-disable-next-line
            console.log('fetching new')
            this.$store.state.newstories.push(jsonRes)
          }
          else {
            // eslint-disable-next-line
            console.log('fetching best')
            this.$store.state.beststories.push(jsonRes)
          }
        })
    },
  },
  created() {
    this.getStories('topstories')
    this.getStories('newstories')
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
