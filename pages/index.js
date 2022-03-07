import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, getToken } from '../redux/actions/usersActions'

export default function Home() {
  const dispatch = useDispatch()
  const router = useRouter()
  const auth = useSelector(state => state.userLogin.auth)
  const { token } = useSelector(state => state.token)
  const isLogged = auth?.isLogged
  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser(token))
    }
  }, [isLogged, token, dispatch])
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      dispatch(getToken())
    }
  }, [isLogged, dispatch])
  return (
    <div>
      <Head>
        <title>Auth Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container'
        style={{
          marginTop: '100px', fontWeight: 'bold',
        }}
      >
        <h1>Auth Next APP:
          <ul>
            <li>NodeJs</li>
            <li>Express</li>
            <li>MongoDB </li>
            <li>NextJs</li>
            <li>Bootstrap5</li>
          </ul>
        </h1>
      </main>
    </div>
  )
}