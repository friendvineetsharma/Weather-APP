import {Route, Routes} from 'react-router-dom';
import { Dashboard } from './Components/Dashboard'
import { Login } from './Components/Login'

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
}

function App() {
  const token = getToken();

  if(!token) {
    return <Login/>
  }
  return (
    <div className="wrapper">
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;