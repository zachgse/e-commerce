import { lazy,Suspense } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import './App.css'

// layout
import MainLayout from './components/MainLayout'
import ProfileLayout from './components/ProfileLayout'
import AdminLayout from './components/AdminLayout'

import Loading from './components/Loading'
import ProductSingleSkeleton from './components/products/single/ProductSingleSkeleton'
import CheckoutSkeleton from './pages/checkout/CheckoutSkeleton'
import PaymentConfirmed from './pages/checkout/PaymentConfirmation'
import Search from './pages/Search'

// orders
import OrderList from './pages/user/order/OrderList'
import OrderDetails from './pages/user/order/OrderDetails'

//admins
import ProductDashboard from './pages/admin/ProductDashboard'
import OrderDashboard from './pages/admin/OrderDashboard'

const Home = lazy(() => import("./pages/Home"))
const ProductShow = lazy(() => import("./pages/ProductShow"))
const Cart = lazy(() => import("./pages/Cart"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const Checkout = lazy(() => import("./pages/checkout/Checkout"))

function App() {
  const queryClient = new QueryClient();
  window.Pusher = Pusher;

  window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={
              <Suspense fallback={<Loading/>}>
                <Home/>
              </Suspense>
            }/>
            <Route path="product/:slug" element={
              <Suspense fallback={<ProductSingleSkeleton/>}>
                <ProductShow/>
              </Suspense>
            }/>
            <Route path="cart" element={
              <Suspense fallback={<Loading/>}>
                <Cart/>
              </Suspense>
            }/>
            <Route path="checkout" element={
              <Suspense fallback={<CheckoutSkeleton/>}>
                <Checkout/>
              </Suspense>
            }/>
            <Route path="search" element={<Search/>}/>
            <Route path="payment-confirmation/:reference_number" element={<PaymentConfirmed/>}/>
            <Route path="/user" element={<ProfileLayout/>}>
              <Route path="order" element={<OrderList/>}/>
              <Route path="order/:reference_number" element={<OrderDetails/>}/>
            </Route>
          </Route>
          <Route path="/admin" element={<AdminLayout/>}>
            <Route path="products" element={<ProductDashboard/>}/>
            <Route path="orders" element={<OrderDashboard/>}/>
          </Route>
          <Route path="login" element={
            <Suspense fallback={<Loading/>}>
              <Login/>
            </Suspense>
          }/>
          <Route path="register" element={
            <Suspense fallback={<Loading/>}>
              <Register/>
            </Suspense>
          }/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
