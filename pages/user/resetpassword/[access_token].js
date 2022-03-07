import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { resetPass } from '../../../redux/actions/usersActions';

function resetPassword(props) {
    const router = useRouter()
    const dispatch = useDispatch()
    const { access_token } = router.query
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { msg, error, loading } = useSelector(state => state.resetPassword)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            dispatch(resetPass({ password }, access_token))
        } else {
            alert('password and confirm password not equals')
        }
    }
    return (
        <div className='container'>
            <form className='form-reset' onSubmit={handleSubmit}>
                {error && <Message>{error}</Message>}
                {loading && <Loader />}
                {msg && (<div class="alert alert-info" role="alert">
                    {msg?.msg}
                </div>)}
                <h1 class="h3 mb-3 fw-normal">RESET YOUR PASSWORD</h1>
                <div class="form-floating">
                    <input type="password" class="form-control"
                        id="floatingInput" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label for="floatingInput">Password</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control"
                        id="floatingPassword" placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label for="floatingPassword">Confirm Password</label>
                </div>
                <button class="w-100 btn btn-lg btn-dark" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default resetPassword;