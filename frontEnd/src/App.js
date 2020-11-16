
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import { userLoggedIn } from './Redux/Actions'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import './App.css'



function App() {


  const dispatch = useDispatch()
  const history = useHistory()



  if (localStorage.getItem("userGoogleId")) {
    const googleId = localStorage.getItem("userGoogleId")
    const userInfo = {
      profileObj: {
        googleId: googleId
      }

    }

    dispatch(userLoggedIn(userInfo))

  }



  return (
    <div className="App">


      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/Home" component={Home} />
      </BrowserRouter>

    </div>
  );
}

export default App;
