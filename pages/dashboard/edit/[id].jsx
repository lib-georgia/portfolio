import { useRouter } from "next/router";
import Image from 'next/image'
import Styles from '../Dashboard.module.scss'
import Sidebar from '../../../components/Sidebar'
import Box from '@mui/material/Box'
import React,{ useCallback, useEffect, useState } from 'react'
import { SelectBox,TextBox } from '../../../components/Uikit'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import noImage from '../../../assets/images/no-image.png'
import { storage,db } from "../../../firebaseApp";
import { DashboardLayout } from '../../../components'

const Product = ({edit}) => {
    const router = useRouter();
    const { id } = router.query;
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);
    const [priceValidation, setPriceValidation] = useState(false);
    const [registerBx, setRegisterBx] = useState(false);

    const categories = [
        {"id": 1,"name": "ドリンク", "category":"drink"},
        {"id": 2,"name": "バーガー", "category":"hamburger"},
        {"id": 3,"name": "セットメニュー", "category":"setMenu"},
        {"id": 4,"name": "その他", "category":"others"},
    ]

    useEffect(() => {
        const isPrice = (price) => {
            var regexp = new RegExp(/^[+]?([1-9]\d*|0)$/);
            return regexp.test(price);
        }
        if (isPrice(price) === true && price !== "") {
            setPriceValidation(true)
        } else if (isPrice(price) === false && price !== "") {
            setPriceValidation(false)
        } else {
            setPriceValidation(false)
        }
    }, [price])

    useEffect(() => {
        if (name !== "" && priceValidation !== false && category !== "") {
            setRegisterBx(true);
        } else {
            setRegisterBx(false);
        }
    },[name,priceValidation,category])
        
    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName])
    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice])

    const [thumbnail, setThumbnail] = useState("");
    const onChange = async (e) => {
        const blobImage = e.target.files[0];
        if (blobImage !== undefined) {
          if (/image.*/.exec(blobImage.type)) {
            const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWSYZ0123456789";
            const N = 16;
              const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n % S.length]).join('')
            const uploadRef = storage.ref(`images/`).child(fileName);
            const uploadTask = uploadRef.put(blobImage);
            uploadTask.then(() => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setThumbnail(downloadURL)
                    setImages({ id: fileName, path: downloadURL })
                });
            })
          } else {
            console.log("データの読み込みに失敗しました。")
          }
        }
    };

    const [categoryName, setCategoryName] = useState("");
    useEffect(() => {
        if (category === 'ドリンク') {
            setCategoryName("drink");
        } else if (category === 'バーガー') {
            setCategoryName("hamburger");
        } else if (category === 'セットメニュー') {
            setCategoryName("setMenu");
        } else if (category === 'その他') {
            setCategoryName("sideMenu");
        } else {
            setCategoryName("");
        }
    }, [category])
    
    const registerBtn = (name, categoryName, price, images) => {
        if (category === 'ドリンク') {
            if (name === "" || categoryName === "" || price === "") {
                alert('すべて入力してください。')
            } else {
                db.collection(categoryName).doc().set({
                    name: name,
                    category: category,
                    price: price
                  },{merge:true})
                  .then(()=>{
                      alert("登録しました");
                      setName("");
                      setCategoryName("");
                      setPrice("");
                      setCategory("");
                      setThumbnail("")
                  })
                  .catch((error)=>{
                    alert(`更新に失敗しました (${error})`);
                  });
            }
        } else {
            if (name === "" || categoryName === "" || price === "" || images === "") {
                alert('すべて入力してください。')
            } else {
                db.collection(categoryName).doc().set({
                    name: name,
                    category: category,
                    price: price,
                    images:images
                  },{merge:true})
                  .then(()=>{
                      alert("登録しました");
                      setName("");
                      setCategoryName("");
                      setPrice("");
                      setImages([]);
                      setCategory("");
                      setThumbnail("")
                  })
                  .catch((error)=>{
                    alert(`更新に失敗しました (${error})`);
                  });
            }            
        }

    }

    const productCategory = String(id).substring(0, String(id).indexOf("-"));
    const productId = String(id).substring(String(id).indexOf("-") + 1);

    useEffect(() => {
        function getProductData() {
            if (productCategory !== "" && productId !== "") {
                var docRef = db.collection(productCategory).doc(productId);
                docRef.get().then((doc)=>{
                  if (doc.exists) {
                    const data = doc.data();
                    setName(data.name);
                    setPrice(data.price);
                    setImages([data.images]);
                    setCategory(data.category);
                    setThumbnail(data.images.path)
                  }
                  else {
                    console.log("404");
                  }
                })
                .catch( (error) => {
                    console.log(`データを取得できませんでした (${error})`);
                });   
            }
        }
        getProductData()
    }, [productCategory, productId]);
    
    return (
        <DashboardLayout>
                <div className={Styles.inner}>
                    <h2>商品編集</h2>
                        <div className={Styles.left}>
                            {(() => {
                                if (category === 'ドリンク') {
                                    return <>ドリンクメニューは画像登録できません。</>
                                } else {
                                    return <>
                                        {thumbnail ?
                                            <>
                                                <div className={Styles.setImagesBx}>
                                                    <span style={{ position: 'relative', width: '100%', height: '20vw', display: 'block', background: 'rgb(248, 248, 248)' }}>
                                                        <Image src={thumbnail} alt={"A thumbnail of the question"} layout="fill" objectFit="contain" priority={true} />
                                                    </span>
                                                </div>
                                                <div className={Styles.Register_images_bx}>
                                                    <span onClick={() => deleteStorage()}>
                                                        <AddPhotoAlternateIcon />削除
                                                    </span>
                                                </div>
                                            </> :
                                            <>
                                                <div className={Styles.setImagesBx}>
                                                    <span style={{ position: 'relative', width: '100%', height: '20vw', display: 'block', background: 'rgb(248, 248, 248)' }}>
                                                        <Image src={noImage} alt={"A thumbnail of the question"} layout="fill" objectFit="contain" priority={true} />
                                                    </span>
                                                </div>
                                                <div className={Styles.Register_images_bx}>
                                                    <label>
                                                        <input type="file" name="file" onChange={onChange} /><AddPhotoAlternateIcon />商品画像を登録
                                                    </label>
                                                </div>
                                            </>
                                        }                            
                                    </>
                                }
                            })()}
                    </div>
                    <div className={Styles.right}>
                        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                            <div className={Styles.input}>
                                <TextBox fullWidth={true} label={"商品名"} multiline={false} required={true} onChange={inputName} rows={1} value={name} type={"text"} />
                            </div>
                            <div className={Styles.input}>
                                <SelectBox label={"カテゴリ―"} required={true} options={categories} select={setCategory} value={category} />
                            </div>
                            <div className={Styles.input}>
                                <TextBox fullWidth={true} label={"価格（税込み）"} multiline={false} required={true} onChange={inputPrice} rows={1} value={price} type={"text"} />
                                {priceValidation ? <></> : <span className={Styles.validation}>半角数字で入力してください。</span>}
                            </div>
                            {(() => {
                                if (category === 'ドリンク') {
                                    return <>{registerBx ? <div className={Styles.registerBtn} onClick={() => registerBtn(name,categoryName,price)}>登録</div> : <></>}</>
                                } else {
                                    return <>{registerBx ? <div className={Styles.registerBtn} onClick={() => registerBtn(name,categoryName,price,images)}>登録</div> : <></>}</>
                                }
                            })()}
                        </Box>
                    </div>
                </div>
        </DashboardLayout>
    )
};
export default Product;