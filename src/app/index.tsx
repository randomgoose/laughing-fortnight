import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {RecoilRoot} from 'recoil';

ReactDOM.render(
    <Provider store={store}>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </Provider>,
    document.getElementById('react-page')
);

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept();
}
