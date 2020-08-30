// eslint-disable-next-line no-unused-vars
import React, { Component, ReactNode } from 'react'

interface ReactScrollifiedProps {
  loader: ReactNode
  hasMore: boolean
  offset?: number
  loadMore: (page: number) => void
  container?: ReactNode
}

interface ReactScrollifiedState {
  page: number
  prevY: number
  childrenCount: number
  loadCount: number
}

class ReactScrollifiedTest extends Component<
  ReactScrollifiedProps,
  ReactScrollifiedState
> {
  private loadingRef: React.RefObject<HTMLDivElement>
  private observer: IntersectionObserver
  private loading: boolean = false
  private containerRef: React.RefObject<HTMLDivElement>
  private listRef: React.RefObject<HTMLDivElement>

  constructor(props: ReactScrollifiedProps) {
    super(props)
    this.state = {
      page: this.props.offset || 0,
      prevY: 0,
      childrenCount: 0,
      loadCount: 0
    }
    this.containerRef = React.createRef()
    this.listRef = React.createRef()
    this.loadingRef = React.createRef()
  }

  componentDidMount() {
    // Options
    const options = {
      root: this.containerRef.current, // Page as root
      rootMargin: '0px',
      threshold: 0
    }
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    )
    if (this.loadingRef.current) {
      console.log('observing loadingRef')
      this.observer.observe(this.loadingRef.current)
    }
  }

  componentDidUpdate(prevProps: Readonly<any>) {
    if (
      React.Children.count(this.props.children) !==
      React.Children.count(prevProps.children)
    ) {
      this.loading = false
    }
    if (
      // this.props.hasMore &&
      // !this.loading &&
      this.containerRef.current &&
      this.props.children &&
      this.listRef.current
    ) {
      console.log(
        'children',
        this.props.children,
        this.containerRef.current?.getBoundingClientRect(),
        this.containerRef,
        this.listRef.current?.getBoundingClientRect(),
        this.listRef,
        window.innerHeight
      )
      // const listHeight = this.listRef.current?.getBoundingClientRect()
      // // const containerHeight = this.containerRef.current?.getBoundingClientRect()
      // const containerHeight = this.props.container
      //   ? this.props.container // should be the container height
      //   : window.innerHeight
      // if (
      //   listHeight.height <= containerHeight &&
      //   this.props.hasMore &&
      //   this.loadingRef.current &&
      //   !this.loading
      // ) {
      //   console.log(
      //     'list height <= container height ',
      //     listHeight.height,
      //     containerHeight
      //   )
      //   this.loading = true
      //   this.doTheLoading()
      //   // this.doTheLoading()
      // }
    }
  }

  componentWillUnmount() {
    if (this.loadingRef.current) {
      this.observer.unobserve(this.loadingRef.current)
    }
  }

  doTheLoading = () => {
    this.loading = true
    this.setState({ loadCount: this.state.loadCount + 1 }, () => {
      this.setState(
        { childrenCount: React.Children.count(this.props.children) },
        () => {
          const curPage = this.state.childrenCount
          this.props.loadMore(curPage)
          this.setState({ page: curPage })
        }
      )
    })
  }

  handleObserver(entities: any) {
    const rect = entities[0].boundingClientRect
    const y = rect.y
    // const top = rect.top
    // const bottom = rect.bottom
    console.log(
      'should fires?',
      rect,
      this.loadingRef.current?.getBoundingClientRect(),
      this.containerRef,
      window.innerHeight
    )
    // if has more && !loading && items height is lower than container height - ensure scrollable

    // if (this.containerRef && this.containerRef.current) {
    //   if (this.containerRef.current.clientHeight < window.innerHeight) {
    //     doTheLoading()
    //   }
    // }
    if (
      (this.state.prevY > y || this.state.loadCount === 1) &&
      this.props.hasMore &&
      !this.loading
    ) {
      this.doTheLoading()
    }
    if (y > 0) {
      this.setState({ prevY: y })
    }
  }

  render() {
    const loadingTextCSS = {
      display: this.loading ? 'block' : 'none',
      minHeight: '1rem'
      // marginBottom: window.innerHeight
    }
    return (
      <div className='rsc-container' ref={this.containerRef}>
        <div className='rsc-container__list' ref={this.listRef}>
          {this.props.children}
          {/* // ref={(loadingRef) => */}
          {/* //   loadingRef !== null ? (this.loadingRef = loadingRef) : null */}
          {/* // } */}
          <div
            ref={this.loadingRef}
            style={loadingTextCSS}
            className='rsc-loader-wrapper'
          >
            {this.props.loader}
          </div>
        </div>
      </div>
    )
  }
}

export default ReactScrollifiedTest
