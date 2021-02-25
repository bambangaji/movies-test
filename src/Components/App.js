import React, { Component } from 'react';
import '../sass/main.scss';
import axios from 'axios';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import {store} from './store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as actionName from './redux/action'

class App extends Component {
  useSelector
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isOpen: false,
      customStyles: {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-10%',
          transform: 'translate(-50%, -50%)',
          width: "500px"
        }
      },
      detailMovie: [],
      openImage: false,
      limit: 8,
      loading:false,
      apiKey:"faf7e5bb",
      search:"batman",
      page:2
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.callApi(this.state.search);
  }
  handleScroll(event){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.scroll()
     }
    }
    scroll=()=>{
      this.setState({
        limit: this.state.limit + 8
      })
      this.callApi(this.state.search)
    }
  callApi(search) {
    // const dispatch = useDispatch()
    axios('http://www.omdbapi.com/?apikey='+this.state.apiKey+'&s='+search+'&page='+this.state.page)
    .then((data) => {
      console.log(data)
      if(data.data.Response === "False"){
        this.setState({ movies: [...this.state.movies] })
        
      } else{
        this.setState({ movies: data.data.Search })
        // useDispatch(actionName.getData(data.data.Search))
      }
    })
  }
  openModalDetail = (e) => {
    this.setState({
      isOpen: true,
      detailMovie: e
    })
  }
  closeModalDetail = () => {
    this.setState({
      isOpen: false,
      openImage:false
    })
  }
  imgShow = (e) => {
    this.setState({
      openImage: true,
      detailMovie: e
    })
  }

  loadMoreItems = () => {
    this.setState({ loadingState: true });
    this.callApi();
  };

  searchMovie(e){
    var name= e;
   this.setState({
     search:name
   })
    if(e.length>2){
      this.callApi(name)
    }
    // this.callApi(name)
  }
  render() {
    return (
      <Provider store={store}>
        <div>
        <div className="col mb-3">
          <div className="col-md-12 text-md-center">
            <h2 className="text-poppins font-weight-bold">Movies Test</h2>
            <div>
            <input class="" onChange={(e)=> {this.searchMovie(e.target.value)}} placeholder="Search by name">
            </input>
          </div>
          </div>
        </div>
        <div className="row">
         
          {this.state.movies.slice(0,this.state.limit).map((movie,index) => ( 
        //  <div >
        <a onClick={() => { this.openModalDetail(movie) }} className="col-md-3">
           
              <div className="card card-outline translate-up mb-3">
                <div className="card-body text-center">
                  <a onClick={() => { this.imgShow(movie) }}>
                    <img width="150px" src={`${movie.Poster}.`}
                      title={`${movie.Title}`} className="mb-3"></img>
                  </a>
                  <h5 className="font-weight-bold text-primary">{movie.Title}</h5>
                  {/* <button className="btn btn-primary"
                    onClick={() => { this.openModalDetail(movie) }}> Detail </button> */}
                </div>
              </div>
            {/* </div>  */}
            </a>
      //  </div>
          ))}
          {
            this.state.loading ? 
            <p className="text-center">Loading items...</p>
            :<div></div>
          }
        </div>
        {this.state.isOpen ?
          <Modal
            style={this.state.customStyles}
            isOpen={this.state.isOpen}
            contentLabel="Example Modal">
            <div className="text-center">
              <img src={`${this.state.detailMovie.Poster}.`} />
              <p style={{fontWeight:"600"}}>
                {this.state.detailMovie.Title}
              </p>
              <div>
                <p>Year : 
                  {this.state.detailMovie.Year}
                </p>
              </div>
              <div>
                <button className="btn btn-primary" onClick={this.closeModalDetail}>
                  Close
              </button>
              </div>
            </div>
          </Modal>
          : <div>
          </div>
        }
        {this.state.openImage ?
          <Modal
            style={this.state.customStyles}
            isOpen={this.state.openImage}
            contentLabel="Example Modal">
            <div className="text-center">
              <img src={`${this.state.detailMovie.Poster}.`} />
            </div>
            <div className="text-center">
              <button className="btn btn-primary" onClick={this.closeModalDetail}>
                Close
              </button>
            </div>
          </Modal>
          : <div>
          </div>
        }

      </div>
        </Provider>
    
    );
  }
}

export default App;
