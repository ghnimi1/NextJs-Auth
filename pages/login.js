import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../redux/actions/usersActions'
import Message from '../components/Message';
import Loader from '../components/Loader';
function login(props) {
    const router = useRouter()
    const firstLogin = typeof window !== 'undefined' ? localStorage.getItem('firstLogin') : null
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, loading } = useSelector(state => state.userLogin)
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(signin(email, password, router))
    }
    useEffect(() => {
        if (firstLogin) return router.push('/')
    }, [])
    return (
        <div className='container'>
            <form className='form-signin' onSubmit={handleSubmit}>
                {error && <Message>{error}</Message>}
                {loading && <Loader />}
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                <div class="form-floating">
                    <input type="email" class="form-control"
                        id="floatingInput" placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Email address</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control"
                        id="floatingPassword" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label >Password</label>
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p className='fs-6 text-danger text-end mt-3'><Link href='/forgotPassword'>Forgot your password?</Link></p>
                <p className='fs-5 mt-3'>New Customer? <Link href='/register'>Register</Link></p>
            </form>
        </div>
    );
}

export default login;