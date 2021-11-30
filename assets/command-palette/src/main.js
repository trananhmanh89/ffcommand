import { createApp } from 'vue';
import App from './App.vue';

const $body = document.querySelector('body');
const $app = document.createElement('DIV');
$app.id = 'app';

$body.appendChild($app);

createApp(App).mount('#app');
