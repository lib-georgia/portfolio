import Styles from '../Dashboard.module.scss'
import React,{ useEffect, useState } from 'react'
import { db } from '../../../firebaseApp';
import firebase from 'firebase/compat/app';
import { DashboardLayout } from '../../../components'

const Order = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const [lastDayOrders, setLastDayOrders] = useState("");
    const [orders, setOrders] = useState("");
    const [completed, setCompleted] = useState("");

    useEffect(() => {
        function order() {
            const lastDate = new Date();
            lastDate.setDate(lastDate.getDate() - 1);
            db.collection("order").doc(`${lastDate.getFullYear()}`).collection(`${lastDate.getMonth() + 1}-${lastDate.getDate()}`).orderBy("orderTime").onSnapshot(snapshot => {
                const orders = [];
                snapshot.forEach((doc) => {
                    const data = doc.data().addOrder;
                    const id = doc.id;
                    const orderTime = doc.data().orderTime;
                    orders.push({ data, id, orderTime });
                });
                if (orders) {
                    setOrders(orders)
                } else {
                    return
                }
            });
            db.collection("order").doc(`${year}`).collection(`${month}-${day - 1}`).orderBy("orderTime").onSnapshot(snapshot => {
                const orders = [];
                snapshot.forEach((doc) => {
                    const data = doc.data().addOrder;
                    const id = doc.id;
                    const orderTime = doc.data().orderTime;
                    orders.push({data,id,orderTime});
                });
                if (orders) {
                    setLastDayOrders(orders)
                } else {
                    return
                }
            })
        }
        order()
    }, [year, month, day])

    useEffect(() => {
        function order() {
            db.collection("order").doc(`${year}`).collection(`${month}-${day}`).orderBy("orderTime").onSnapshot(snapshot => {
                const orders = [];
                snapshot.forEach((doc) => {
                    const data = doc.data().addOrder;
                    const id = doc.id;
                    const orderTime = doc.data().orderTime;
                    orders.push({data,id,orderTime});
                });
                if (orders) {
                    setOrders(orders)
                } else {
                    return
                }
            })
        }
        order()
    }, [year, month, day])

    useEffect(() => {
        function complete() {
            db.collection("order").doc(`${year}`).collection(`${month}-${day}_completed`).orderBy("completedTime", "desc").onSnapshot(snapshot => {
                const complete = [];
                snapshot.forEach((doc) => {
                    const data = doc.data().data;
                    const id = doc.id;
                    const time = doc.data().completedTime;
                    complete.push({data,id,time});
                });
                if (complete) {
                    setCompleted(complete)   
                } else {
                    return 
                }
            })
        }
        complete()
    }, [year, month, day])

    const handleClick = (async(id,data) => {
        let now = new Date();
        let Hour = now.getHours();
        let Min = now.getMinutes();
        let Sec = now.getSeconds();
        let time = `${Hour}時${Min}分${Sec}秒`;
        for (let i = 0; i < data.length; i++){data[i].price
            const dayRef = db.collection("sales").doc(`${year}`).collection(`${month}-${day}`).doc(data[i].id)
            const dayRefDoc = await dayRef.get();
            if (dayRefDoc.exists) {
              await dayRef.update({quantity: firebase.firestore.FieldValue.increment(data[i].quantity)});
            }
            else {
                await dayRef.set({
                    name: data[i].name,
                    quantity: data[i].quantity,
                    category: data[i].category,
                    images: data[i].images,
                    price:Number(data[i].price),
                });
            }
            const monthRef = db.collection("sales").doc(`${year}`).collection(`${month}`).doc(data[i].id)
                const monthRefDoc = await monthRef.get();
            if (monthRefDoc.exists) {
                await monthRef.update({ quantity: firebase.firestore.FieldValue.increment(data[i].quantity) });
            }
            else {
                await monthRef.set({
                    name: data[i].name,
                    quantity: data[i].quantity,
                    category: data[i].category,
                    images: data[i].images,
                    price:Number(data[i].price),
                });
            }
            const monthTotalPriceRef = db.collection("monthTotalPrice").doc(`${year}`).collection(`${month}`).doc(`${day}`);
            const monthTotalPriceRefDoc = await monthTotalPriceRef.get();
            if (monthTotalPriceRefDoc.exists) {
                await monthTotalPriceRef.update({price: firebase.firestore.FieldValue.increment(data[i].price)})
            } else {
                await monthTotalPriceRef.set({
                    price:data[i].price
                }, { merge: true })
            }
            if (i + 1 === data.length) {
                db.collection("order").doc(`${year}`).collection(`${month}-${day}_completed`).doc(id).set({data,completedTime:time}).then(() => {
                    db.collection("order").doc(`${year}`).collection(`${month}-${day}`).doc(id).delete().then(() => {
                        alert('ご提供済み')
                    }).catch((error) => {
                        alert(`失敗しました (${error})`);
                    })
                }).catch((error) => {
                    alert(`失敗しました (${error})`);
                })
            }
        }
    })

    const [newOrder, setNewOrder] = useState(true),
        [newOrderActive, setNewOrderActive] = useState(true);
    const [offer, setOffer] = useState(false),
        [notOfferActive, setNotOfferActive] = useState(false);
    
    return (
        <DashboardLayout>
                <div className={Styles.inner}>
                    <h2>注文管理</h2>
                    <ul className={Styles.orderTabBtn}>
                        <li onClick={() => { setNewOrder(true); setOffer(false); setNewOrderActive(true); setNotOfferActive(false)}} className={newOrderActive ? Styles.n_active : ""}>ご新規</li>
                        <li onClick={() => { setOffer(true); setNewOrder(false); setNewOrderActive(false); setNotOfferActive(true)}} className={notOfferActive ? Styles.o_active : ""}>提供済</li>
                    </ul>
                    <div className={Styles.orderList}>
                        {newOrder ?
                            <>
                                {lastDayOrders.length > 0 && (
                                    lastDayOrders.map((list, index) => (
                                        <div key={index} className={Styles.orderListInner}>
                                            <h3>{list.id}番</h3>
                                            {list.data.length > 0 && (
                                                list.data.map((lst, index) => (
                                                    <div key={index} className={Styles.ovf}><span className={Styles.productName}>{lst.name}</span><span className={Styles.quantity}>{lst.quantity}個</span></div>
                                                ))
                                            )}
                                            <div>ご注文時間：{list.orderTime}</div>
                                            <div className={Styles.provide} onClick={() => handleClick(list.id, list.data)}>提供</div>
                                        </div>
                                    )))}
                                {orders.length > 0 && (
                                    orders.map((list, index) => (
                                        <div key={index} className={Styles.orderListInner}>
                                            <h3>{list.id}番</h3>
                                            {list.data.length > 0 && (
                                                list.data.map((lst, index) => (
                                                    <div key={index} className={Styles.ovf}><span className={Styles.productName}>{lst.name}</span><span className={Styles.quantity}>{lst.quantity}個</span></div>
                                                ))
                                            )}
                                            <div>ご注文時間：{list.orderTime}</div>
                                            <div className={Styles.provide} onClick={() => handleClick(list.id, list.data)}>提供</div>
                                        </div>
                                    )))}
                            </> : <></>
                        }
                        {offer ?
                            <>
                                {completed.length > 0 && (
                                    completed.map((list, index) => (
                                        <div key={index} className={Styles.orderListInner}>
                                            <h3>{list.id}番</h3>
                                            {list.data.length > 0 && (
                                                list.data.map((lst, index) => (
                                                    <div key={index} className={Styles.ovf}><span className={Styles.productName}>{lst.name}</span><span className={Styles.quantity}>{lst.quantity}個</span></div>
                                                ))
                                            )}
                                            <div>提供時間：{list.time}</div>
                                        </div>
                                    )))}
                            </> : <></>
                        }
                    </div>
                </div>
        </DashboardLayout>
    )
}

export default Order