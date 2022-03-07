import React, { useEffect } from 'react';
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers } from '../../redux/actions/usersActions';
import Link from 'next/link';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';

function users(props) {
    const router = useRouter()
    const { token } = useSelector(state => state.token)
    const { users, loading } = useSelector(state => state.users)
    const { user } = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUsers(token))
    }, [dispatch, token])
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUser(id, token))
        }
    }
    useEffect(() => {
        if (!user?.admin) {
            router.push('/login')
        }
    }, [])
    return (
        <div className='container'>
            <Head>
                <title>Users</title>
            </Head>
            <h2 className='text-center p-2'>Users</h2>
            {loading ? (<Loader />) : (
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">ID</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Admin</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr>
                                <th>{index + 1}</th>
                                <td>{user._id}</td>
                                <td> <img src={user.avatar} alt={user.avatar}
                                    style={{
                                        width: '30px', height: '30px',
                                        overflow: 'hidden', objectFit: 'cover'
                                    }} /></td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.admin === true
                                            ? <i className="bi bi-check-circle text-primary"></i>
                                            : <i className="bi bi-x-circle-fill text-danger"></i>
                                    }
                                </td>
                                <td>
                                    <Link href={`/admin/editUser/${user._id}`}>
                                        <a><i className="bi bi-pencil-square text-info mr-2" title="Edit"></i></a>
                                    </Link>
                                    <i style={{ cursor: 'pointer' }}
                                        onClick={() => deleteHandler(user._id)}
                                        className="bi bi-trash2-fill text-danger ml-2"
                                        title="Remove"></i>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}
        </div >
    );
}

export default users;