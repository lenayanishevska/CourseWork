import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './Components/Navbar/Navbar'
import { Home } from './Pages/Home/Home'
import { GenderCategory } from './Pages/GenderCategory/GenderCategory'
import { AboutUs } from './Pages/AboutUs/AboutUs'
import { ProductDetail } from './Pages/ProductDetail/ProductDetail'
import { Cart } from './Pages/Cart/Cart'
import { Login } from './Pages/Login/Login'
import { Registration } from './Pages/Registration/Registration'
import { Profile } from './Pages/Profile/Profile'
import { Admin } from './Pages/Admin/Admin';
import { Page } from './Pages/Page';
import { OrderInfo } from './Pages/OrderInfo/OrderInfo'
import { useDispatch, useSelector} from 'react-redux';

function App() {
  const user = useSelector(state => state.userLogin.userInfo);
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        {/* <Route path="/products/:category/:subcategory" element={<GenderCategory />}></Route> */}
        <Route path="/products/:category" element={<GenderCategory />}></Route>
        <Route path='/aboutUs' element={<AboutUs/>}></Route>
        {/* <Route path='/products/:category/:subcategory/:productId' element={<ProductDetail/>}></Route> */}
        <Route path='/products/:category/:productId' element={<ProductDetail/>}></Route>

        <Route path='/cart' element={user ? <Cart/> : <Login></Login>}></Route>
        <Route path='/orderInfo' element={user ? <OrderInfo/>: <AboutUs></AboutUs>}></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/profile' element={user ? <Profile/> : <Login></Login>} ></Route>
        <Route path='/registration' element={ <Registration/>}></Route>
        <Route path='/admin' element={user && user.data.is_admin ? <Admin/>:<AboutUs></AboutUs>}></Route>
        <Route path='/pages/:alias' element={<Page/>}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
