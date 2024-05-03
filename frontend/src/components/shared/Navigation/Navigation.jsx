import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../../http';
import styles from './Navigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const brandStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
    };

    const logoText = {
        marginLeft: '10px',
    };
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((state) => state.auth);
    async function logoutUser() {
        try {
            const { data } = await logout();
            dispatch(setAuth(data));
            // window.location.replace('http://localhost:3000')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to="/">
                <img src="/images/logo.png" alt="logo" />
                <span style={logoText}>Codershouse</span>
            </Link>
            {isAuth && (
                <div className={styles.navRight}>
                    <h3>{user?.username}</h3>

                    <img
                        className={styles.avatar}
                        src={
                            user.avatar
                                ? user.avatar
                                : '/images/monkey-avatar.png'
                        }
                        width="40"
                        height="40"
                        alt="avatar"
                    />

                    {/* <button
                        className={styles.logoutButton}
                        onClick={logoutUser}
                    >
                        <img src="/images/logout.png" alt="logout" />
                    </button> */}
                </div>
            )}
        </nav>
    );
};

export default Navigation;
