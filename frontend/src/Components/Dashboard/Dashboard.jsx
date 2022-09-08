import Card from '../Home/Card';
import axios, * as others from 'axios';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect } from 'react';



export default function Dashboard()
{ 
  const [newsData, setNewsData]=useState([]);
  const [value, setValue]=useState(false);
  
  
     useEffect(()=>
    {
      axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=9904b4a740bf476383cc75a848f17e0d')
      .then((response)=>
      {
        setNewsData((pre)=>
        {
          return [...pre , response.data.articles[0], response.data.articles[1], response.data.articles[2]]
        })
        console.log(response.data.articles);
        setValue(true);
      });
      
    },[])
   // console.log(newsData);
  
  
     
   
    return (
        <div className="bg-primary">
          {/*search bar*/}
          
          <div className="input-group mb-3 column align-row-center mx-auto w-50" >
  <span className="input-group-text">Search</span>
  <div className="form-floating">
    <input type="text" className="form-control" id="floatingInputGroup1" placeholder="career path"/>
    <label htmlFor="floatingInputGroup1">Career Path</label>
  </div>
          </div>





          {/*Latest News */}

        {  value?<Carousel infiniteLoop useKeyboardArrows autoPlay>
                <div>
                    <img src={newsData[0].urlToImage}/>
                    <h4>{newsData[0].title}</h4>
                    <p className="legend">{newsData[0].description}</p>
                </div>
                <div>
                    <img src={newsData[1].urlToImage}/>
                    <h4>{newsData[1].title}</h4>
                    <p className="legend">{newsData[1].description}</p>
                </div>
                <div>
                    <img src={newsData[2].urlToImage}/>
                    <h4>{newsData[2].title}</h4>
                    <p className="legend">{newsData[2].description}</p>
                </div>
                
            </Carousel>:null}


 {/*Career Path */}


             <div className='w-full d-flex mb-5 flex-column flex-md-row justify-content-center'>
                {/* Renders Card Component with head & content. */}
                <Card head='Know Yourself' content='Explore your aptitudes and interests through our test.' link='/psychometric-test' />
                {/* Renders Card Component with head & content. */}
                <Card head='Inform Yourself' content='The right information at the right time will get you to the right opportunity.' link='/login' />
                {/* Renders Card Component with head & content. */}
                <Card head='Plan for Yourself' content='Expert guidance helps you make the most of your opportunities and succeed. Talk to our counsellors.' link='/login'/>
            </div>
        </div>
    )
}