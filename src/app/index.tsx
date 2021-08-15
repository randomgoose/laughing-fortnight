import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-page')
);

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept();
}
