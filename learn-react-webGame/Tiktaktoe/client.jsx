const React = require('react');
const ReactDOM = require('react-dom');
import Tiktaktoe from './Tiktaktoe';


const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <React.StrictMode>
        <Tiktaktoe/>
    </React.StrictMode>
    );