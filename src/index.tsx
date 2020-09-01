import React from 'react'
import 'intersection-observer' // optional polyfill
import Observer from '@researchgate/react-intersection-observer'

interface ReactScrollifiedProps {
  loader: React.ReactNode
  hasMore: boolean
  offset?: number
  scrolledDiv?: string
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

class ReactScrollified extends React.Component<ReactScrollifiedProps, ReactScrollifiedState> {
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
    // console.log(event.isIntersecting, 'current page -> ', this.state.page)
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

  //    height: 100%;
  //     max-height: 100%;
  //     overflow-y: scroll;
  render() {
    let options: { onChange: any, root?: any } = { onChange: this.handleIntersection.bind(this) }
    this.props.scrolledDiv ? options.root = '#rsc-container' : null
    // this.props.scrolledDiv ? options['root'] = this.props.scrolledDiv.charAt(0) === '#' ? this.props.scrolledDiv : '#' + this.props.scrolledDiv : null
    // console.log('scrolled div?', this.props.scrolledDiv)
    // console.log('options?', options)
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
              overflowY: this.props.scrolledDiv ? 'scroll' : 'auto',
              height: containerHeight
            }
        }
      >
        {this.props.children}
        <Observer {...options}>
          {this.props.hasMore ?
            <div className='rsc-loader-wrapper'>{this.props.loader}</div>
            : null
          }
        </Observer>
      </div>
    )
  }
}

export default ReactScrollified
