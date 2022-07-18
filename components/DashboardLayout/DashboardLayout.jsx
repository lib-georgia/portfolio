import { useState, useEffect } from 'react'
import Router from 'next/router'
import { AuthProvider } from '../AuthContext';
import firebase from 'firebase/compat/app';
import Sidebar from '../Sidebar/Sidebar';
import Styles from './Dashboard.module.scss';

const DashboardLayout = ({children}) => {
    const auth = firebase.auth();
    const [user, setUser] = useState("");
    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            if (user){
                setUser(user);
            } else {
                Router.push('/dashboard/signin/')
            }
        });
        return () => {
          unsubscribed();
        };
    }, [auth]);


    return (
        <AuthProvider>
            {user && (
                <div className={Styles.dashboard}>
                    <Sidebar />
                    {children}
                </div>
            )}
        </AuthProvider>
    )
}
export default DashboardLayout