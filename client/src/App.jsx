import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import CreateTodo from "./pages/CreateTodo";
import SingleCar from './pages/SingleCar';
import UpdateCar from './pages/UpdateCar';
import Login from './pages/Login';
import { Provider as ReduxProvider } from 'react-redux';
import {store} from "./redux/store"
import Signup from './pages/Signup';
import MyCars from './pages/MyCars';

function App() {
  
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path = "/" element={<Home/>} />
          <Route exact path = "/login" element={<Login/>} />
          <Route exact path = "/signup" element={<Signup/>} />
          <Route exact path = "/my-cars" element={<MyCars/>} />
          <Route exact path = "/cars/:id" element={<SingleCar/>} /> 
          <Route exact path = "/add-car" element={<CreateTodo/>} />
          <Route exact path = "/update-car/:id" element={<UpdateCar/>} />
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  )
}

export default App
