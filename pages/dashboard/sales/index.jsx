import React,{useState,useCallback} from 'react';
import { db } from '../../../firebaseApp';
import Styles from '../Dashboard.module.scss'
import SearchIcon from '@mui/icons-material/Search';
import { Chart as ChartJS } from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2';
import "chartjs-plugin-doughnut-innertext";
import { DashboardLayout,SearchSalesData } from '../../../components'

const Sales = ({ allProduct,hamburger,setMenu,sideMenu,drink,monthAllProduct,monthHamburger,monthSetMenu,monthSideMenu,monthDrink }) => {

    const [todaySales, setTodaySales] = useState(true);
    const [monthSales, setMonthSales] = useState(false);
    const [searchSales, setSearchSales] = useState(false);
    const [s_year, setS_year] = useState("");
    const [s_month, setS_month] = useState("");
    const [s_day, setS_day] = useState("");
    const inputYear = useCallback((event) => { setS_year(event.target.value) }, [setS_year]);
    const inputMonth = useCallback((event) => { setS_month(event.target.value) }, [setS_month]);
    const inputDay = useCallback((event) => { setS_day(event.target.value) }, [setS_day]);

    const [searchSalesProduct, setSearchSalesProduct] = useState("");

    const [choiceToday, setChoiceToday] = useState(true);
    const [choiceMonth, setChoiceMonth] = useState(false);
    const [choiceSearch, setChoiceSearch] = useState(false);

    const AllProductSalesDataSort = allProduct.slice(0, 5);
    const hamburgerSalesDataSort = hamburger.slice(0, 5);
    const setMenuSalesDataSort = setMenu.slice(0, 5); 
    const drinkSalesDataSort = drink.slice(0, 5); 
    const sideMenuSalesDataSort = sideMenu.slice(0, 5);
    const monthAllProductSalesDataSort = monthAllProduct.slice(0, 5);
    const monthHamburgerSalesDataSort = monthHamburger.slice(0, 5);
    const monthSetMenuSalesDataSort = monthSetMenu.slice(0, 5);
    const monthSideMenuSalesDataSort = monthSideMenu.slice(0, 5);
    const monthDrinkSalesDataSort = monthDrink.slice(0, 5); 

    const totalPrice = Object.keys(allProduct).reduce((sum, key) => sum + parseInt(allProduct[key].price || 0) , 0);
    const hamburgerTotalPrice = Object.keys(hamburger).reduce((sum, key) => sum + parseInt(hamburger[key].price || 0), 0);
    const setMenuTotalPrice = Object.keys(setMenu).reduce((sum, key) => sum + parseInt(setMenu[key].price || 0), 0);
    const sideMenuTotalPrice = Object.keys(sideMenu).reduce((sum, key) => sum + parseInt(sideMenu[key].price || 0), 0);
    const drinkTotalPrice = Object.keys(drink).reduce((sum, key) => sum + parseInt(drink[key].price || 0), 0);
    const monthTotalPrice = Object.keys(monthAllProduct).reduce((sum, key) => sum + parseInt(monthAllProduct[key].price || 0) , 0);
    const monthHamburgerTotalPrice = Object.keys(monthHamburger).reduce((sum, key) => sum + parseInt(monthHamburger[key].price || 0), 0);
    const monthSetMenuTotalPrice = Object.keys(monthSetMenu).reduce((sum, key) => sum + parseInt(monthSetMenu[key].price || 0), 0);
    const monthSideMenuTotalPrice = Object.keys(monthSideMenu).reduce((sum, key) => sum + parseInt(monthSideMenu[key].price || 0), 0);
    const monthDrinkTotalPrice =  Object.keys(monthDrink).reduce((sum, key) => sum + parseInt(monthDrink[key].price || 0) , 0);

    const hamburgerRatio = Math.round(hamburgerTotalPrice / totalPrice * 100) + '%'
    const setMenuRatio = Math.round(setMenuTotalPrice / totalPrice * 100) + '%'
    const sideMenuRatio = Math.round(sideMenuTotalPrice / totalPrice * 100) + '%'
    const drinkRatio = Math.round(drinkTotalPrice / totalPrice * 100) + '%'
    const monthHamburgerRatio = Math.round(monthHamburgerTotalPrice / monthTotalPrice * 100) + '%'
    const monthSetMenuRatio = Math.round(monthSetMenuTotalPrice / monthTotalPrice * 100) + '%'
    const monthSideMenuRatio = Math.round(monthSideMenuTotalPrice / monthTotalPrice * 100) + '%'
    const monthDrinkRatio = Math.round(monthDrinkTotalPrice / monthTotalPrice * 100) + '%'

    const allProductOption = {
        centerText: {
          value:'100%',
          color: '#FA8800',
          fontSizeAdjust: -0.2
        },
        plugins: {
          legend: {
            display: false,
          },
        },
    }
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
          value:setMenuRatio,
          color: '#FA8800',
          fontSizeAdjust: -0.2
        },
        plugins: {
          legend: {
            display: false,
          },
        },
    }
    const sideMenuOption = {
        centerText: {
            value:sideMenuRatio,
            color: '#FA8800',
            fontSizeAdjust: -0.2
          },
          plugins: {
            legend: {
              display: false,
            },
          },
    }
    const drinkOption = {
        centerText: {
            value:drinkRatio,
            color: '#FA8800',
            fontSizeAdjust: -0.2
          },
          plugins: {
            legend: {
              display: false,
            },
          },
    }
    const monthAllProductOption = {
        centerText: {
          value:'100%',
          color: '#FA8800',
          fontSizeAdjust: -0.2
        },
        plugins: {
          legend: {
            display: false,
          },
        },
    }
    const monthHamburgerOption = {
        centerText: {
          value:monthHamburgerRatio,
          color: '#FA8800',
          fontSizeAdjust: -0.2
        },
        plugins: {
          legend: {
            display: false,
          },
        },
    }
    const monthSetMenuOption = {
        centerText: {
          value:monthSetMenuRatio,
          color: '#FA8800',
          fontSizeAdjust: -0.2
        },
        plugins: {
          legend: {
            display: false,
          },
        },
    }
    const monthSideMenuOption = {
        centerText: {
            value:monthSideMenuRatio,
            color: '#FA8800',
            fontSizeAdjust: -0.2
          },
          plugins: {
            legend: {
              display: false,
            },
          },
    }
    const monthDrinkOption = {
        centerText: {
            value:monthDrinkRatio,
            color: '#FA8800',
            fontSizeAdjust: -0.2
          },
          plugins: {
            legend: {
              display: false,
            },
          },
    }
    
    const circleAllProductData = {
        labels: allProduct.map(material => material.name),
        datasets: [
          {
            label: 'Dataset',
            data: allProduct.map(material => material.quantity),
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
      }
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
    }
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
    }
    const circleSideMenuData = {
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
    }
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
    }
    const monthCircleAllProductData = {
        labels: monthAllProduct.map(material => material.name),
        datasets: [
          {
            label: 'Dataset',
            data: monthAllProduct.map(material => material.quantity),
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
      }
    const monthCircleBurgerData = {
      labels: monthHamburger.map(material => material.name),
      datasets: [
        {
          label: 'Dataset',
          data: monthHamburger.map(material => material.quantity),
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
    }
    const monthCircleSetMenuData = {
        labels: monthSetMenu.map(material => material.name),
        datasets: [
          {
            label: 'Dataset',
            data: monthSetMenu.map(material => material.quantity),
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
    }
    const monthCircleSideMenuData = {
        labels: monthSideMenu.map(material => material.name),
        datasets: [
          {
            label: 'Dataset',
            data: monthSideMenu.map(material => material.quantity),
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
    }
    const monthCircleDrinkData = {
        labels: monthDrink.map(material => material.name),
        datasets: [
          {
            label: 'Dataset',
            data: monthDrink.map(material => material.quantity),
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
      }

    const [showAllSalesData, setShowAllSalesData] = useState(false),
        [showAllProduct, setShowAllProduct] = useState(false),
        [showHamburger, setShowHamburger] = useState(false),
        [showSetMenu, setShowSetMenu] = useState(false),
        [showSideMenu, setShowSideMenu] = useState(false),
        [showDrink, setShowDrink] = useState(false);
    
    const ShowData = (props) => {
        const {hamburger,setMenu,sideMenu,drink,allProduct,showAllProduct} = props
        if (showAllSalesData === true) {
            return <>
                {(() => {
                    if (showAllProduct === true) { return <h3>全ての商品</h3> }
                    else if (showHamburger === true) { return <h3>ハンバーガー</h3> }
                    else if(showSetMenu === true){return <h3>セットメニュー</h3>}
                    else if(showSideMenu === true){return <h3>サイドメニュー</h3>}
                    else if(showDrink === true){return <h3>ドリンク</h3>}
                    else{return <></>}
                })()}
                <ul>
                    {(() => {
                        if (showAllProduct === true) {
                            return <>{
                                allProduct.map((list, index) => (
                                    <li key={index}><span className={Styles.ranking}>{index + 1}</span>&nbsp;{list.name}<span className={Styles.quantityBx}>{list.quantity}&nbsp;個</span></li>
                                ))
                            }</>
                        } else if (showHamburger === true) {
                            return <>{
                                hamburger.map((list, index) => (
                                    <li key={index}><span className={Styles.ranking}>{index + 1}</span>&nbsp;{list.name}<span className={Styles.quantityBx}>{list.quantity}&nbsp;個</span></li>
                                ))
                            }</>
                        } else if (showSetMenu === true) {
                            return <>{
                                setMenu.map((list, index) => (
                                    <li key={index}><span className={Styles.ranking}>{index + 1}</span>&nbsp;{list.name}<span className={Styles.quantityBx}>{list.quantity}&nbsp;個</span></li>
                                ))
                            }</>
                        } else if (showSideMenu === true) {
                            return <>{
                                sideMenu.map((list, index) => (
                                    <li key={index}><span className={Styles.ranking}>{index + 1}</span>&nbsp;{list.name}<span className={Styles.quantityBx}>{list.quantity}&nbsp;個</span></li>
                                ))
                            }</>
                        } else if (showDrink === true) {
                            return <>{
                                drink.map((list, index) => (
                                    <li key={index}><span className={Styles.ranking}>{index + 1}</span>&nbsp;{list.name}<span className={Styles.quantityBx}>{list.quantity}&nbsp;個</span></li>
                                ))
                            }</>
                        } else {
                            return <></>
                        }
                    })()}
                </ul>
                <button className={Styles.closeBtn} onClick={() => { setShowAllSalesData(false); setShowAllProduct(false) }}>閉じる</button>
            </>
        } else {
            return <></>
        }
    }

    const ShowSalesData = useCallback((props) => {
        const { title, salesData, data, option,onClick } = props;
        if (salesData.length > 0) {
            return <div className={Styles.salesBxInner}>
            <div className={Styles.salesGrid}>
                <div className={Styles.SalesProductList}>
                        <h3>{title}</h3>
                        <ul>
                            {salesData.map((list, index) => (
                                <li key={index}><span className={Styles.ranking}>{index + 1}</span>&nbsp;{list.name}<span className={Styles.quantityBx}>{list.quantity}&nbsp;個</span></li>
                            ))}
                        </ul>

                        {salesData.length > 5 ? <button className={Styles.moreBtn} onClick={onClick}>もっと見る</button> : <></>}
                </div>
                <div className={Styles.SalesChart}>
                    <Doughnut data={data} options={option} />
                </div>
            </div>
        </div>
        } else {
            return <></>
        }
    })
    const [showSearchSalesData, setShowSearchSalesData] = useState(false)

const getSearchData = useCallback(() => {
    let pattern = /^([1-9]\d*|0)$/;
    if (s_year === "" || s_month === "" || s_year.length < 4) {
        alert('「年」または「月」が未入力です。')
    }
    if (searchSales === true && (s_year !== "" && s_month !== "" && s_day !== "")) {
        if (pattern.test(s_year) !== true || pattern.test(s_month) !== true || pattern.test(s_day) !== true) {
            alert('半角数字で入力してください。')
        }
        const getSalesDataRef = db.collection("sales").doc(`${s_year}`).collection(`${s_month}-${s_day}`).get()
        if (getSalesDataRef) {
            getSalesDataRef.then((query) => {
                const allProduct = [];
                query.forEach((doc) => {
                    const data = { name: doc.data().name, quantity: doc.data().quantity, category: doc.data().category, price: (doc.data().price * doc.data().quantity) }
                    allProduct.push(data);
                });
                setSearchSalesProduct(allProduct)
                setShowSearchSalesData(true)
              })
              .catch((error)=>{
                console.log(`データの取得に失敗しました (${error})`);
              });
        } else {
            setErrorText(true)
        }

    } else if (searchSales === true && (s_year !== "" && s_month !== "" && s_day === "")) {
        if (pattern.test(s_year) !== true || pattern.test(s_month) !== true) {
            alert('半角数字で入力してください。')
        }
        const getSalesDataRef = db.collection("sales").doc(`${s_year}`).collection(`${s_month}`).get()
        if (getSalesDataRef) {
            getSalesDataRef.then((query) => {
                const allProduct = [];
                query.forEach((doc) => {
                    const data = { name: doc.data().name, quantity: doc.data().quantity, category: doc.data().category, price: (doc.data().price * doc.data().quantity) }
                    allProduct.push(data);
                });
                setSearchSalesProduct(allProduct)
                setShowSearchSalesData(true)
              })
              .catch((error)=>{
                console.log(`データの取得に失敗しました (${error})`);
              });
        } else {
            setErrorText(true)
        }
    } else {
        return
    }
}, [s_year,s_month,s_day])
    
    return (
        <DashboardLayout>
            <div className={Styles.inner}>
                <h2>販売数</h2>
                <ul className={Styles.orderTabBtn}>
                    <li className={choiceToday ? Styles.choiceToday : ""} onClick={() => { setTodaySales(true); setMonthSales(false); setSearchSales(false); setChoiceToday(true); setChoiceMonth(false);setChoiceSearch(false) }}>今日</li>
                    <li className={choiceMonth ? Styles.choiceMonth : ""} onClick={() => { setTodaySales(false); setMonthSales(true); setSearchSales(false); setChoiceToday(false);setChoiceMonth(true);setChoiceSearch(false)}}>今月</li>
                    <li className={choiceSearch ? Styles.choiceSearch : ""} onClick={() => { setTodaySales(false); setMonthSales(false); setSearchSales(true); setChoiceToday(false);setChoiceMonth(false);setChoiceSearch(true)}}>検索</li>
                </ul>
                <div className={Styles.salesList}>
                    {(() => {
                        if (todaySales === true) {
                            return <div className={Styles.salesBx}>
                                <ShowSalesData title={'合計'} salesData={AllProductSalesDataSort} data={circleAllProductData} option={allProductOption} onClick={() => { setShowAllSalesData(true);setShowAllProduct(true) }} />
                                    <ShowSalesData title={'ハンバーガー'} salesData={hamburgerSalesDataSort} data={circleBurgerData} option={hamburgerOption} onClick={() => { setShowAllSalesData(true);setShowHamburger(true) }} />
                                    <ShowSalesData title={'セットメニュー'} salesData={setMenuSalesDataSort} data={circleSetMenuData} option={setMenuOption} onClick={() => { setShowAllSalesData(true);setShowSetMenu(true) }} />
                                    <ShowSalesData title={'サイドメニュー'} salesData={sideMenuSalesDataSort} data={circleSideMenuData} option={sideMenuOption} onClick={() => { setShowAllSalesData(true);setShowSideMenu(true) }} />
                                    <ShowSalesData title={'ドリンク'} salesData={drinkSalesDataSort} data={circleDrinkData} option={drinkOption} onClick={() => { setShowAllSalesData(true);setShowDrink(true) }} />
                                </div>
                        } else if (monthSales === true) {
                            return <div className={Styles.salesBx}>
                            <ShowSalesData title={'合計'} salesData={monthAllProductSalesDataSort} data={monthCircleAllProductData} option={monthAllProductOption} onClick={() => { setShowAllSalesData(true);setShowAllProduct(true) }} />
                                <ShowSalesData title={'ハンバーガー'} salesData={monthHamburgerSalesDataSort} data={monthCircleBurgerData} option={monthHamburgerOption} onClick={() => { setShowAllSalesData(true);setShowHamburger(true) }} />
                                <ShowSalesData title={'セットメニュー'} salesData={monthSetMenuSalesDataSort} data={monthCircleSetMenuData} option={monthSetMenuOption} onClick={() => { setShowAllSalesData(true);setShowSetMenu(true) }} />
                                <ShowSalesData title={'サイドメニュー'} salesData={monthSideMenuSalesDataSort} data={monthCircleSideMenuData} option={monthSideMenuOption} onClick={() => { setShowAllSalesData(true);setShowSideMenu(true) }} />
                                <ShowSalesData title={'ドリンク'} salesData={monthDrinkSalesDataSort} data={monthCircleDrinkData} option={monthDrinkOption} onClick={() => { setShowAllSalesData(true);setShowDrink(true) }} />
                            </div>
                        } else if (searchSales === true) {
                            return <>
                                <div className={Styles.searchBox}>
                                    <div className={Styles.searchInputBx}>
                                        <input value={s_year} onChange={inputYear} />&nbsp;年&nbsp;&nbsp;
                                        <input value={s_month} onChange={inputMonth} />&nbsp;月&nbsp;&nbsp;
                                        <input value={s_day} onChange={inputDay} />&nbsp;日&nbsp;&nbsp;
                                        <SearchIcon onClick={() => getSearchData(s_year,s_month,s_day)} />
                                    </div>
                                </div>
                                <div className={Styles.salesBx}>
                                    {showSearchSalesData ? <SearchSalesData searchSalesProduct={searchSalesProduct} /> : <></>}
                                </div>
                                </>
                        } else {
                            return <></>
                        }
                    })()}
                </div>
                {showAllSalesData ? <div className={Styles.showSaleDataBx}><div className={Styles.inner}><ShowData hamburger={hamburger} setMenu={setMenu} sideMenu={sideMenu} drink={drink} allProduct={allProduct} showAllProduct={showAllProduct} /></div></div> :<></> }
            </div>
        </DashboardLayout>
    )
}

export default Sales

export async function getStaticProps() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const lastDate = new Date(year, month, 0);
    const days = Number(lastDate.getDate());
    const a5 = Array(days);
    a5.fill(0);
    let allProduct = [];
    let monthAllProduct = [];
  
    const allProductRef = await db.collection('sales').doc(`${year}`).collection(`${month}-${date}`).get();
    allProductRef.docs.map((doc) => {
      const data = { name: doc.data().name, quantity: doc.data().quantity, category: doc.data().category, price: (doc.data().price * doc.data().quantity) }
      allProduct.push(data);
    });

    const monthAllProductRef = await db.collection('sales').doc(`${year}`).collection(`${month}`).get();
    monthAllProductRef.docs.map((doc) => {
      const data = { name: doc.data().name, quantity: doc.data().quantity, category: doc.data().category, price: (doc.data().price * doc.data().quantity) }
      monthAllProduct.push(data);
    });
  
    let hamburger = allProduct.filter(function (list) {
      return list.category === 'hamburger'
    })
    let setMenu = allProduct.filter(function (list) {
        return list.category === 'setMenu'
    })
    let sideMenu = allProduct.filter(function (list) {
      return list.category === 'sideMenu'
    })
    let drink = allProduct.filter(function (list) {
        return list.category === 'drink'
    })
    let monthHamburger = monthAllProduct.filter(function (list) {
        return list.category === 'hamburger'
    })
    let monthSetMenu = monthAllProduct.filter(function (list) {
        return list.category === 'setMenu'
    })
    let monthSideMenu = monthAllProduct.filter(function (list) {
      return list.category === 'sideMenu'
    })
    let monthDrink = monthAllProduct.filter(function (list) {
        return list.category === 'drink'
    })
    
    hamburger.sort(function(a,b){
      if(a.quantity>b.quantity) return -1;
      if (a.quantity < b.quantity) return 1;
      return 0;
    });
    setMenu.sort(function(a,b){
        if(a.quantity>b.quantity) return -1;
        if (a.quantity < b.quantity) return 1;
        return 0;
    });
    sideMenu.sort(function(a,b){
        if(a.quantity>b.quantity) return -1;
        if (a.quantity < b.quantity) return 1;
        return 0;
    });
    drink.sort(function (a, b) {
        if(a.quantity>b.quantity) return -1;
        if (a.quantity < b.quantity) return 1;
        return 0;
    });
    monthHamburger.sort(function(a,b){
        if(a.quantity>b.quantity) return -1;
        if (a.quantity < b.quantity) return 1;
        return 0;
    });
    monthSetMenu.sort(function(a,b){
        if(a.quantity>b.quantity) return -1;
        if (a.quantity < b.quantity) return 1;
        return 0;
    });
    monthSideMenu.sort(function(a,b){
        if(a.quantity>b.quantity) return -1;
        if (a.quantity < b.quantity) return 1;
        return 0;
    });
    monthDrink.sort(function (a, b) {
        if(a.quantity>b.quantity) return -1;
        if (a.quantity < b.quantity) return 1;
        return 0;
    });
    return {
      props: {allProduct,hamburger,setMenu,sideMenu,drink,monthAllProduct,monthHamburger,monthSetMenu,monthSideMenu,monthDrink},
    };
  }