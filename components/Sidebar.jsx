import Link from 'next/link'
import Styles from './styles/sidebar.module.scss'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AddIcon from '@mui/icons-material/Add';
import MovingIcon from '@mui/icons-material/Moving';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { FirebaseApp } from "../firebaseApp";
import { getAuth } from "firebase/auth";
import Router from 'next/router';

const Sidebar = () => {
    const auth = getAuth(FirebaseApp);
    const signOut = () => {
        auth.signOut().then(() => {
            Router.push('/dashboard/signin')
        })
    };
    return (
        <ul className={Styles.sidebar}>
            <li>
                <Link href={'/dashboard'}>
                    <a>
                        <DashboardIcon /><p>Dashboard</p>
                    </a>
                </Link>
            </li>
            <li>
                <Link href={'/dashboard/order'}>
                    <a>
                        <ShoppingCartCheckoutIcon /><p>注文管理</p>
                    </a>
                </Link>
            </li>
            <li>
                <Link href={'/dashboard/sales'}>
                    <a>
                        <MovingIcon /><p>販売数</p>
                    </a>
                </Link>
            </li>
            <li>
                <Link href={'/dashboard/register'}>
                    <a>
                        <AddIcon /><p>商品登録</p>
                    </a>
                </Link>
            </li>
            <li>
                <Link href={'/dashboard/edit'}>
                    <a>
                        <AppRegistrationIcon /><p>商品編集</p>
                    </a>
                </Link>
            </li>
            <li onClick={signOut}>
                <a>
                    <LogoutIcon /><p>ログアウト</p>
                </a>
            </li>
        </ul>
    )  
}

export default Sidebar