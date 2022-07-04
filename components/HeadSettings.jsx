import Head from 'next/head'
import Thumbnail from '../assets/images/thumbnail_img.jpg'

const HeadSettings = (props) => {
  const { router } = props
  const pathName = router.pathname

  const titles = () => {
    if (pathName.indexOf('/dashboard') !== -1) {
      return 'ダッシュボード'
    } else if(pathName.indexOf('/cart') !== -1){
      return 'カートページ'
    } else {
      return 'トビリシの人気料理店'
    }
  }

  const descriptionContents = () => {
    if (pathName.indexOf('/dashboard') !== -1) {
      return 'トビリシバーガー、スタッフ専用ページ'
    } else if(pathName.indexOf('/cart') !== -1){
      return 'トビリシバーガー、カートページ'
    } else {
      return 'ジョージアで人気ナンバー１に輝いた幻のジョージア牛を使用したハンバーガーショップのトビリシバーガー！バトゥミやカヘティ地方で取れた新鮮な野菜を使用した１００％ジョージア産のハンバーガー。'
    }    
  }

  
  return (
    <Head>
    <title>Tbilisi Burger&nbsp;|&nbsp;{titles()}</title>
    <meta name="description" content={descriptionContents()} />
    <link rel="icon" href="/favicon.ico" />
    <link href="https://fonts.googleapis.com/css2?family=Paytone+One&display=swap" rel="stylesheet" />
    <meta name="robots" content="noindex"></meta>
    <meta property="og:url" content="https://portfolio-virid-rho-27.vercel.app/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={titles()} />
    <meta property="og:description" content={descriptionContents()} />
    <meta property="og:site_name" content="トビリシバーガー" />
    <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/hamburger-shop-45f18.appspot.com/o/images%2Fhamburger-shop.png?alt=media&token=44b92581-10ac-4b01-9acf-07648735e6d3" />
    </Head>
  )   
}
export default HeadSettings