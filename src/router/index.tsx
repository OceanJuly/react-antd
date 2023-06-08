import { ReactNode, Suspense, lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import AppLayout from '@/components/appLayout'

const Dashboard = lazy(() => import("@/pages/dashboard/dashboard"))
const Home = lazy(() => import("@/pages/home/index"))
const Process = lazy(() => import("@/pages/process/index"))
const Login = lazy(() => import("@/pages/login"))
const Logs = lazy(() => import("@/pages/logs-portal/index"))
const LogDetail = lazy(() => import("@/pages/logs-portal/components/log-detail"))
const ItelIde = lazy(() => import("@/pages/test-case/itel-ide"))
const DataModeler = lazy(() => import("@/pages/data-modeler"))
const DataModelerDetail = lazy(() => import("@/pages/data-modeler/components/dataModelerDetail"))
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
    },
    {
        path: '/testcase',
        element: <AppLayout></AppLayout>,
        children: [
            {
                path: '/testcase/ide',
                element: lazyLoad(<ItelIde/>),
            }
        ]
    },
    {
        path: '/datamodeler',
        element: <AppLayout></AppLayout>,
        children: [
            {
                path: '/datamodeler',
                element: lazyLoad(<DataModeler></DataModeler>)
            },
            {
                path: '/datamodeler/detail/:name',
                element: lazyLoad(<DataModelerDetail></DataModelerDetail>)
            }
        ]
    }
]