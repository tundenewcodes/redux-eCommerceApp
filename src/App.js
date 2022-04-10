import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import { useSelector, useDispatch } from 'react-redux'
import React, { Fragment, useEffect } from 'react'
//import { uiActions } from './store/uiSlice'
import Notification from './components/UI/Notification'
import {
  sendCartData,
  fetchCartData,
} from './store/cartSlice-Actions'

let isInitial = true
function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible)
  const cartItems = useSelector((state) => state.cart)
  const notification = useSelector((state) => state.ui.notification)
  const dispatch = useDispatch()
  useEffect(() => {
  dispatch(fetchCartData)
},[dispatch])
  useEffect(() => {

dispatch(sendCartData(cartItems))

     if (isInitial) {
       isInitial = false
       return
     }

    
  }, [cartItems, dispatch])
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  )
}

export default App
