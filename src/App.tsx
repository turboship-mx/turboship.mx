import './App.css'
import { HomePage } from './pages/HomePage'
import { CarrierPage } from './pages/CarrierPage'
import { Footer } from './components/Footer'
import { useRoute } from './router'

function App() {
  const pathname = useRoute()
  const isCarrier = pathname === '/carrier'
  const Page = isCarrier ? CarrierPage : HomePage

  return (
    <div className={isCarrier ? 'theme-dark min-h-screen' : undefined}>
      <Page />
      <div className="px-[7vw] max-[720px]:px-[4vw]">
        <Footer />
      </div>
    </div>
  )
}

export default App
