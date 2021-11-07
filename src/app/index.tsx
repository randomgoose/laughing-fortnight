import {ChakraProvider} from '@chakra-ui/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <ChakraProvider>
        <App />
    </ChakraProvider>,
    document.getElementById('react-page')
);

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept();
}
