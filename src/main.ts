import { createApp } from 'vue';
import App from './App.vue';
import { createAppRouter } from './router';
import '../assets/css/site.css';
import '../assets/css/forms.css';
import '../assets/css/header.css';
import '../assets/css/sidebar.css';
import '../assets/css/footer.css';

createApp(App).use(createAppRouter()).mount('#app');
