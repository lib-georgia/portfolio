import fetch from 'node-fetch'

export const getHamburgerData = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}/getHamburger/`)
  )
  const hamburger = await res.json()
  return hamburger
}

export const getSetMenuData = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}/getSetMenu/`)
  )
  const setMenu = await res.json()
  return setMenu
}

export const getSideMenuData = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}/getSideMenu/`)
  )
  const sideMenu = await res.json()
  return sideMenu
}

export const getDrinkData = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}/getDrink/`)
  )
  const drink = await res.json()
  return drink
}
