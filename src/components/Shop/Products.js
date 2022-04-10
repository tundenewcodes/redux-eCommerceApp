import ProductItem from './ProductItem'
import classes from './Products.module.css'
const DUMMY_DATA = [
  {
    id: 'm1',
    title: 'my first book',
    description: 'first book i ever wrote',
    price: 5,
  },
  {
    id: 'm2',
    title: 'my second book',
    description: 'second book i ever wrote',
    price: 25,
  },
  {
    id: 'm3',
    title: 'my third book',
    description: 'third book i ever wrote',
    price: 15,
  },
]
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2> Buy your favorite products </h2>{' '}
      <ul>
        {' '}
        {DUMMY_DATA.map(product =>
          <ProductItem
            key={product.id}
            id ={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />)}
      </ul>{' '}
    </section>
  )
}

export default Products
