import './App.css';
import Login from "./components/login";
import 'bootstrap/dist/css/bootstrap.min.css';
import {RouterProvider,createBrowserRouter} from "react-router-dom";
import UserProfiles from "./components/UserProfiles";
import User from './components/User';

function App() {
    const AppRoute = createBrowserRouter([
    {
        path:"/",
            element: <Login/>
    },
        {
            path:"/profile",
            element: <UserProfiles/>
        },
        {
            path:"/profile/:id",
            element: <User/>
        }

    ])
  return (
    <>
        <RouterProvider router={AppRoute}></RouterProvider>
    </>
  );
}

export default App;
