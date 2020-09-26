import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import userStore from '../stores/userStore';
import { loadUserBySub } from '../actions/userActions';
import './header.scss';

const HeaderLogin = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [userMongo, setUserMongo] = useState();

    useEffect(() => {
        userStore.addChangeListener(onChange);

        if (isAuthenticated && !userMongo) {
            (async function asyncLoad() {
                await loadUserBySub(user.sub);
                setUserMongo(userStore.getUser());
            })();
        } 

        return () => userStore.removeChangeListener(onChange);
    }, [user, userMongo?.cart.length]);

    function onChange() {
        setUserMongo(userStore.getUser())
    }

    return (
        <>
            <section className="header-contain">
                <div className="nav">
                    <Link to="#" className="nav__arrow"></Link>
                    <Link to="/" className="nav__logo"></Link>
                    <Link to="/cart" className="nav__cart">
                    {userMongo?.cart.length > 0 &&
                        <div className="nav__cart-number">{userMongo?.cart.length}</div>
                    }
                    </Link>
                </div>
            </section>
        </>
    )
}

export default HeaderLogin;