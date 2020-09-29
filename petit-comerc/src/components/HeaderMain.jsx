import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import productStore from '../stores/productStore';
import userStore from '../stores/userStore';
import { loadStores } from '../actions/storeActions';
import { loadUserBySub } from '../actions/userActions';
import './header.scss';

const HeaderMain = ({ click }) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [userMongo, setUserMongo] = useState();
    const { logout } = useAuth0();
    const [stores, setStores] = useState(productStore.getStores());

    useEffect(() => {
        productStore.addChangeListener(onChange);

        if (stores.length === 0) loadStores();

        if (isAuthenticated && !userMongo) {
            (async function asyncLoad() {
                await loadUserBySub(user.sub);
                setUserMongo(userStore.getUser());
            })();
        } 

        return () => productStore.removeChangeListener(onChange);
    }, [stores.length]);

    function onChange() {
        setStores(productStore.getStores());
    }

    return (
        <>
            <section className="header-contain">
                <div className="nav"> 
                    
                    <div className="nav__hamburger">                           

                        <ul className="menu">
                            <div className="flex-up">
                                <Link to="/" className="menu__title">Menú</Link>
                                <div>
                                    <Link onClick={(event) => {
                                        event.preventDefault()
                                        click('Todos')}}
                                            className="menuToggle__link">
                                        <li>Tots</li>
                                    </Link>
                                    <Link onClick={(event) => {
                                        event.preventDefault()
                                        click('Alimentació')}}  
                                            className="menuToggle__link">
                                        <li>Alimentació</li>
                                    </Link>
                                    <Link onClick={(event) => {
                                        event.preventDefault()
                                        click('Restauració')}}
                                            className="menuToggle__link">
                                        <li>Restauració</li>
                                    </Link>
                                    <Link onClick={(event) => {
                                        event.preventDefault()
                                        click('Moda')} }
                                        className="menuToggle__link">
                                        <li>Moda</li>
                                    </Link>
                                    <Link onClick={(event) => {
                                        event.preventDefault()
                                        click('Llar')}}
                                            className="menuToggle__link">
                                        <li>Llar</li>
                                    </Link>
                                    <Link onClick={(event) => {
                                        event.preventDefault()
                                        click('Salut i bellesa')}}
                                            className="menuToggle__link">
                                        <li>Salut i bellesa</li>
                                    </Link>
                                    <Link onClick={(event) => {
                                        event.preventDefault()
                                        click('Lleure i cultura')}}
                                        className="menuToggle__link">
                                        <li>Lleure i cultura</li>
                                    </Link>
                                    <Link onClick={(event) => {
                                        event.preventDefault()
                                        click('Altres')}}
                                            className="menuToggle__link">
                                        <li>Altres</li>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex-grow"></div>
                            <div className="flex-down">
                                <div>
                                    <Link to='/' className="menuToggle__link">
                                        <li>Sobre nosaltres</li>
                                    </Link>
                                    <Link to='/' className="menuToggle__link">
                                        <li>Contacte</li>
                                    </Link>
                                    <Link
                                        to='/'
                                        className="menuToggle__link"
                                        onClick={() =>
                                            logout({
                                                returnTo: window.location.origin
                                            })
                                        }
                                    >
                                        <li>Tanca sessió</li>
                                    </Link>
                                </div>
                                <div className="icon">
                                    <Link
                                        to="#"
                                        className="icon__facebook"
                                    ></Link>
                                    <Link
                                        to="#"
                                        className="icon__instagram"
                                    ></Link>
                                    <Link
                                        to="#"
                                        className="icon__twitter"
                                    ></Link>
                                </div>
                            </div>
                        </ul> 

                    </div>
                <Link to="/" className="nav__logo"></Link>
                <Link to="/cart" className="nav__cart">
                    {userMongo?.cart.length > 0 &&
                        <div className="nav__cart-number">{userMongo?.cart.length}</div>
                    }
                </Link>
                </div>
        
            </section>
        </>
    );
};

export default HeaderMain;
