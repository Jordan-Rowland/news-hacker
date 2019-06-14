/*jshint esversion:7*/
import StoryItem from './components/StoryItem.vue';
import Home from './components/Home.vue';
import Story from './components/Story.vue';

export const routes = [
  { path: '', name: 'home', components: {
    default: Home,
    'story-item': StoryItem
    }
  },
  { path: '/story/:id', name: 'story', components: {
    default: Story
    }
  },
  { path: '*', redirect: { name: 'home' } }
];
