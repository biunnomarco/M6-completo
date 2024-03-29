import './App.css';
import MyNav from './Components/MyNav/MyNav';
import Homepage from './Components/Pages/Homepage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetails from '../src/Components/PostDetails/PostDetail'
import SingleAuthorPage from './Components/Pages/SingleAuthorPage';
import Login from './Components/Pages/Login';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import AllAuthors from './Components/Pages/AllAuthors';
import Footer from './Components/Footer/Footer'



function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path='/login' element={<Login />} />

        <Route element={<ProtectedRoutes />} >
          <Route path='/postDetails/:id' element={<PostDetails />} />
          <Route path='/authors/:id' element={<SingleAuthorPage />} />
          <Route path='/authors' element={<AllAuthors />} />
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
