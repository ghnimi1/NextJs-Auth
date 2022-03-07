import React, { useEffect } from 'react';
import Link from 'next/link'
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
function Header(props) {
    const router = useRouter()
    const { user } = useSelector(state => state.currentUser)
    const firstLogin = typeof window !== 'undefined' ? localStorage.getItem('firstLogin') : null
    const logout = () => {
        Cookies.remove('refreshTokenn', {
            path: 'api/user/refreshtoken',
        })
        localStorage.removeItem('firstLogin')
        router.push('/login')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link href='/'>
                    <a className="navbar-brand fw-bolder">AUTH</a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    {!firstLogin && (
                        <form className="d-flex">
                            <Link href='/login'>
                                <button style={{ marginRight: '2px' }}
                                    className="btn btn-primary"
                                    type="submit">Login</button>
                            </Link>
                            <Link href='/register'>
                                <button className="btn btn-light"
                                    type="submit">Register</button>
                            </Link>
                        </form>
                    )}
                    {firstLogin && (
                        <div className="dropdown text-end">

                            <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={user?.avatar} alt="mdo"
                                    width="32" height="32" className="rounded-circle" />
                                <span>{user?.name}</span>
                            </a>
                            <ul className="dropdown-menu text-small">
                                <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
                                {user?.admin && <li><Link className="dropdown-item" href="/admin/users">Users</Link></li>}
                                <li><a onClick={logout} className="dropdown-item" href="#">Sign out</a></li>
                            </ul>
                        </div>)
                    }
                </div >
            </div >
        </nav >
    );
}

export default Header;