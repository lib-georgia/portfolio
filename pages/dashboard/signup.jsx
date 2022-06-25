import React,{useState,useCallback} from 'react'
import TextBox from '../../components/Uikit/TextBox';
import { db } from "../../firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Router from 'next/router'
import Image from 'next/image'
import Link from 'next/link';
import logo from '../../assets/images/logo2.png'
import styles from './Sign.module.scss';

const SignUp = () => {
    const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

  const inputName = useCallback((event) => { setName(event.target.value) }, [setName]);
  const inputEmail = useCallback((event) => { setEmail(event.target.value) }, [setEmail]);
  const inputPassword = useCallback((event) => { setPassword(event.target.value) }, [setPassword]); 
    const inputConfirmPassword = useCallback((event) => { setConfirmPassword(event.target.value) }, [setConfirmPassword]);
    
  const toSignUp = (name,email,password,confirmPassword) => {
    // const auth = getAuth(FirebaseApp);
    const auth = getAuth();
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
        alert("必須項目が未入力です。")
        return false
    }
    if (password !== confirmPassword) {
        alert("パスワードが一致しません。")
        return false
    }
    if (password.length < 6) {
        alert('パスワードは6文字以上で入力してください。')
        return false
    }
 createUserWithEmailAndPassword(auth,email, password).then(async(userCredential) => {
   const user = userCredential.user;
   if (user.uid) {
    db.collection("user").doc(user.uid).set({
      name: name,
       email: email
    }).then(() => {
      alert('登録が完了しました。')
      Router.push('/dashboard')
    })
    .catch(() => {
      alert('登録できませんでした。')
    });
   }
  }).catch(async () => {
        alert('登録できませんでした。。。')
    }); 
}

  return (
    <div className={styles.container}>
      <div className={styles.signInInner}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <div className={styles.logoBx}>
              <Image src={logo} alt="logo" width="35px" height="35px" />
            </div>
            <p>Tbilisi Burger</p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.signUpBx}>
            <h1>Sign up</h1>
            <TextBox className={'inputBx'} label={'Full Name（フルネーム）'} type={"text"} InputLabelProps={{ shrink: true, }} variant={"standard"} value={name} onChange={inputName} />
            <TextBox className={'inputBx'} label={'Email（メールアドレス）'} type={"email"} InputLabelProps={{ shrink: true, }} variant={"standard"} value={email} onChange={inputEmail} />
            <TextBox className={'inputBx'} label={'Password（パスワード）'} type={"text"} InputLabelProps={{ shrink: true, }} variant={"standard"} value={password} onChange={inputPassword} />
            <TextBox className={'inputBx'} label={'confirmPassword（確認用パスワード）'} type={"text"} InputLabelProps={{ shrink: true, }} variant={"standard"} value={confirmPassword} onChange={inputConfirmPassword} />
            <button onClick={() => toSignUp(name, email, password, confirmPassword)}>登録</button>
            <Link href={'/dashboard/signin'}>
              <a data-testid='signin'>
                <p>ログインはこちら</p>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignUp