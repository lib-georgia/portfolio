import React, { useState } from 'react'
import Style from './Hamburger.module.scss'
import Image from 'next/image'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Counter from '../Kit/Counter'

const HamburgerMenu = (props) => {
  let { burgerProduct, hamburgerCounter,handleClick,id } = props
  const [counter, setCounter] = useState(hamburgerCounter)
  const category = 'hamburger'

  const addCart = (id, name, images, price, counter, category) => {
    const cart = []
    const data = {
      id: id,
      name: name,
      images: images,
      price: price,
      count: counter,
      category: category,
    }
    if (typeof window !== 'undefined') {
      const item = sessionStorage.getItem('cartItem')
      if (item === null) {
        cart.push(data)
        sessionStorage.setItem('cartItem', JSON.stringify(cart))
      } else {
        const cartData = JSON.parse(item)
        cartData.push(data)
        sessionStorage.setItem('cartItem', JSON.stringify(cartData))
      }
    } else {
    }
  }

  return (
    <div className={Style.HamburgerBx} id={id}>
      <div className={Style.ttlBx}>
        <h2 className={Style.ttl}>Hamburger
          <span>ハンバーガー</span>
        </h2>
      </div>
      <div className={Style.ovf}>
        <ul className={Style.productBx}>
          {burgerProduct.length > 0 &&
            burgerProduct.map((list, index) => (
              <li key={index} className={Style.productList}>
                <span className={Style.imageBx}>
                  <Image
                    src={list.images}
                    alt="kv"
                    layout="fill"
                    objectFit="contain"
                    priority={true}
                  />
                </span>
                <h4 className={Style.productTtl}>{list.name}</h4>
                <span className={Style.ovf}>
                  <Counter
                    value={counter[index]}
                    onIncrement={() => {
                      const countersCopy = [...counter]
                      countersCopy[index] += 1
                      setCounter(countersCopy)
                    }}
                    onDecrement={() => {
                      const countersCopy = [...counter]
                      countersCopy[index] -= 1
                      setCounter(countersCopy)
                    }}
                  />
                  <span className={Style.priceAndCartBx}>
                    <p>￥{(counter[index] * list.price).toLocaleString()}</p>
                  <span
                    className={Style.cart}
                    onClick={() => {
                      addCart(
                        list.id,
                        list.name,
                        list.images,
                        list.price,
                        counter[index],
                        category
                      )
                      handleClick()
                    }}
                  >
                    <ShoppingCartIcon />
                  </span>
                  </span>
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
export default HamburgerMenu
