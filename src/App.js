import './App.css';
import Routes from './Routes';
import UserContextProvider from './components/UserContext';
import {BrowserRouter as Router} from "react-router-dom";
import NavBar from './navbar/NavBar';





function App() {

  
  return (
    <>

    <UserContextProvider>

        <Router>

          <NavBar/>

          <div className="container">

            <Routes />

          </div>
        </Router>

    </UserContextProvider>

    </>

  );

}

export default App;