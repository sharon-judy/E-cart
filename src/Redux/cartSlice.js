import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({

    name:'userCart',
    initialState:[],
    reducers:{

        addToCart:(state,action)=>{

            const existingProduct = state.find(item=>item.id==action.payload.id)

            if(existingProduct){

                const remainingProduct=state.filter(item=>item.id!=existingProduct.id)
                existingProduct.quantity++
                existingProduct .totalPrice=existingProduct.quantity*existingProduct.price
                state=[...remainingProduct,existingProduct]

            }
            else{

                state.push({...action.payload,quantity:1,totalPrice:action.payload.price})
            }
            
        },
        increment:(state,action)=>{
            
            const incrementProduct = state.find(item=>item.id==action.payload)//why we dont give payload .id here
            const remainingProduct=state.filter(item=>item.id!=incrementProduct.id)
            incrementProduct.quantity++
            incrementProduct.totalPrice=incrementProduct.quantity*incrementProduct.price

            state=[...remainingProduct,incrementProduct]


        },
        decrement:(state,action)=>{
            
            const decrementProduct = state.find(item=>item.id==action.payload)//why we dont give payload .id here
            const remainingProduct=state.filter(item=>item.id!=decrementProduct.id)
            decrementProduct.quantity--
            decrementProduct.totalPrice=decrementProduct.quantity*decrementProduct.price

            state=[...remainingProduct,decrementProduct]


        },
        removeCartItem:(state,action)=>{

            return  state.filter(item=>item.id!=action.payload)
  
  
              
          },
          emptyCart:(state)=>{
           return  state=[]
          }

  



    }
})


export const {addToCart,increment,decrement,removeCartItem,emptyCart}=cartSlice.actions

export default cartSlice.reducer