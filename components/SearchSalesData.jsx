import React, { useCallback } from 'react';
import Styles from '../pages/dashboard/Dashboard.module.scss';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-doughnut-innertext';

const SearchSalesData = (props) => {
  const { searchSalesProduct } = props;
  let searchHamburger = searchSalesProduct.filter(function (list) {
    return list.category === 'hamburger';
  });
  searchHamburger.sort(function (a, b) {
    if (a.quantity > b.quantity) return -1;
    if (a.quantity < b.quantity) return 1;
    return 0;
  });
  let searchSetMenu = searchSalesProduct.filter(function (list) {
    return list.category === 'setMenu';
  });
  searchSetMenu.sort(function (a, b) {
    if (a.quantity > b.quantity) return -1;
    if (a.quantity < b.quantity) return 1;
    return 0;
  });
  let searchSideMenu = searchSalesProduct.filter(function (list) {
    return list.category === 'sideMenu';
  });
  searchSideMenu.sort(function (a, b) {
    if (a.quantity > b.quantity) return -1;
    if (a.quantity < b.quantity) return 1;
    return 0;
  });
  let searchDrink = searchSalesProduct.filter(function (list) {
    return list.category === 'drink';
  });
  searchDrink.sort(function (a, b) {
    if (a.quantity > b.quantity) return -1;
    if (a.quantity < b.quantity) return 1;
    return 0;
  });

  const searchTotalPrice = Object.keys(searchSalesProduct).reduce(
    (sum, key) => sum + parseInt(searchSalesProduct[key].price || 0),
    0
  );
  const searchHamburgerTotalPrice = Object.keys(searchHamburger).reduce(
    (sum, key) => sum + parseInt(searchHamburger[key].price || 0),
    0
  );
  const searchSetMenuTotalPrice = Object.keys(searchSetMenu).reduce(
    (sum, key) => sum + parseInt(searchSetMenu[key].price || 0),
    0
  );
  const searchSideMenuTotalPrice = Object.keys(searchSideMenu).reduce(
    (sum, key) => sum + parseInt(searchSideMenu[key].price || 0),
    0
  );
  const searchDrinkTotalPrice = Object.keys(searchDrink).reduce(
    (sum, key) => sum + parseInt(searchDrink[key].price || 0),
    0
  );

  const searchAllProductSalesDataSort = searchSalesProduct.slice(0, 5);
  const searchHamburgerSalesDataSort = searchHamburger.slice(0, 5);
  const searchSetMenuSalesDataSort = searchSetMenu.slice(0, 5);
  const searchDrinkSalesDataSort = searchDrink.slice(0, 5);
  const searchSideMenuSalesDataSort = searchSideMenu.slice(0, 5);

  const searchHamburgerRatio =
    Math.round((searchHamburgerTotalPrice / searchTotalPrice) * 100) + '%';
  const searchSetMenuRatio = Math.round((searchSetMenuTotalPrice / searchTotalPrice) * 100) + '%';
  const searchSideMenuRatio = Math.round((searchSideMenuTotalPrice / searchTotalPrice) * 100) + '%';
  const searchDrinkRatio = Math.round((searchDrinkTotalPrice / searchTotalPrice) * 100) + '%';

  const searchAllProductOption = {
    centerText: {
      value: '100%',
      color: '#FA8800',
      fontSizeAdjust: -0.2,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const searchHamburgerOption = {
    centerText: {
      value: searchHamburgerRatio,
      color: '#FA8800',
      fontSizeAdjust: -0.2,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const searchSetMenuOption = {
    centerText: {
      value: searchSetMenuRatio,
      color: '#FA8800',
      fontSizeAdjust: -0.2,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const searchSideMenuOption = {
    centerText: {
      value: searchSideMenuRatio,
      color: '#FA8800',
      fontSizeAdjust: -0.2,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const searchDrinkOption = {
    centerText: {
      value: searchDrinkRatio,
      color: '#FA8800',
      fontSizeAdjust: -0.2,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const searchCircleAllProductData = {
    labels: searchAllProductSalesDataSort.map((material) => material.name),
    datasets: [
      {
        label: 'Dataset',
        data: searchAllProductSalesDataSort.map((material) => material.quantity),
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

  const searchCircleHamBurgerData = {
    labels: searchHamburger.map((material) => material.name),
    datasets: [
      {
        label: 'Dataset',
        data: searchHamburger.map((material) => material.quantity),
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
  const searchCircleSetMenuData = {
    labels: searchSetMenu.map((material) => material.name),
    datasets: [
      {
        label: 'Dataset',
        data: searchSetMenu.map((material) => material.quantity),
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
  const searchCircleSideMenuData = {
    labels: searchSideMenu.map((material) => material.name),
    datasets: [
      {
        label: 'Dataset',
        data: searchSideMenu.map((material) => material.quantity),
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
  const searchCircleDrinkData = {
    labels: searchDrink.map((material) => material.name),
    datasets: [
      {
        label: 'Dataset',
        data: searchDrink.map((material) => material.quantity),
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

  const ShowSalesData = useCallback((props) => {
    const { title, salesData, data, option, onClick } = props;
    if (salesData.length > 0) {
      return (
        <div className={Styles.salesBxInner}>
          <div className={Styles.salesGrid}>
            <div className={Styles.SalesProductList}>
              <h3>{title}</h3>
              <ul>
                {salesData.map((list, index) => (
                  <li key={index}>
                    <span className={Styles.ranking}>{index + 1}</span>&nbsp;{list.name}
                    <span className={Styles.quantityBx}>{list.quantity}&nbsp;個</span>
                  </li>
                ))}
              </ul>

              {salesData.length > 5 ? (
                <button className={Styles.moreBtn} onClick={onClick}>
                  もっと見る
                </button>
              ) : (
                <></>
              )}
            </div>
            <div className={Styles.SalesChart}>
              <Doughnut data={data} options={option} />
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  });

  return (
    <>
      {(() => {
        if (searchSalesProduct) {
          return (
            <>
              <ShowSalesData
                title={'合計'}
                salesData={searchAllProductSalesDataSort}
                data={searchCircleAllProductData}
                option={searchAllProductOption}
                onClick={() => {
                  setShowAllSalesData(true);
                  setShowAllProduct(true);
                }}
              />
              <ShowSalesData
                title={'ハンバーガー'}
                salesData={searchHamburgerSalesDataSort}
                data={searchCircleHamBurgerData}
                option={searchHamburgerOption}
                onClick={() => {
                  setShowAllSalesData(true);
                  setShowHamburger(true);
                }}
              />
              <ShowSalesData
                title={'セットメニュー'}
                salesData={searchSetMenuSalesDataSort}
                data={searchCircleSetMenuData}
                option={searchSetMenuOption}
                onClick={() => {
                  setShowAllSalesData(true);
                  setShowSetMenu(true);
                }}
              />
              <ShowSalesData
                title={'サイドメニュー'}
                salesData={searchSideMenuSalesDataSort}
                data={searchCircleSideMenuData}
                option={searchSideMenuOption}
                onClick={() => {
                  setShowAllSalesData(true);
                  setShowSideMenu(true);
                }}
              />
              <ShowSalesData
                title={'ドリンク'}
                salesData={searchDrinkSalesDataSort}
                data={searchCircleDrinkData}
                option={searchDrinkOption}
                onClick={() => {
                  setShowAllSalesData(true);
                  setShowDrink(true);
                }}
              />
            </>
          );
        } else {
          return <></>;
        }
      })()}
    </>
  );
};

export default SearchSalesData;
