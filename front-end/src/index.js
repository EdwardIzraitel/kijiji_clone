import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Postings from './screens/Postings';

export default function App(){
  return(

    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="post/:title" element={<Postings/>}/>
      </Routes>
    </BrowserRouter>
  )
  
}
ReactDOM.render(<App />, document.getElementById("root"));