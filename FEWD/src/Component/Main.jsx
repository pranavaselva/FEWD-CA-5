import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";




function Main(){

  const [state, setState] = useState([])
  const [bookSearched, setBookSearched] = useState([])

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

  const handleChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    const filteredBook =state.filter(item =>item.title.toLowerCase().includes(inputValue));
    setBookSearched(filteredBook)
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
            {bookSearched.map(item => (
                <div key={item.id}>
                  <p>Searched Books</p>
                    <img className="searchimage" src={item.imageLinks.smallThumbnail} alt="" />
                    <h1 className="searchtitle">{item.title}</h1>
                </div>
            ) )}
        </div>
        <div>
            <Link to='/form' ><button className="register">Register</button></Link>
        </div>
        </div>
        <div className="container">
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