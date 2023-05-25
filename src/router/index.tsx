import { ReactNode, Suspense, lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import AppLayout from '@/components/appLayout'

const Dashboard = lazy(() => import("@/pages/dashboard/dashboard"))
const Home = lazy(() => import("@/pages/home/index"))
const Process = lazy(() => import("@/pages/process/index"))
const Login = lazy(() => import("@/pages/login"))
const Logs = lazy(() => import("@/pages/logs"))
const LogDetail = lazy(() => import("@/pages/logs/components/log-detail"))
// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): ReactNode =>{
    return <Suspense fallback={<h1>Loading...</h1>}>
      {children}
    </Suspense>
  }

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <AppLayout></AppLayout>,
        children: [
            {
                path: '/dashboard',
                element: lazyLoad(<Dashboard/>),
            }
        ]
    },
    {
        path: '/home',
        element: <AppLayout></AppLayout>,
        children: [
            {
                path: '/home',
                element: lazyLoad(<Home/>),
            }
        ]
    },
    {
        path: '/process/:id',
        element: <Process></Process>
    },
    {
        path: 'login',
        element: <Login></Login>
    },
    {
        path: '/logs',
        element: <AppLayout></AppLayout>,
        children: [
            {
                path: '/logs',
                element: lazyLoad(<Logs/>),
            },
            {
                path: '/logs/detail/:id',
                element: lazyLoad(<LogDetail/>)
            }
        ]
    }
]