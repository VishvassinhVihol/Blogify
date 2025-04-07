import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './store/store'
import { Provider } from 'react-redux'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import path from 'path'
import { AuthLayout, Login, Signup } from './Components'
import AllPosts from './pages/AllPosts'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import Post from './pages/Post'
import Home from './pages/Home'

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        //authentication is false means there is no need of authentiacation
        element:( <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>)
      },
      {
        path: 'signup',
        element: (<AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>)
      },
      {
        path: 'all-posts',

        //authentiacation true means there is need of authentiacation
        element: (<AuthLayout authentication={true}>
          <AllPosts />
        </AuthLayout>)
      },
      {
        path: 'add-post',

        //authentiacation true means there is need of authentiacation
        element: (<AuthLayout authentication={true}>
          <AddPost />
        </AuthLayout>)
      },
      {
        path: 'edit-post/:slug',

        //authentiacation true means there is need of authentiacation
        element: (<AuthLayout authentication={true}>
          <EditPost/>
        </AuthLayout>)
      },
      {
        path: 'post/:slug',

        //authentiacation true means there is need of authentiacation
        element: (<AuthLayout authentication={true}>
          <Post/>
        </AuthLayout>)
      },
    ]
  }

])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
