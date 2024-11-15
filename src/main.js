import { Router } from 'svelte-routing';
import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';

const app = mount(App, {
  target: document.getElementById('app'),
  props: {
    url: window.location.pathname
  }
});

export default app;