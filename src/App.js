import React, {Component} from "react"
import './App.css';

class Countries extends Component {
  constructor(){
    super();
    this.state={
       
    }
  }
  render() {
      return (
        <div>
          {this.props.loaded && <h3>Loading...</h3>}
        
        <ul>
          {this.props.countries.map((country) => (
            <li key={country.id} className="county">{country.name}</li>
          )
          )
            }

        </ul>
        </div>
      )
  }
}

  class App extends Component {
    constructor(){
      super();
      this.state={
        countries : [],
        filteredCountries : [],
        searchTerm: "",
        loaded: true
      }
    }


    searchOnChange = (e) => {
       this.setState({searchTerm:e.target.value})
    }
    componentDidMount(){
      setTimeout(()=>{
     this.fetchAPI()
     this.setState({loaded:!this.state.loaded})
      },2000)
    }

   
    componentDidUpdate(prevProps,prevState){
     if(prevState.searchTerm !== this.state.searchTerm ){
        this.setState({
           filteredCountries : this.state.countries.filter((item) => 
            item.name.includes(this.state.searchTerm)
           )
        })
     }
    }

    fetchAPI = () =>{
      const url = "https://jsonplaceholder.typicode.com/users";
      fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          countries: data,
          filteredCountries: data
        })
      })
    }

    render() {
        return (
          <div className="App"> 
          <div onChange={this.searchOnChange} className="wrapper"> 
          <input type="search" />
          </div>
       
           <div className="main">
             <Countries
              countries={this.state.filteredCountries} 
              loaded = {this.state.loaded}
              />
          </div>
          </div>

          
        )
    }

}

export default App;
