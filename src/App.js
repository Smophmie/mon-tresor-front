import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './views/Homepage';
import Login from './views/Login';
import Header from './components/header';
import Register from './views/Register';
import Transactions from './views/Transactions';
import HomepageConnectedUser from './components/HomepageForConnectedUser';

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/transactions" element={<Transactions />}></Route>
        </Routes>
        {/* <Footer /> */}
      </Router>
  );
}

export default App;
