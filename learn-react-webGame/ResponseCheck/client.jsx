const React = require('react');
const ReactDOM = require('react-dom');
import ResponseCheck from './ResponseCheck';


const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <React.StrictMode>
        <ResponseCheck/>
    </React.StrictMode>
    );