import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { resetPass, updateProfile } from '../redux/actions/usersActions';
import { imageUpload } from '../utils/imageUpload';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useRouter } from 'next/router';
function profile(props) {
    const { user } = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const router = useRouter()
    const [name, setName] = useState(user?.name)
    const [avatar, setAvatar] = useState('')
    const [email, setEmail] = useState(user?.email)
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [errorPh, setError] = useState('')
    const { token } = useSelector(state => state.token)
    const { msg, error, loading } = useSelector(state => state.updateProfile)
    const changeAvatar = (e) => {
        const file = e.target.files[0]
        if (!file)
            return setError('File does not exist.')

        if (file.size > 1024 * 1024) //1mb
            return setError('The largest image size is 1mb.')

        if (file.type !== "image/jpeg" && file.type !== "image/png") //1mb
            return setError('Image format is incorrect.')

        setAvatar(file)
    }
    const updatePassword = () => {
        if (password === confirmPass) {
            dispatch(resetPass({ password }, token))
        } else {
            alert('password and confirm password not equals')
        }
    }
    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        let media;
        if (avatar) media = await imageUpload([avatar])
        dispatch(updateProfile({ name, avatar: avatar ? media[0].url : user?.avatar }, token))
        if (password) {
            updatePassword()
        }
    }
    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [])
    return (
        <div className="profile_page">
            <Head>
                <title>Profile</title>
            </Head>
            <section className="container row text-secondary my-3">
                {errorPh && <Message>{errorPh}</Message>}
                {error && <Message>{error}</Message>}
                {loading && <Loader />}
                {msg && (<div class="alert alert-info" role="alert">
                    {msg?.msg}
                </div>)}
                <div className="col-md-6">
                    <h3 className="text-center text-uppercase">
                        {user?.role === 1 ? 'User Profile' : 'Admin Profile'}
                    </h3>

                    <div className="avatar">
                        <img src={avatar ? URL.createObjectURL(avatar) : user?.avatar}
                            alt="avatar" />
                        <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up"
                                accept="image/*" onChange={changeAvatar} />
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control"
                            value={email}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input type="password" className="form-control"
                            placeholder="Your new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cf_password">Confirm New Password</label>
                        <input type="password" className="form-control"
                            placeholder="Confirm new password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-info"
                        onClick={handleUpdateProfile}
                    >

                        Update
                    </button>
                </div>
            </section>
        </div>
    );
}

export default profile;