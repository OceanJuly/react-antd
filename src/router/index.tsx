import { ReactNode, Suspense, lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import AppLayout from '@/components/appLayout'

const Dashboard = lazy(() => import("@/pages/dashboard/dashboard"))

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
    }
]