import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import RoutingNavigation from "./navigation/RoutingNavigation";
import ErrorPage from "./pages/ErrorPage";
import "../../shop-admin-panel/src/common/axios.interceptor";

//import MyMap from "./components/MyMap";

//import Addform from "./pages/form";
function App() {
  return (
    <div className="App">
      <ToastContainer />
       <RoutingNavigation /> 
       {/* <MyMap/>  */}
    
       
    </div>
  );
}

export default App;
