import React from 'react'
import 'intersection-observer' // optional polyfill
import Observer from '@researchgate/react-intersection-observer'

interface ReactScrollifiedProps {
  loader: React.ReactNode
  hasMore: boolean
  offset?: number
  loadMore: (page: number) => void
  scrollDirection?: 'vertical' | 'horizontal'
  externalListWrapperClassName?: string
}

interface ReactScrollifiedState {
  page: number
  childrenCount: number
  loadCount: number
  isLoading: boolean
}

class ReactScrollified extends React.Component<ReactScrollifiedProps,
  ReactScrollifiedState> {
  private isLoading: boolean = false

  constructor(props: ReactScrollifiedProps) {
    super(props)
    this.state = {
      page: 0,
      childrenCount: 0,
      loadCount: 0,
      isLoading: false
    }
  }

  componentDidUpdate(prevProps: Readonly<any>) {
    if (
      React.Children.count(this.props.children) !==
      React.Children.count(prevProps.children)
    ) {
      this.isLoading = false
    }
  }

  handleIntersection(event: any) {
    console.log(event.isIntersecting, 'current page -> ', this.state.page)
    if (event.isIntersecting && this.props.hasMore && !this.isLoading) {
      this.isLoading = true
      this.setState(
        {
          page: this.state.page + 1,
          loadCount: this.state.loadCount + 1
        },
        () => {
          this.props.loadMore(this.state.page - 1)
        }
      )
    }
  }

  render() {
    const options = {
      onChange: this.handleIntersection.bind(this),
      root: '#rsc-container'
    }
    const containerHeight = '100%' // window.innerHeight
    const className = this.props.externalListWrapperClassName ? this.props.externalListWrapperClassName : 'rsc-container'
    return (
      <div
        id='rsc-container'
        className={className}
        style={
          this.props.scrollDirection === 'horizontal'
            ? { overflowX: 'scroll' }
            : {
              overflowY: 'auto',
              height: containerHeight
            }
        }
      >
        {this.props.children}
        <Observer {...options}>
          <div className='rsc-loader-wrapper'>{this.props.loader}</div>
        </Observer>
      </div>
    )
  }
}

export default ReactScrollified
