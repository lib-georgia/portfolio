import Image from 'next/image'
import Styles from '../Dashboard.module.scss'
import React,{ useEffect, useState } from 'react'
import { db } from "../../../firebaseApp";
import Link from 'next/link'
import {DndContext, closestCenter,KeyboardSensor,PointerSensor,useSensor,useSensors} from '@dnd-kit/core';
import { arrayMove,SortableContext,sortableKeyboardCoordinates,rectSortingStrategy} from '@dnd-kit/sortable';
import {useSortable} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DashboardLayout } from '../../../components'

const SortableItem = (props) => {
    const { list,category } = props;
    const { attributes, listeners, setNodeRef, transform, transition, } = useSortable({ id: list.id });
    const style = {position:'relative',transform: CSS.Transform.toString(transform),transition};
    return (
        <li key={props.index} ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <Link href={`/dashboard/edit/${category}-${list.id}`}>
                <a>
                    {(() => {
                        if (list.category === 'ドリンク') {
                            return <></>
                        } else {
                            return <span>
                            <Image src={list.images} alt={"A thumbnail of the question"} layout="fill" objectFit="contain" priority={true} />
                        </span>
                        }
                    })()}
                    <h4>{list.name}</h4>
                    <p>{Number(list.price).toLocaleString()}円（税込）</p>
                </a>
            </Link>
        </li>
    )
}

const Edit = () => {
    const categories = [
        {"id": 1,"name": "ハンバーガー", "category":"hamburger"},
        {"id": 2,"name": "セットメニュー", "category":"setMenu"},
        {"id": 3,"name": "サイドメニュー", "category":"sideMenu"},
        {"id": 4,"name": "ドリンク", "category":"drink"},
    ]

    const [drinkProduct, setDrinkProduct] = useState([]);
    const [setMenuProducts, setSetMenuProducts] = useState([]);
    const [burgerProduct, setBurgerProduct] = useState([]);
    const [sideMenuProduct, setSideMenuProduct] = useState([]);

    const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
    );

    useEffect(() => {
        function getMenu() {
            for (let i = 0; i < categories.length; i++) {
                db.collection(categories[i].category).orderBy('orderBy').get().then((query) => {
                    const product = [];
                    query.forEach((doc) => {
                        const data = doc.data();
                        if (categories[i].category === 'drink') {
                            product.push({ id: doc.id, name: data.name, price: data.price, orderBy: data.orderBy, category: data.category });
                        } else {
                            product.push({ id: doc.id, name: data.name, images: data.images.path, price: data.price, orderBy: data.orderBy, category: data.category });
                        }
                    });
                    if (categories[i].category === 'hamburger') {
                        setBurgerProduct(product);
                    } else if (categories[i].category === 'setMenu') {
                        setSetMenuProducts(product);
                    } else if (categories[i].category === 'drink') {
                        setDrinkProduct(product);
                    } else {
                        setSideMenuProduct(product);
                    }
                }).catch((error) => {
                    console.log(`データの取得に失敗しました (${error})`);
                });
            }
        }
        getMenu()
    }, []);
    

    const handleDragOver = ({ over, active }) => {
        const overId = over?.id;
        if (!overId) {return;}
        const activeContainer = active.data.current.sortable.containerId;
        const overContainer = over.data.current?.sortable.containerId;
        if (!overContainer) {return;}
        if (activeContainer !== overContainer) {
          setItems((items) => {
            const activeIndex = active.data.current.sortable.index;
            const overIndex = over.data.current?.sortable.index || 0;
            return moveBetweenContainers(
              items,
              activeContainer,
              activeIndex,
              overContainer,
              overIndex,
              active.id
            );
          });
        }
    }
    
    const [showRegisterHamburgerBtn, setShowRegisterHamburgerBtn] = useState(false);
    const [showRegisterSetMenuBtn, setShowRegisterSetMenuBtn] = useState(false);
    const [showRegisterDrinkBtn, setShowRegisterDrinkBtn] = useState(false);
    const [showRegisterSideMenuBtn, setShowRegisterSideMenuBtn] = useState(false);
    const handleDragEnd = (event,category) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            if (category === 'setMenu') {
                setSetMenuProducts((items) => {
                    const oldIndex = items.findIndex(({ id }) => id === active.id);
                    const newIndex = items.findIndex(({ id }) => id === over.id);
                    setShowRegisterSetMenuBtn(true);
                    return arrayMove(items, oldIndex, newIndex);
                });   
            } else if (category === 'hamburger') {
                setBurgerProduct((items) => {
                    const oldIndex = items.findIndex(({ id }) => id === active.id);
                    const newIndex = items.findIndex(({ id }) => id === over.id);
                    setShowRegisterHamburgerBtn(true);
                    return arrayMove(items, oldIndex, newIndex);
                });   
            } else if (category === 'drink') {
                setDrinkProduct((items) => {
                    const oldIndex = items.findIndex(({ id }) => id === active.id);
                    const newIndex = items.findIndex(({ id }) => id === over.id);
                    setShowRegisterDrinkBtn(true);
                    return arrayMove(items, oldIndex, newIndex);
                });   
            } else {
                setSideMenuProduct((items) => {
                    const oldIndex = items.findIndex(({ id }) => id === active.id);
                    const newIndex = items.findIndex(({ id }) => id === over.id);
                    setShowRegisterSideMenuBtn(true);
                    return arrayMove(items, oldIndex, newIndex);
                });                 
            }
        }
    }

    const handleDragEndHamburger = (event) => {
        const category = 'hamburger';
        handleDragEnd(event,category)
    }
    const handleDragEndSetMenu = (event) => {
        const category = 'setMenu';
        handleDragEnd(event,category)
    }
    const handleDragEndDrink = (event) => {
        const category = 'drink';
        handleDragEnd(event,category)
    }
    const handleDragEndOther = (event) => {
        const category = 'sideMenu';
        handleDragEnd(event,category)
    }
    
    const Grid = ({ children }) => {
        return (<div>{children}</div>);
    }

    const registerOrderBySetMenu = () => {
        for (let i = 0; i < setMenuProducts.length; i++){
            db.collection("setMenu").doc(setMenuProducts[i].id).update({
                orderBy: i,
              },{merge:true})
              .then(()=>{
                setShowRegisterSetMenuBtn(false)
              })
              .catch((error)=>{
                console.log(`更新に失敗しました (${error})`);
              });
        }
    }
    const registerOrderByDrink = () => {
        for (let i = 0; i < drinkProduct.length; i++){
            db.collection("drink").doc(drinkProduct[i].id).update({
                orderBy: i,
              },{merge:true})
              .then(()=>{
                setShowRegisterDrinkBtn(false)
              })
              .catch((error)=>{
                console.log(`更新に失敗しました (${error})`);
              });
        }
    }
    const registerOrderByHamburger = () => {
        for (let i = 0; i < burgerProduct.length; i++){
            db.collection("hamburger").doc(burgerProduct[i].id).update({
                orderBy: i,
              },{merge:true})
              .then(()=>{
                setShowRegisterHamburgerBtn(false)
              })
              .catch((error)=>{
                console.log(`更新に失敗しました (${error})`);
              });
        }
    }
    const registerOrderBySetSideMenu = () => {
        for (let i = 0; i < sideMenuProduct.length; i++){
            db.collection("sideMenu").doc(sideMenuProduct[i].id).update({
                orderBy: i,
              },{merge:true})
              .then(()=>{
                setShowRegisterSideMenuBtn(false)
              })
              .catch((error)=>{
                console.log(`更新に失敗しました (${error})`);
              });
        }
    }

    return (
        <DashboardLayout>
            {/* <div className={Styles.dashboard}>
                <Sidebar /> */}
                    <div className={Styles.inner}>
                        <h2>商品編集</h2>
                        <ul className={Styles.edit}>
                            {categories.map(list => (
                                <li key={list.id}><a href={`#${list.category}`}>{list.name}</a></li>
                            ))}
                        </ul>
                        <div className={Styles.categoryBx}>
                            <h3 id="hamburger">ハンバーガー</h3>
                            <DndContext sensors={sensors} onDragOver={handleDragOver} onDragEnd={handleDragEndHamburger}>
                                <ul className={Styles.productListBx}>
                                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndHamburger}>
                                        <SortableContext items={burgerProduct.map((item) => item.id)} strategy={rectSortingStrategy}>
                                            <Grid>
                                              {burgerProduct.map((list, index) => {
                                                  return (
                                                      <React.Fragment key={index}>
                                                          <SortableItem key={index} number={index} list={list} category={'hamburger'} />
                                                      </React.Fragment>
                                                  );
                                              })}
                                            </Grid>
                                        </SortableContext>
                                    </DndContext>
                                </ul>
                                {showRegisterHamburgerBtn && (
                                    <div className={Styles.registerOrderBy} onClick={() => registerOrderByHamburger(burgerProduct)}>新しい順番を登録</div>
                                )}
                            </DndContext>
                        </div>
                        <div className={Styles.categoryBx}>
                            <h3 id="setMenu">セットメニュー</h3>
                            <DndContext sensors={sensors} onDragOver={handleDragOver} onDragEnd={handleDragEndSetMenu}>
                                <ul className={Styles.productListBx}>
                                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndSetMenu}>
                                        <SortableContext items={setMenuProducts.map((item) => item.id)} strategy={rectSortingStrategy}>
                                            <Grid>
                                              {setMenuProducts.map((list, index) => {
                                                  return (
                                                      <React.Fragment key={index}>
                                                          <SortableItem key={index} number={index} list={list} category={'setMenu'} />
                                                      </React.Fragment>
                                                  );
                                              })}
                                            </Grid>
                                        </SortableContext>
                                    </DndContext>
                                </ul>
                                {showRegisterSetMenuBtn && (
                                    <div className={Styles.registerOrderBy} onClick={() => registerOrderBySetMenu()}>新しい順番を登録</div>
                                )}
                            </DndContext>
                        </div>
                        <div className={Styles.categoryBx}>
                            <h3 id="others">サイドメニュー</h3>
                            <DndContext sensors={sensors} onDragOver={handleDragOver} onDragEnd={handleDragEndOther}>
                                <ul className={Styles.productListBx}>
                                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndOther}>
                                        <SortableContext items={setMenuProducts.map((item) => item.id)} strategy={rectSortingStrategy}>
                                            <Grid>
                                              {sideMenuProduct.map((list, index) => {
                                                  return (
                                                      <React.Fragment key={index}>
                                                          <SortableItem key={index} number={index} list={list} category={'others'} />
                                                      </React.Fragment>
                                                  );
                                              })}
                                            </Grid>
                                        </SortableContext>
                                    </DndContext>
                                </ul>
                                {showRegisterSideMenuBtn && (
                                    <div className={Styles.registerOrderBy} onClick={() => registerOrderBySetSideMenu(sideMenuProduct)}>新しい順番を登録</div>
                                )}
                            </DndContext>
                    </div>
                    <div className={Styles.categoryBx}>
                            <h3 id="drink">ドリンク</h3>
                            <DndContext sensors={sensors} onDragOver={handleDragOver} onDragEnd={handleDragEndDrink}>
                                <ul className={Styles.productListBx}>
                                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndDrink}>
                                        <SortableContext items={drinkProduct.map((item) => item.id)} strategy={rectSortingStrategy}>
                                            <Grid>
                                              {drinkProduct.map((list, index) => {
                                                  return (
                                                      <React.Fragment key={index}>
                                                          <SortableItem key={index} number={index} list={list} category={'drink'} />
                                                      </React.Fragment>
                                                  );
                                              })}
                                            </Grid>
                                        </SortableContext>
                                    </DndContext>
                                </ul>
                                {showRegisterDrinkBtn && (
                                    <div className={Styles.registerOrderBy} onClick={() => registerOrderByDrink(drinkProduct)}>新しい順番を登録</div>
                                )}
                            </DndContext>
                        </div>
                </div>
            {/* </div> */}
        </DashboardLayout>
    )
}
export default Edit