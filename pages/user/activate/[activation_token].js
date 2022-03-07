import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { activateEmail } from '../../../redux/actions/usersActions';

function activationEmail(props) {
    const router = useRouter()
    const dispatch = useDispatch()
    const { activation_token } = router.query

    useEffect(() => {
        if (activation_token) {
            dispatch(activateEmail({ activation_token }))
        }

    }, [dispatch, activation_token])
    return (
        <div>
            Activate Email
        </div>
    );
}

export default activationEmail;