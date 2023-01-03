import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/home';
import About from './pages/howitworks';
import Navbar from './components/Navbar';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <header className="App-header">
      <Router>
        <Routes>
            {/* Render the login component alone if we're on /login */}
            <Route path="/about" component={<About/>} />

            {/* Otherwise, render the Landing component */}
            <Route path="" component={<Home/>} />
        </Routes>
      </Router>

      </header>


    </div>
  );
}

export default App;
