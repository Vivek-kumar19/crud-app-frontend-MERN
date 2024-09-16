import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './App.css';
import User from "./components/getUser/User";
import AddUser from "./components/addUser/AddUser";
import UpdateUser from "./components/updateUser/UpdateUser";

function App() {

  const route = createBrowserRouter([
    {
      path:"/",
      element:<User/>
    },
    {
      path:"/add",
      element: <AddUser/>
    },
    {
      path:"/edit/:id",
      element:<UpdateUser/>
    },
  ])

  return (
        <div className="layout">
      <RouterProvider router={route}>

      </RouterProvider>
        </div>
  );
}

export default App;
