import { BrowseItems } from './components/BrowseItems.component'
import { Item } from './types'
import { MERCHANDISE } from './redux/_keys'
import { SideBar } from './components/SideBar.component'
import { read } from './redux/redux.utils'
import { useSelector } from 'react-redux'

function App() {
  const merchandise = useSelector(read<Item[]>(MERCHANDISE))

  return (
    <>
      <h1>Foogle Store</h1>
      <div style={{ display: 'flex' }}>
        <BrowseItems items={merchandise} />
        <SideBar />
      </div>
    </>
  )
}

export default App
