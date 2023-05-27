import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";







export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor(props) {
    super(props)
    console.log("Hello I am Consurtor from news components")
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.props.category}-NewsMonkey`
  }
  // async updatenews(){
  //   const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=963744d8ac8b4b96b0fd8dabfca6256a&
  //   page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true})
  //   let data= await fetch(url);
  //   let parseData= await data.json()
  //   console.log(parseData);
  //   this.setState({articles:parseData.articles,totalResults:parseData.totalResults,loading:false})

  // }

  async componentDidMount() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=963744d8ac8b4b96b0fd8dabfca6256a&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
    this.props.setProgress(100);

  }
  handlePrevClick = async () => {
    
    console.log("Previous Click");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=963744d8ac8b4b96b0fd8dabfca6256a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);

    this.setState({
      page: this.state.page + 1,
      articles: parseData.articles,
      loading: false
    })
    // this.setState({page:this.state.page - 1 })
    // this.updatenews();
  }
  handleNextClick = async () => {
    console.log("Next Click");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=963744d8ac8b4b96b0fd8dabfca6256a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let data = await fetch(url);
      let parseData = await data.json()
      console.log(parseData);

      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false
      })
    }
    // this.setState({page:this.state.page + 1 })
    // this.updatenews();
  }

  fetchMoreData = async () => {

    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=963744d8ac8b4b96b0fd8dabfca6256a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false
    })

  };
  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{marginTop:'60px'}}> Top Headlines on {this.props.category} </h1>

        {/* {this.state.loading && <Spinner/>} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url} >
                  <NewsItem title={element.title ? element.title.slice(0, 18) : ""} description={element.description ? element.description.slice(0, 88) : ""} ImageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}

            </div>

          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} class="btn btn-primary" onClick={this.handlePrevClick}>&laquo; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick}>Next &raquo;</button>
        </div> */}
      </div>

    )
  }
}

export default News
