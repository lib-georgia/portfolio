import {useState} from 'react'
import Styles from './Dashboard.module.scss'
import Chart from 'chart.js/auto';
import { Line,Doughnut  } from 'react-chartjs-2';
import { db } from "../../firebaseApp";
import {DashboardLayout} from '../../components'

const Dashboard = ({ allProduct, byDayTotalPrice,hamburger,setMenu,drink,sideMenu }) => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const lastDate = new Date(year, month, 0);
  const days = [...Array(lastDate.getDate()).keys()].map(i => ++i);

  allProduct.sort(function(a,b){
      if(a.quantity>b.quantity) return -1;
      if(a.quantity < b.quantity) return 1;
      return 0;
  });
  
  const option = {
    responsive: true,
    maintainAspectRatio: false,
  }

  let totalSalesPrice = Object.keys(allProduct).reduce((sum, key) => sum + parseInt(allProduct[key].price || 0) , 0);
  const hamburgerTotalPrice = Object.keys(hamburger).reduce((sum, key) => sum + parseInt(hamburger[key].price || 0), 0);
  const setMenuTotalPrice = Object.keys(setMenu).reduce((sum, key) => sum + parseInt(setMenu[key].price || 0), 0);
  const sideMenuTotalPrice = Object.keys(sideMenu).reduce((sum, key) => sum + parseInt(sideMenu[key].price || 0), 0);
  const drinkTotalPrice = Object.keys(drink).reduce((sum, key) => sum + parseInt(drink[key].price || 0), 0);
  
  const fromDb = undefined;
  const hamburgerData = fromDb || [];

  const AllProductSalesDataSort = allProduct.slice(0, 5);
  const hamburgerDataSort = hamburger.slice(0, 5);
  const setMenuDataSort = setMenu.slice(0, 5); 
  const drinkDataSort = drink.slice(0, 5); 
  const othersDataSort = sideMenu.slice(0, 5);
  const rankingData = {
    labels: days,
    datasets: [
      {
        label: "今月の売り上げ",
        data: byDayTotalPrice,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
    ]
  };

  const circleBurgerData = {
    labels: hamburger.map(material => material.name),
    datasets: [
      {
        label: 'Dataset',
        data: hamburger.map(material => material.quantity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const circleSetMenuData = {
    labels: setMenu.map(material => material.name),
    datasets: [
      {
        label: 'Dataset',
        data: setMenu.map(material => material.quantity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const circleDrinkData = {
    labels: drink.map(material => material.name),
    datasets: [
      {
        label: 'Dataset',
        data: drink.map(material => material.quantity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  }; 
  const circleOthersData = {
    labels: sideMenu.map(material => material.name),
    datasets: [
      {
        label: 'Dataset',
        data: sideMenu.map(material => material.quantity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  }; 

  const hamburgerRatio = Math.round(hamburgerTotalPrice / totalSalesPrice * 100) + '%'
  const setMenuRatio = Math.round(setMenuTotalPrice / totalSalesPrice * 100) + '%'
  const sideMenuRatio = Math.round(sideMenuTotalPrice / totalSalesPrice * 100) + '%'
  const drinkRatio = Math.round(drinkTotalPrice / totalSalesPrice * 100) + '%'
  
  const hamburgerOption = {
    centerText: {
      value:hamburgerRatio,
      color: '#FA8800',
      fontSizeAdjust: -0.2
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }
  const setMenuOption = {
    centerText: {
      value: setMenuRatio,
      color: '#FA8800',
      fontSizeAdjust: -0.2
    },
    plugins:{
      legend: {
        display: false,
      },
    },
  }
  const drinkOption = {
    centerText: {
      value: drinkRatio,
      color: '#FA8800',
      fontSizeAdjust: -0.2
    },
    plugins:{
      legend: {
        display: false,
      },
    },
  }
  const othersOption = {
    centerText: {
      value: sideMenuRatio,
      color: '#FA8800',
      fontSizeAdjust: -0.2
    },
    plugins:{
      legend: {
        display: false,
      },
    },
  }

  const [showMoreList, setShowMoreList] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [showInner, setShowInner] = useState("");
  const handleClick = (props) => {
    if (props === "今月") {
      setShowMoreList(true); setShowTitle(props);setShowInner(allProduct)
    } else if (props === "ハンバーガー") {
      setShowMoreList(true);setShowTitle(props);setShowInner(hamburger)
    } else if (props === "セットメニュー") {
      setShowMoreList(true);setShowTitle(props);setShowInner(setMenu)
    } else if (props === "ドリンク") {
      setShowMoreList(true);setShowTitle(props);setShowInner(drink)
    } else if (props === "サイドメニュー") {
      setShowMoreList(true);setShowTitle(props);setShowInner(sideMenu)
    } else {
      setShowMoreList(false); setShowTitle("");setShowInner("")
    }
  }

  const ShowData = (props) => {
    const { showInner } = props
    return (
      <>
        {showInner.length > 0 && (
          showInner.map((list, index) => (
            <li key={index} className={Styles.showMoreListBx}>
              <span className={Styles.ranking}>{index + 1}</span>&nbsp;{list.name}<span className={Styles.quantityBx}>{list.quantity}&nbsp;個</span>
            </li>
          ))
        )} 
      </>
    )
  }

  return (
    <DashboardLayout>
           <div className={Styles.inner}>
             <h2>メニュー</h2>
             <div className={Styles.saleCart}>
               <div className={Styles.borderChart}>
                 <Line data={rankingData} option={option} />
               </div>
               <div className={Styles.AllDataCart}>
                 <div className={Styles.totalSales}>
                   <h3><span className={Styles.monthTotalSales}>今月の総売上げ</span><span className={Styles.priceBx}><span className={Styles.totalSalesPrice}>{totalSalesPrice.toLocaleString()}</span>円</span></h3>
                 </div>
                 <h3>今月の人気商品</h3>
                 <ul>
                   {(() => {
                    if (AllProductSalesDataSort.length === 0) {
                      return <p className={Styles.noneData}>データがありません。</p>
                    } else {
                      return <>
                      {AllProductSalesDataSort.length > 0 && (
                    AllProductSalesDataSort.map((list, index) => (
                      <li key={index}><span className={Styles.ranking}>{index + 1}</span>&nbsp;{list.name}<span className={Styles.quantityBx}>{list.quantity}&nbsp;個</span></li>
                    ))
                  )}
                      </>
                    }
                  })()}
                </ul>
                {(() => {
                  if (allProduct.length > 5) {
                    return <p className={Styles.moreBtn} onClick={() => handleClick("今月")}>もっと見る</p>
                  } else {
                    return <></>
                  }
                })()}
              </div>
            </div>
            <ul className={Styles.chartBx}>
              <li>
                <span className={Styles.ovf}>
                  <span className={Styles.left}>
                    <h4>ハンバーガー</h4>
                    {(() => {
                      if (hamburgerDataSort.length === 0) {
                        return <p className={Styles.noneData}>データがありません。</p>
                      } else {
                        return <span className={Styles.productBx}>
                          {hamburgerDataSort.length > 0 && (
                            hamburgerDataSort.map((list, index) => (
                              <p key={index}><span className={Styles.colorBx}></span>&nbsp;{list.name}<span className={Styles.quantityBx}>{list.quantity}&nbsp;個</span></p>
                            ))
                          )}
                          {(() => {
                            if (hamburgerData.length > 5) {
                              return <p className={Styles.moreBtn} onClick={() => handleClick("ハンバーガー")}>もっと見る</p>
                            } else {
                              return <></>
                            }
                          })()}
                        </span>
                      }
                    })()}
                  </span>
                  <span className={Styles.right}>
                    <Doughnut data={circleBurgerData} options={hamburgerOption} />
                  </span>
                </span>
              </li>
              <li>
                <span className={Styles.ovf}>
                  <span className={Styles.left}>
                    <h4>セットメニュー</h4>
                    {(() => {
                      if (setMenuDataSort.length === 0) {
                        return <p className={Styles.noneData}>データがありません。</p>
                      } else {
                        return <span className={Styles.productBx}>
                          {setMenuDataSort.length > 0 && (
                            setMenuDataSort.map((list, index) => (
                              <p key={index}><span className={Styles.colorBx}></span>&nbsp;{list.name}<span className={Styles.quantityBx}>{list.quantity}&nbsp;個</span></p>
                            ))
                          )}
                          {(() => {
                            if (setMenu.length > 5) {
                              return <p className={Styles.moreBtn} onClick={() => handleClick("セットメニュー")}>もっと見る</p>
                            } else {
                              return <></>
                            }
                          })()}
                        </span>
                      }
                    })()}
                  </span>
                  <span className={Styles.right}>
                    <Doughnut data={circleSetMenuData} options={setMenuOption} />
                  </span>
                </span>
              </li>
              <li>
                <span className={Styles.ovf}>
                  <span className={Styles.left}>
                    <h4>ドリンク</h4>
                    {(() => {
                      if (drinkDataSort.length === 0) {
                        return <p className={Styles.noneData}>データがありません。</p>
                      } else {
                        return <span className={Styles.productBx}>
                          {drinkDataSort.length > 0 && (
                            drinkDataSort.map((list, index) => (
                              <p key={index}><span className={Styles.colorBx}></span>&nbsp;{list.name}<span className={Styles.quantityBx}>{list.quantity}&nbsp;個</span></p>
                            ))
                          )}
                          {(() => {
                            if (drink.length > 5) {
                              return <p className={Styles.moreBtn} onClick={() => handleClick("ドリンク")}>もっと見る</p>
                            } else {
                              return <></>
                            }
                          })()}
                        </span>
                      }
                    })()}
                  </span>
                  <span className={Styles.right}>
                    <Doughnut data={circleDrinkData} options={drinkOption} />
                  </span>
                </span>
              </li>
              <li>
                <span className={Styles.ovf}>
                  <span className={Styles.left}>
                    <h4>サイドメニュー</h4>
                    {(() => {
                      if (othersDataSort.length === 0) {
                        return <p className={Styles.noneData}>データがありません。</p>
                      } else {
                        return <span className={Styles.productBx}>
                          {othersDataSort.length > 0 && (
                            othersDataSort.map((list, index) => (
                              <p key={index}><span className={Styles.colorBx}></span>&nbsp;{list.name}<span className={Styles.quantityBx}>{list.quantity}&nbsp;個</span></p>
                            ))
                          )}
                          {(() => {
                            if (sideMenu.length > 5) {
                              return <p className={Styles.moreBtn} onClick={() => handleClick("サイドメニュー")}>もっと見る</p>
                            } else {
                              return <></>
                            }
                          })()}
                        </span>
                      }
                    })()}
                  </span>
                  <span className={Styles.right}>
                    <Doughnut data={circleOthersData} options={othersOption} />
                  </span>
                </span>
              </li>
            </ul>
          </div>
          {showMoreList ?
            <div className={Styles.showMoreList}>
              <div className={Styles.showMoreListInner}>
                <h2>{showTitle}の人気商品</h2>
                <ul>
                  <ShowData showInner={showInner} />
                </ul>
                <div className={Styles.closeBtn} onClick={() => handleClick("")}>閉じる</div>
              </div>
            </div> :
            <></>
          }
    </DashboardLayout>
  )
}

export default Dashboard

export async function getStaticProps() {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const lastDate = new Date(year, month, 0);
  const days = Number(lastDate.getDate());
  const a5 = Array(days);
  a5.fill(0);
  let allProduct = [];
  let byDayTotalPrice = a5;

  const byDayTotalPriceRef = await db.collection('monthTotalPrice').doc(`${year}`).collection(`${month}`).get();
  byDayTotalPriceRef.docs.map((doc) => {
    const data = doc.data().price;
    byDayTotalPrice[doc.id] = (data);
  });

  const allProductRef = await db.collection('sales').doc(`${year}`).collection(`${month}`).get();
  allProductRef.docs.map((doc) => {
    const data = { name: doc.data().name, quantity: doc.data().quantity, category: doc.data().category, price: (doc.data().price * doc.data().quantity) }
    allProduct.push(data);
  });

  let hamburger = allProduct.filter(function (list) {
    return list.category === 'hamburger'
  })
  hamburger.sort(function(a,b){
    if(a.quantity>b.quantity) return -1;
    if (a.quantity < b.quantity) return 1;
    return 0;
  });

  const setMenu = allProduct.filter(function (list) {
    return list.category === 'setMenu'
  })
  setMenu.sort(function(a,b){
    if(a.quantity>b.quantity) return -1;
    if(a.quantity < b.quantity) return 1;
    return 0;
  });
  const drink = allProduct.filter( function (list) {
    return list.category === 'drink'
  })
  drink.sort(function(a,b){
    if(a.quantity>b.quantity) return -1;
    if(a.quantity < b.quantity) return 1;
    return 0;
  });
  const sideMenu = allProduct.filter( function (list) {
    return list.category === 'sideMenu'
  })
  sideMenu.sort(function(a,b){
    if(a.quantity>b.quantity) return -1;
    if(a.quantity < b.quantity) return 1;
    return 0;
  });

  return {
    props: {
      allProduct,
      byDayTotalPrice,
      hamburger,
      setMenu,
      drink,
      sideMenu
    },
  };
}