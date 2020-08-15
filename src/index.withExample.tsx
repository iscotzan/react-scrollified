import * as React from 'react'
import styles from './styles.module.css'
import ReactScrollified from './react-scrollified/react-scrollified'
import { useEffect, useState } from 'react'

const loader = <span>Loading...</span>

const range = (start: number, stop: number, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step)

export const ExampleComponent = () => {
  const [items, setItems] = useState<any>([])
  useEffect(() => {
    loadMore(0)
  }, [])

  const loadMore = (offset: number) => {
    console.log('load more', offset)
    const newData = range(offset, offset + 100)
    setTimeout(() => {
      setItems([...items, ...newData])
    }, 400)
  }
  return (
    <div className={styles.test}>
      <div style={{ minHeight: '800px' }}>
        <ReactScrollified
          hasMore
          loader={loader}
          loadMore={(offset) => loadMore(offset)}
        >
          {items.map((item: any, index: any) => (
            <div key={index}>{item}</div>
          ))}
        </ReactScrollified>
      </div>
    </div>
  )
}

export default ReactScrollified
