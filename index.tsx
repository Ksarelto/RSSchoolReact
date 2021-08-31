import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './src/app';
import { store } from './store/configureStore';


ReactDOM.render(<Provider store={store}><Router> <App/> </Router></Provider>, document.getElementById('root'));
