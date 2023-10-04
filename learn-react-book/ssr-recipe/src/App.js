import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ReactDOM } from 'react';
import Main 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
