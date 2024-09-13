import styles from './ProductComp.css'
import App from '../../../App'


const ProductComp = (props) => {
    return (
      <div className="product-card">
        <h1>{props.title}</h1>
        <img src={props.productImg} height={200} width={150}></img>
        <div className='color-container'>
            <h3>Choose color: </h3>
            <div id='color-1' className='color-each'></div>
            <div id='color-2' className='color-each'></div>
            <div id='color-3' className='color-each'></div>
            <div id='color-4' className='color-each'></div>
        </div>
        <h2>{props.price}</h2>
      </div>
    )
}


export default ProductComp