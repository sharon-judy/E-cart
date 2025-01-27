import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishList } from '../Redux/wishlist'
import { addToCart } from '../Redux/cartSlice'




function View() {
        const userWishList=useSelector(state=>state.wishlistReducer)
        const userCart=useSelector(state=>state.cartReducer)

        const[product,setProduct]=useState({})//?..--({})
        console.log(product);
        
    const {id}=useParams()
    const dispatch=useDispatch()
    
    //to get from local storage
    useEffect(() => {
      if(localStorage.getItem("allProducts")){
        const allProducts=JSON.parse(localStorage.getItem("allProducts"))
        setProduct(allProducts.find(item=>item.id==id))
      }
    
    
    }, [])

    const handleWishList=()=>{
        
        const existingProduct =userWishList.find(item=>item.id==product.id)

        if(existingProduct){
            alert("product already in your wishlist")
        }
        else{
            dispatch(addToWishList(product))
        }

    }


    const handleCart=()=>{

         const existingProduct = userCart.find(item=>item.id==product.id)

        if(existingProduct){
            alert("product added to cart")
            dispatch(addToCart(product))
        }
        else{

            dispatch(addToCart(product))

        }


    }
    

    
    
    
    return (
        <>
            <Header />
            <div className='container mt-5' style={{minHeight:'50vh'}}>
                <div className='row'>
                    <div className='col-lg-6'>
                        <img className='rounded w-50' src={product?.thumbnail}  alt="" />
                    </div>
                    <div className='col-lg-6'>
                        <h4>Product: ID:{product?.id}</h4>
                        <h3>{product?.title}</h3>
                        <h3 className='text-danger'>${product?.price}</h3>
                        <p>{product?.description}</p>

                        <div className='d-flex justify-content-between'>
                            <button onClick={handleWishList} className='btn'><i className="fa-solid fa-heart-circle-plus  text-danger fa-xl"></i></button>
                            <button onClick={handleCart} className='btn'><i className="fa-duotone fa-solid fa-cart-plus text-success fa-xl"></i></button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default View