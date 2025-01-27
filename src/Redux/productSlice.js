import { createAsyncThunk, createSlice, isPending } from "@reduxjs/toolkit";
import axios from "axios";


// createAsyncThunk("action string,()=>{}")-----in react for asyn fuction we use createAsyncThunk (api calls are in aysn fun)
// createAsyncThunk has capability to return promise

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {

    const result = await axios.get('https://dummyjson.com/products')
    localStorage.setItem("allProducts",JSON.stringify(result.data.products))

    return result.data.products
})

const productSlice = createSlice({
    name: "products",
    initialState: {
        allProducts: [],
        dummyAllProducts:[],
        pending:false,
        error:""


    },
    reducers: {

        searchProduct:(state,action)=>{

           state.allProducts = state.dummyAllProducts.filter(item=>item.title.toLowerCase().includes(action.payload))

        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{

            state.allProducts=action.payload
            state.dummyAllProducts=action.payload
            state.pending=false
            state.error=""



        })
        builder.addCase(fetchProducts.pending,(state,action)=>{

            state.allProducts=[]
            state.pending=true
            state.error=""



        })
        builder.addCase(fetchProducts.rejected,(state,action)=>{

            state.allProducts=[]
            state.pending=false
            state.error="api call failed .. please try after sometimes"



        })

    }
})

export default productSlice.reducer
export const {searchProduct}=productSlice.actions