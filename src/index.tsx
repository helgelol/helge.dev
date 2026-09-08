import { render } from '@solidjs/web';
import App from './App';
import './global.css';

const root = document.getElementById('root')!;
render(() => <App />, root);
