/*jshint esversion:7*/
import App from './App.vue';
import Story from './components/Story.vue';

export const routes = [
  { path: '', name: 'home', components: App },
  { path: '/story/:id', name: 'story', components: Story },
  { path: '*', redirect: { name: 'home' } }
];
