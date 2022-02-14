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
import Profile from './screens/Profile';
import Register from './screens/Register';
import Postings from './screens/Postings';
import Header from './components/Header'
import NewPost from './screens/NewPost'
import { RequireToken } from './Auth';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import store from './app/store'
import {Provider} from 'react-redux'

const options = {
  position: 'top center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}

export default function App() {
  return (
    <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<RequireToken><Profile/></RequireToken>}/>
          <Route path="/newpost" element={<RequireToken><NewPost/></RequireToken>}/>
          <Route path="post/:title" element={<Postings/>}/>
          <Route path="*" element={<Home/>}/>
          {/* <Redirect render={() => <Redirect to={{pathname: "/"}} />}/> */}
        </Routes>
      </BrowserRouter>
    </AlertProvider>
    </Provider>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
