import { BrowserRouter, Route } from 'react-router-dom'
import Drawer from './Components/appDrawer'
import Login from './Components/Login'


function App() {
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
