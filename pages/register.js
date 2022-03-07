import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { signup } from '../redux/actions/usersActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

function register(props) {
    const router = useRouter()
    const firstLogin = typeof window !== 'undefined' ? localStorage.getItem('firstLogin') : null
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { msg, error, loading } = useSelector(state => state.userRegister)
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(signup(name, email, password))
    }
    useEffect(() => {
        if (firstLogin) return router.push('/')
    }, [])
    return (
        <div className='container'>
            <form className='form-signup' onSubmit={handleSubmit}>
                {error && <Message>{error}</Message>}
                {loading && <Loader />}
                {msg && (<div class="alert alert-info" role="alert">
                    {msg}
                </div>)}
                <h1 class="h3 mb-3 fw-normal">Please Register</h1>
                <div class="form-floating">
                    <input type="name" class="form-control"
                        id="floatingInput" placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label for="floatingInput">Name</label>
                </div>
                <div class="form-floating">
                    <input type="email" class="form-control"
                        id="floatingInput" placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control"
                        id="floatingPassword" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label for="floatingPassword">Password</label>
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                <p className='fs-6 mt-3'>Already an account? <Link href='/login'>Login</Link></p>
            </form>
        </div>
    );
}

export default register;