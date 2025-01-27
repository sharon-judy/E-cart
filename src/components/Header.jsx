import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { searchProduct } from '../Redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';



function Header({insideHome}) {
  const userWishList=useSelector(state=>state.wishlistReducer)
  const userCart=useSelector(state=>state.cartReducer)

  const dispatch = useDispatch()
  return (
   <>
        <Navbar className="bg-primary position-fixed top-0 w-100" style={{zIndex:'10'}} >
      <Container >
        <Navbar.Brand className='text-white fw-bold fs-2'><Link to={'/'} className='text-white fw-bold  text-decoration-none '><i className="fa-solid fa-store me-3"></i>Fashion Store </Link> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
          
           { 
           insideHome &&
            <Nav.Link className='me-5 mt-2' >
                <input onChange={(e)=>dispatch(searchProduct(e.target.value.toLowerCase()))} type="text" className='form-control rounded' style={{width:'350px'}} placeholder='enter the product name here!!' />
            </Nav.Link>
            }

            <Nav.Link className='mt-2' >
            <Link  to={'/Wishlist'}  className='me-5'  ><i className="fa-solid fa-heart text-danger fa-xl"></i> <Badge bg="secondary">{userWishList?.length}</Badge></Link>
'
            <Link to={'/Cart'}  ><i className="fa-solid fa-cart-shopping text-dark fa-xl"></i> <Badge bg="secondary">{userCart?.length}</Badge></Link>
            </Nav.Link>

        
         
       
        
      </Container>
    </Navbar>
    
   </>
  )
}

export default Header