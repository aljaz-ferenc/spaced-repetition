import "./App.css";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home, { homeLoader } from "./pages/Home";
import Review, { reviewLoader } from "./pages/Review";
import CreateCards from "./pages/CreateCards";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import HowItWorks from "./pages/HowItWorks";


function App() {
  const isLoggedIn = useSelector(state => state.login)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorPage/>} path="/" element={isLoggedIn ? <Layout /> : <Login />}>
        <Route 
        index 
        element={isLoggedIn ? <Home /> : <Login />} 
        loader={homeLoader}
        />
        <Route loader={reviewLoader} path="review/:deck" element={isLoggedIn ? <Review /> : <Login />}>
        </Route>
        <Route
          path="create-cards"
          element={isLoggedIn ? <CreateCards /> : <Login />}
        />
        <Route path="how-it-works" element={<HowItWorks/>}/>
      </Route>
    )
  );

  return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
  );
}

export default App;