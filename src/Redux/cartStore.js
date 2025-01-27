import { configureStore } from "@reduxjs/toolkit";
import productSlice from './productSlice'
import wishlistSlice from './wishlist'
import cartSlice from './cartSlice'

const cartStore=configureStore({
    reducer:{
        productReducer:productSlice,
        wishlistReducer:wishlistSlice,
        cartReducer:cartSlice
       
    }
})

export default cartStore