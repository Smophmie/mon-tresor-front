import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Homepage from './views/Homepage';
import Header from './components/header';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
        </Routes>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
