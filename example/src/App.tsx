import React, { ReactNode } from 'react'

import ReactScrollified from 'react-scrollified'
import 'react-scrollified/dist/index.css'

interface ReactScrollifiedProps {
  loader: ReactNode
  hasMore: boolean
  offset?: number
  loadMore: (page: number) => void
}

const App = (props: ReactScrollifiedProps) => {
  return <ReactScrollified loadMore={props.loadMore} hasMore={props.hasMore} offset={props.offset || 0}
                           loader={props.loader || <span>Loading...</span>}/>
}

export default App
