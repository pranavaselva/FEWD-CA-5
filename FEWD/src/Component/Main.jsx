import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";




function Main(){

  const [state, setState] = useState([])
  const [bookSearched, setBookSearched] = useState([])

  // fetching the API
  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books",{ headers: { 'Authorization': 'whatever-you-want' }})

    .then(res  => {
      const books = res.data.books
      setState(books)
      console.log(books)
      })

    .catch( error => {
      if(error.res.status == 404){
        console.log("Status Code: 404")
        console.log("Website not found")
      }
    })
  },[])

  // for searching books
  const handleChange = (event) => {
    // taking the user input and storing it
    const inputValue = event.target.value.toLowerCase();
    // using filter function seperating the books based on the user input
    const filteredBook =state.filter(item =>item.title.toLowerCase().includes(inputValue));
    setBookSearched(filteredBook)
    // updating it to booksearched 
  }



  return(
    <div>
        <div className="navbar">
          <div>
            <div className="kalvi-logo">
            <div>
            <img src="https://kalvium.community/images/sidebar-3d-logo.svg" alt="" />
            </div>
            <div>
            <h3 className="logo">Kalvium Books</h3>
            </div>
        </div>
        </div>
        
        <div>
            <input
            className="search" 
            type="text" 
            placeholder="          Search Books"
            onChange={handleChange} 
            
            />
            {/* mapping out and showing the output for the searched book */}
            {bookSearched.map(item => (
                <div key={item.id}>
                  <p>Searched Books</p>
                    <img className="searchimage" src={item.imageLinks.smallThumbnail} alt="" />
                    <h1 className="searchtitle">{item.title}</h1>
                </div>
            ) )}
        </div>
        <div>
          {/* linked the register button to go to form page */}
            <Link to='/form' ><button className="register">Register</button></Link>
        </div>
        </div>
        <div className="container">
          {/* showing the data from the API using map function */}
        {
            state.map(function(element){
            return (
             <div key={element.id} >
                <div className="book">
                    <img className="image" src={element.imageLinks.smallThumbnail} alt={element.title} />
                    <h1 className="title">{element.title}</h1>
                    <p>Free</p>
               </div>
              </div>
              )  
            })
        }
        </div>
        
    </div>
  )

}

export default Main;