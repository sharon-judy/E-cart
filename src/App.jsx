
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import View from './pages/View'





function App() {
  

  return (
    <>


      
      
      <Routes>
        <Route path={'/'} element={<Home/>} />
        <Route path={'/Wishlist'} element={<Wishlist/>} />
        <Route path={'/Cart'} element={<Cart/>} />
        <Route path={'/View/:id'} element={<View/>} />   
        


      </Routes>

      <Footer/>

        
    </>
  )
}

export default App
