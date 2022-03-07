import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateRoleUser } from '../../../redux/actions/usersActions';

function editUser(props) {
    const router = useRouter()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const [admin, setAdmin] = useState(user?.admin)
    const { token } = useSelector(state => state.token)
    const { id } = router.query
    useEffect(() => {
        dispatch(fetchUser(id, token))
    }, [dispatch])
    const changeRole = (e) => {
        e.preventDefault()
        dispatch(updateRoleUser(id, { admin }, token, router))
    }
    return (
        <div className='container'>
            <form className='form-forgot' >
                <h1 class="h3 mb-3 fw-normal">CHANGE ROLE USER</h1>
                <div class="form-floating">
                    <input type="email" class="form-control" disabled
                        id="floatingInput"
                        value={user?.name}
                    />
                    <label>Name</label>
                </div>
                <div class="form-floating">
                    <input type="email" class="form-control" disabled
                        id="floatingPassword"
                        value={user?.email}
                    />
                    <label >Email address</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                        value="" id="flexCheckChecked" checked
                        checked={admin}
                        onChange={(e) => setAdmin(e.target.checked)}
                    />
                    <label class="form-check-label" for="flexCheckChecked">
                        Checked checkbox
                    </label>
                </div>
                <button class="w-100 btn btn-lg btn-dark" onClick={changeRole} type="submit">Submit</button>
            </form>
        </div>
    );
}

export default editUser;