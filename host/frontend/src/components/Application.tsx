import Header from './Header/Header.tsx'
import Content from './Content/Content.tsx'
import { BrowserRouter } from 'react-router-dom'

export default function Application() {
  return (
    <BrowserRouter>
      <Header />
      <Content />
    </BrowserRouter>
  )
}
