import { useEffect, useState } from 'react'
import styles from './styles/Top.module.scss'
import Image from 'next/image'
import Link from 'next/link';
import Kv from '../assets/images/berger.png'
import logo from '../assets/images/logo.png'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { HamburgerMenu,SetMenu,SideMenu,DrinkMenu } from '../components'
import {getHamburgerData,getSetMenuData,getSideMenuData,getDrinkData} from '../lib/fetch'
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Home = ({ burgerProduct, hamburgerCounter, menuProduct, setMenuCounter, sideMenuProduct, sideMenuCounter, drinkProduct, drinkCounter }) => {
  const [cartItem, setCartItem] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = sessionStorage.getItem('cartItem')
      if (item === null) {
        return
      } else {
          const cartData = JSON.parse(item)
          setCartItem(cartData.length)
      }
  } else {
    return
  }
  }, [])

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      const item = sessionStorage.getItem('cartItem')
      if (item === null) {
        return
      } else {
          const cartData = JSON.parse(item)
          setCartItem(cartData.length)
      }
  } else {
    return
  }
  }

  return (
    <div className={styles.container}>
    <div className={styles.header}>
        <div className={styles.logoBx}>
            <Image src={logo} alt="logo" width="35px" height="35px" data-testid="imgTestId" />
        </div>
        <div className={styles.toCart}>
            <Link href={'/cart'}>
                <a data-testid='cart'>
                    <IconButton aria-label="cart">
                        <StyledBadge badgeContent={cartItem} color="secondary">
                            <ShoppingCartIcon className={styles.cartIcon} />
                        </StyledBadge>
                    </IconButton>
                </a>
            </Link>
        </div>
    </div>
    <div className={styles.kv}>
        <div className={styles.left}>
            <div className={styles.copyBx}>
                <h1>Tbilisi<br />burger</h1>
                <p>ヨーロッパのチーズと国産牛肉を１００％使用</p>
                <div className={styles.btn}><a href="#hamburger">メニューへ</a></div>
            </div>
        </div>
        <div className={styles.right}><p>burger</p></div>
        <div className={styles.imagesBx}>
            <Image src={Kv} alt="kv" layout="fill" objectFit="contain" priority={true} />
        </div>
      </div>
      {burgerProduct.length > 0 ? <HamburgerMenu handleClick={handleClick} burgerProduct={burgerProduct} hamburgerCounter={hamburgerCounter} id="hamburger" /> : <></>}      
      {menuProduct.length > 0 ? <SetMenu handleClick={handleClick} menuProduct={menuProduct} setMenuCounter={setMenuCounter} /> : <></>}
      {sideMenuProduct.length > 0 ? <SideMenu handleClick={handleClick} sideMenuProduct={sideMenuProduct} sideMenuCounter={sideMenuCounter} /> : <></>}
      {drinkProduct.length > 0 ? <DrinkMenu handleClick={handleClick} drinkProduct={drinkProduct} drinkCounter={drinkCounter} /> : <></>}            
    </div>
  )
}
export default Home

export const getStaticProps = async () => {
  const burgerProduct = await getHamburgerData()
  const menuProduct = await getSetMenuData()
  const sideMenuProduct = await getSideMenuData()
  const drinkProduct = await getDrinkData()
  const hamburgerCounter = Array(burgerProduct.length)
  const setMenuCounter = Array(menuProduct.length)
  const sideMenuCounter = Array(sideMenuProduct.length)
  const drinkCounter = Array(drinkProduct.length)
  hamburgerCounter.fill(1)
  setMenuCounter.fill(1)
  sideMenuCounter.fill(1)
  drinkCounter.fill(1)
  return {
    props: { burgerProduct,hamburgerCounter,menuProduct,setMenuCounter,sideMenuProduct,sideMenuCounter,drinkProduct,drinkCounter }
  }
}
