import { createApp } from 'vue';
import App from './components/App';
import {
    addDevtoolPlugin,
} from './services/devtool';
import './style/main.scss';

document.addEventListener('DOMContentLoaded', () => {
    const $body = document.querySelector('body');
    const $app = document.createElement('DIV');
    $app.id = 'command-palette-app';

    $body.appendChild($app);

    const app = createApp(App);

    addDevtoolPlugin(app);
    app.mount('#command-palette-app');
})
