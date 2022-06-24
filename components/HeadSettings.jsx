import Head from 'next/head'
import {Thumbnail} from '../assets/images/thumbnail_img.jpg'

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

  const noINdex = () => {
    if(router.pathname.includes('/dashboard')){
      return <meta name="robots" content="noindex"></meta>
    } else {
      return <></>
   }
  }
  
  return (
    <Head>
    <title>Tbilisi Burger&nbsp;|&nbsp;{titles()}</title>
    <meta name="description" content={descriptionContents()} />
    <link rel="icon" href="/favicon.ico" />
    <link href="https://fonts.googleapis.com/css2?family=Paytone+One&display=swap" rel="stylesheet" />
    {noINdex()}
      <meta property="description" content={descriptionContents()} />
      <meta property="og:title" content={titles()} />
      <meta property="og:description" content={descriptionContents()} />
      <meta property="og:image" content={Thumbnail} />
      <meta name="twitter:card" content="summary_large_image"/>
    </Head>
  )   
}
export default HeadSettings