import { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Drawer from './Components/appDrawer'
import Login from './Components/Login'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { storeInfoInRedux } from './Redux/Actions'
import { useHistory, Redirect } from 'react-router-dom'


function App() {

  // const dispatch = useDispatch()
  // const history = useHistory()

  // const user = useSelector((state) => {
  //   if (state) {
  //     return state.user
  //   }
  // })

  // useEffect(() => {
  //   if (history) {
  //     history.push("/Home")

  //   }

  // }, [])

  // if (localStorage.getItem("userEmail")) {

  //   console.log(localStorage.getItem("userEmail"))
  //   axios({
  //     method: "post",
  //     url: "http://localhost:8080/gotToken",
  //     data: {
  //       userEmail: localStorage.getItem("userEmail")
  //     }
  //   }).then((response) => {
  //     console.log(response.data)
  //     dispatch(storeInfoInRedux(response.data))
  //     // history.push('/Home')

  //   })
  //}
  //   axios({
  //     method: "post",
  //     url: "http://localhost:8080/gotToken",
  //     data: {
  //       token: localStorage.getItem("noterToken")
  //     }
  //   }).then((response) => {
  //     console.log(response.body)
  //   })
  // }


  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/Home" component={Drawer} />
      </BrowserRouter>
    </div>
  );
}

export default App;
