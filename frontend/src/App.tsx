import { lazy,Suspense } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Loading from './components/reusable/Loading'

// layout
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

// custom middlewares
import AuthRoute from './utils/AuthRoute'
import AdminRoute from './utils/AdminRoute'
import GuestRoute from './utils/GuestRoute'
import EmailVerifiedRoute from './utils/EmailVerifiedRoute'

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const Checkout = lazy(() => import("./pages/checkout/Checkout"))
import Verification from './pages/Verification'
import ProductShow from './pages/ProductShow'
import Search from './pages/Search'
import Cart from './pages/Cart'
import CheckoutSkeleton from './pages/checkout/CheckoutSkeleton'
import PaymentConfirmed from './pages/checkout/PaymentConfirmation'

// orders
import Order from './pages/order/Order'
import OrderShow from './pages/order/OrderShow'

//admins
import Dashboard from './pages/admin/Dashboard'
import ProductDashboard from './pages/admin/ProductDashboard'
import OrderDashboard from './pages/admin/OrderDashboard'
import PaymentDashboard from './pages/admin/PaymentDashboard'

function App() {
  const queryClient = new QueryClient();

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
            <Route path="product/:slug" element={<ProductShow/>}/>
            <Route path="search" element={<Search/>}/>
            <Route element={<AuthRoute/>}>
              <Route element={<EmailVerifiedRoute/>}>
                <Route path="cart" element={<Cart/>}/>
                <Route path="checkout" element={
                  <Suspense fallback={<CheckoutSkeleton/>}>
                    <Checkout/>
                  </Suspense>
                }/>
                <Route path="payment-confirmation/:reference_number" element={<PaymentConfirmed/>}/>
                <Route path="order/">
                  <Route path="" element={<Order/>}/>
                  <Route path=":reference_number" element={<OrderShow/>}/>
                </Route>
              </Route>

              <Route path="verify" element={<Verification/>}/>
            </Route>
          </Route>

          <Route element={<AuthRoute/>}>
            <Route element={<AdminRoute/>}>
              <Route path="/admin" element={<AdminLayout/>}>
                <Route path="" element={<Dashboard/>}/>
                <Route path="products" element={<ProductDashboard/>}/>
                <Route path="orders" element={<OrderDashboard/>}/>
                <Route path="payments" element={<PaymentDashboard/>}/>
              </Route>
            </Route>
          </Route>

          <Route element={<GuestRoute/>}>
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
          </Route>

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
