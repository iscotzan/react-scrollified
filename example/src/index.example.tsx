import * as React from 'react'
import { useEffect, useState } from 'react'
import { invertColor } from './helper/invert-color'
import { rainbow } from './helper/random-color'
import ReactScrollified from 'react-scrollified'


const loader = <div style={{ width: '100%', textAlign: 'center' }}>Loading...</div>

const range = (start: number, stop: number, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step)

export const ExampleComponent = () => {
  const [items, setItems] = useState<any>([])
  const [containerBackgroundColor, setContainerBackgroundColor] = useState<any>('#fff')
  useEffect(() => {
    loadMore(0)
  }, [])

  const loadMore = (page: number) => {
    const limit = 30
    const offset = page * limit
    console.log('load more', page)
    const newData = range(offset, offset + limit)
    setTimeout(() => {
      setItems([...items, ...newData])
    }, 400)
  }
  const generateBox: (item: number, index: number) => JSX.Element = (index: number, item: number) => {
    const boxColor = rainbow(1618, index * 10)
    return (
      <div style={{
        height: '168px',
        width: '168px',
        display: 'inline-flex',
        justifyContent: 'flex-start',
        margin: '1rem',
        padding: '1rem',
        borderRadius: '29% 71% 70% 30% / 32% 35% 65% 68% ',
        boxShadow: `inset 0 0 7px ${invertColor(boxColor)}`,
        background: boxColor,
        textAlign: 'left',
        cursor: 'pointer'
      }}
           key={index}
           onClick={() => setContainerBackgroundColor(boxColor)}
      >
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%'
                }}>{item + 1}
              </span>
      </div>
    )
  }
  return (
    <div
      id="scrolled-window"

      style={{
        height: '500px',
        maxWidth: '1000px',
        textAlign: 'center',
        margin: '2.5em auto',
        borderRadius: '37.25px 37.25px 37.25px 37.25px',
        border: `3px solid ${invertColor(containerBackgroundColor)}`,
        padding: '0.5em',
        fontSize: '2em',
        background: containerBackgroundColor
      }}>
      <ReactScrollified
        scrolledDiv="scrolled-window"
        hasMore={true}
        loader={loader}
        externalListWrapperClassName={'list-wrapper'}
        loadMore={(page: number) => loadMore(page)}>
        {items.map((item: any, index: any) => {
            return (generateBox(item, index))
          }
        )}
      </ReactScrollified>
    </div>
  )
}
