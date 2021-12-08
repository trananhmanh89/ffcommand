import { createApp } from 'vue';
import App from './App.vue';

import './scss/style.scss';

const $body = document.querySelector('body');
const $app = document.createElement('DIV');
$app.id = 'command-palette-app';

$body.appendChild($app);

createApp(App).mount('#command-palette-app');
