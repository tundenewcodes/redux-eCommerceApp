import { uiActions } from './uiSlice'
import { cartActions } from './cartSlice'


export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://foodmeal-app-default-rtdb.firebaseio.com/cart-items.json') 
            if (!response.ok) {
            throw new Error ('could not fetch cart data')
            }
            const data = await response.json()
            return data
        }

        try {
          const cartData = await fetchData()
          dispatch(
            cartActions.replaceCart({
              items: cartData.items || [],
              totalQuantity: cartData.totalQuantity,
            })
          )
        } catch (error) {
          dispatch(
            uiActions.showNotification({
              status: 'error',
              title: 'Error!',
              message: 'Fetching cart data failed!',
            })
          )
        }
    }


}


export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    )

    const sendRequest = async () => {
      const response = await fetch(
        'https://foodmeal-app-default-rtdb.firebaseio.com/cart-items.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      )

      if (!response.ok) {
        throw new Error('Sending cart data failed.')
      }
    }

    try {
      await sendRequest()

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      )
    }
  }
}
