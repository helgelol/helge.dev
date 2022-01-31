import App from './App.svelte';
import * as Swetrix from 'swetrix';

Swetrix.init('f85vwPrZi2-d');
Swetrix.trackViews();

const app = new App({
  intro: true,
  target: document.body,
  props: {},
});

export default app;
