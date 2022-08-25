import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

// Style
import './App.css'
// Components
import { Blog } from './component/Blog/Blog'
import { Footer } from './component/Footer/Footer'
import { Navbar } from './component/Navbar/Navbar'
import { PokeDeck } from './component/PokeDeck/PokeDeck'
import { RegisterForm } from './component/RegisterForm/RegisterForm'

import { Chat } from './pages/Chat/Chat'
import { Checkout } from './pages/Checkout/Checkout'
import { ContactForm } from './pages/Contact/ContactForm'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'

// Context

// import { Form } from './component/Form/Form'
// import { PrivateRoute } from './component/PrivateRoute/PrivateRoute'

function App() {
  const { isSignedIn } = useSelector((store) => store.user)
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/contact'
            element={<ContactForm />}
          />
          <Route
            path='/chat'
            element={<Chat />}
          />
          <Route
            path='/blogs'
            element={isSignedIn && <Blog />}
          />
          <Route
            path='/poke-deck'
            element={<PokeDeck />}
          />
          <Route
            path='/dashboard'
            element={<Dashboard />}
          />
          <Route
            path='/checkout'
            element={<Checkout />}
          />
          <Route
            path='/sign-up'
            element={<RegisterForm />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App

// Todo add login form better
// Todo error pages
// Todo basket payment
// Todo main page to introduce myself as a web developer
