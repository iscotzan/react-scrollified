# react-scrollified

> Simple React infinite scroll component, utilizing IntersectionObserver

[![NPM](https://img.shields.io/npm/v/react-scrollified.svg)](https://www.npmjs.com/package/react-scrollified) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

##### [Demo](https://iscotzan.github.io/react-scrollified/)

## Install

```bash
npm install --save react-scrollified
```

### API - ReactScrollified Props

| Option         | type        | default           | Description                                                                          |
| -------------- | ----------- | ----------------- | ------------------------------------------------------------------------------------ |
| `hasMore`      | `boolean`   | ---               | got more to load?                                                                    |
| `loader`       | `ReactNode` | ---               | element to use as loader                                                             |
| `loadMore`     | `function`  | ---               | function used to load more items                                                     |
| `offset?`      | `number`    | 0 (optional)      | starting offset                                                                      |
| `scrolledDiv?` | `string`    | window (optional) | the scrolled parent div id, !important - must have defined height. default is window |

## Usage Example

```tsx
import * as React from 'react'
import styles from './styles.module.css'
import ReactScrollified from './infinite-scroll/infinite-scroll'
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
    //your http request here
    const newData = range(offset, offset + 100)
    setTimeout(() => {
      setItems([...items, ...newData])
    }, 400)
  }

  return (
    <div id="scrolled-div" style={{ height: '800px' }}>
      <ReactScrollified
        scrolledDiv="scrolled-div"
        hasMore={true}
        loader={loader}
        loadMore={(offset) => loadMore(offset)}
      >
        {items.map((item: any, index: any) => (
          <div key={index}>{item}</div>
        ))}
      </ReactScrollified>
    </div>
  )
}
```

## License

MIT © [iscotzan](https://github.com/iscotzan)
