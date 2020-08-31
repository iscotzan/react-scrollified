import React, { useState } from 'react'
import './App.css'
import 'react-scrollified/dist/index.css'
import { ExampleComponent } from './index.example'
import { DocumentScrolledExampleComponent } from './index.document-scrolled-example'

type ExampleMode = 'doc' | 'custom';
const App = () => {
  const [currentExample, setCurrentExample] = useState<ExampleMode>('doc')
  const currentExampleSelected = (exampleType: ExampleMode) => {
    setCurrentExample(exampleType)
  }
  const Layout = () => {
    return (
      <div>
        <div className="menu">
          <button className={currentExample === 'doc' ? 'example-button selected' : 'example-button'}
                  onClick={() => currentExampleSelected('doc')}>Document as root example
          </button>
          <button className={currentExample === 'custom' ? 'example-button selected' : 'example-button'}
                  onClick={() => currentExampleSelected('custom')}>Custom root example
          </button>
        </div>
        <div className="main">
          {currentExample === 'custom' ?
            <ExampleComponent/>
            :
            <DocumentScrolledExampleComponent/>
          }
        </div>
      </div>
    )
  }
  // return <DocumentScrolledExampleComponent/>
  return <Layout/>
}

export default App
