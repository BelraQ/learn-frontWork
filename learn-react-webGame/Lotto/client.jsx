const React = require('react');
const ReactDOM = require('react-dom');
import Lotto from './Lotto';


const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <React.StrictMode>
        <Lotto/>
    </React.StrictMode>
    );