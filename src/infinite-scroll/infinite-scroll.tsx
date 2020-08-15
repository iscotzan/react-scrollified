import React, { Component, ReactNode } from 'react'

interface InfiniteScrollProps {
  loader: ReactNode
  hasMore: boolean
  offset?: number
  loadMore: (page: number) => void;
}


interface InfiniteScrollState {
  page: number
  prevY: number
  childrenCount: number
  loadCount: number
}

class ReactScrolly extends Component<InfiniteScrollProps, InfiniteScrollState> {
  private loadingRef: HTMLDivElement
  private observer: IntersectionObserver
  private loading: boolean = false

  constructor(props: InfiniteScrollProps) {
    super(props)
    this.state = {
      page: this.props.offset || 0,
      prevY: 0,
      childrenCount: 0,
      loadCount: 0
    }
  }

  componentDidMount() {
    // Options
    const options = {
      root: null, // Page as root
      rootMargin: '0px',
      threshold: 0
    }
    this.observer = new IntersectionObserver(this.handleObserver.bind(this), options)
    this.observer.observe(this.loadingRef)
  }

  componentDidUpdate(prevProps: Readonly<any>) {
    if (React.Children.count(this.props.children) !== React.Children.count(prevProps.children)) {
      this.loading = false
    }
  }

  componentWillUnmount() {
    if (this.loadingRef) {
      this.observer.unobserve(this.loadingRef)
    }
  }

  handleObserver(entities: any) {
    const y = entities[0].boundingClientRect.y
    if ((this.state.prevY > y || this.state.loadCount === 1) && this.props.hasMore && !this.loading) {
      this.loading = true
      this.setState({ loadCount: this.state.loadCount + 1 }, () => {
        this.setState({ childrenCount: React.Children.count(this.props.children) }, () => {
          const curPage = this.state.childrenCount
          this.props.loadMore(curPage)
          this.setState({ page: curPage })
        })
      })
    }
    if (y > 0) {
      this.setState({ prevY: y })
    }

  }

  render() {
    const loadingTextCSS = { display: this.loading ? 'block' : 'none' }
    return (
      <div className="container" style={{ minHeight: '1px' }}>
        {this.props.children}
        <div
          ref={loadingRef => (loadingRef !== null ? this.loadingRef = loadingRef : null)}
        >
          <div style={loadingTextCSS}>{this.props.loader}</div>
        </div>
      </div>
    )
  }
}

export default ReactScrolly
