import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { forgotPass } from '../redux/actions/usersActions';

function forgotPassword(props) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const { msg, error, loading } = useSelector(state => state.forgotPassword)
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(forgotPass({ email }))
    }
    return (
        <div className='container'>
            <form className='form-forgot' onSubmit={handleSubmit}>
                {error && <Message>{error}</Message>}
                {loading && <Loader />}
                {msg && (<div class="alert alert-info" role="alert">
                    {msg?.msg}
                </div>)}
                <h1 class="h3 mb-3 fw-normal">FORGOT YOUR PASSWORD</h1>
                <div class="form-floating">
                    <input type="email" class="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                </div>
                <button class="w-100 btn btn-lg btn-dark" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default forgotPassword;