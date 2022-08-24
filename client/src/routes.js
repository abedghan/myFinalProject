import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './hoc/main_layout';
import Header from './components/navigation/header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { Loader } from './utilis/tools';
import { isAuth } from './store/actions/users'
//Main components
import Home from './components/home';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import AuthGuard from './hoc/auth_guard';

import DashboardMain from './components/dashboard/main';
import AdminArticles from './components/dashboard/articles';
import AdminProfile from './components/dashboard/profile';
import AddArticle from './components/dashboard/articles/edit_add/add'


const Router = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector(state => state.users)
  useEffect(() => {
    dispatch(isAuth())
  }, [])
  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false);
    }
  }, [users])


  return (
    <BrowserRouter>
      {loading ?
        <Loader />
        :
        <>
          <Header />
          <MainLayout>
            <Routes>

              <Route path='/dashboard' element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } >
                <Route index element={< DashboardMain />} />
                <Route path='profile' element={<AdminProfile />} />
                <Route path='articles' element={<AdminArticles />} />
                <Route path='articles/add' element={<AddArticle />} />
              </Route >
              <Route path='/auth' element={<Auth />} />
              <Route path='/' element={<Home />} />

            </Routes>
          </MainLayout>
        </>
      }
    </BrowserRouter>
  )
}

export default Router;