
import './App.css';
import React,{useContext,useEffect} from 'react';
import {DataContext} from "./Components/DataProvider/DataProvider.jsx";
import {Type} from './Utility/action.type.js';
import {auth} from './Utility/firebase.js'


import Routing from "./Router.jsx"
function App() {
  const [{user},dispatch]=useContext(DataContext);
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // console.log(authUser)
        dispatch({
          type:Type.SET_USER,
          user: authUser,
        });
      }else{
        dispatch({
          type:Type.SET_USER,
          user: null,
        });
      }
    })
  },[])
  return (
    <div className="App">
     <Routing />
    </div>
  );
}

export default App;
