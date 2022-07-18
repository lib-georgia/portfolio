import React, { useState } from 'react';
import Style from './DrinkMenu.module.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drink from '../../assets/images/cup.png'
import Counter from '../Kit/Counter'

const DrinkMenu = (props) => {
    let {drinkProduct, drinkCounter,handleClick} = props;
    const [counter, setCounter] = useState(drinkCounter);
    const images = Drink;
    const category = 'drink';

    const addCart = (id, name, images, price, counter, category) => {
        const cart = [];
        const data = {
            id: id,
            name: name,
            images: images.src,
            price: price,
            count:counter,
            category:category
        }
        if (typeof window !== 'undefined') {
            const item = sessionStorage.getItem('cartItem')
            if (item === null) {
                cart.push(data)
                sessionStorage.setItem('cartItem', JSON.stringify(cart));
            } else {
                const cartData = JSON.parse(item)
                cartData.push(data)
                sessionStorage.setItem('cartItem',JSON.stringify(cartData));
            }
        } else {

        }
    }

    return (
        <div className={Style.drinkBx}>
            <div className={Style.ttlBx}>
                <h2 className={Style.ttl}>
                    Drink
                    <span>お飲み物</span>
                </h2>
            </div>
            <div className={Style.ovf}>
                <ul className={Style.productBx}>
                    {/* <RecommendContents /> */}
                    {drinkProduct.length > 0 && (drinkProduct.map((list,index) => (
            <li key={index} className={Style.productList}>
                <h4 className={Style.productTtl}>{list.name}</h4>
                <Counter value={counter[index]} onIncrement={() => { const countersCopy = [...counter]; countersCopy[index] += 1; setCounter(countersCopy); }} onDecrement={() => { const countersCopy = [...counter]; countersCopy[index] -= 1; setCounter(countersCopy); }} />
                <span className={Style.priceAndCartBx}>
                    <p>￥{(counter[index] * list.price).toLocaleString()}</p>
                    <span className={Style.cart} onClick={() => { addCart(list.id, list.name, images, list.price, counter[index], category); handleClick()}}>
                        <ShoppingCartIcon />
                    </span>
                </span>
            </li>
        )))}
                </ul>
            </div>
        </div>
    )  
}

export default DrinkMenu