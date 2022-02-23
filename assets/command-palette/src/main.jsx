import { createApp } from 'vue';
import App from './components/App';
import './style/main.scss';

document.addEventListener('DOMContentLoaded', () => {
    const $body = document.querySelector('body');
    const $app = document.createElement('DIV');
    $app.id = 'command-palette-app';

    $body.appendChild($app);

    createApp(App).mount('#command-palette-app');
})
