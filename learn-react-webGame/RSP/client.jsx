const React = require('react');
const ReactDOM = require('react-dom');
import RSP from './RSP';


const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <React.StrictMode>
        <RSP/>
    </React.StrictMode>
    );