import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Authenticate from './Pages/Authentication/authenticate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Authenticate type="login" />} />
        <Route path="/register" element={<Authenticate type="register" />} />
      </Routes>
    </Router>
  );
}

export default App;
