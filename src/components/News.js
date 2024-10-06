import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spin from "./Spin";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);
  // const [apiKey,setApiKey]=useState('6560580cf1ea42e69c762a538ccadc2d')

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    // props.setPogress(10);
    // api key=6560580cf1ea42e69c762a538ccadc2d
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6560580cf1ea42e69c762a538ccadc2d&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    // props.setPogress(30);
    let parsedData = await data.json();
    // props.setPogress(70);
    setArticles(parsedData.articles);
    setTotalResult(parsedData.totalResult);
    setLoading(false);

    // props.setPogress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}-NewsApp`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  //  const handlePrevClick = async () => {
  //     setPage(page-1);
  //     updateNews();
  //   };

  //  const handleNextClick = async () => {
  //     setPage(page+1);
  //     updateNews();
  //   };

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=6560580cf1ea42e69c762a538ccadc2d&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    // setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResult(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ marging: "35px 0px", marginTop: "90px" }}
      >
        News-Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spin />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResult}
        loader={<Spin />}
      >
        <div className="container">
          <div className="row">
            {/* loading && */}
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "sports",
};

News.PropsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
