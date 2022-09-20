import Card from '../Home/Card';
import axios, * as others from 'axios';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect } from 'react';
import data from './mock_data.json';//list of career 



export default function Dashboard()
{ 
  const [newsData, setNewsData]=useState([]);//collect news json data
  const [value, setValue]=useState(false);
  const [list, setList]=useState(false);//onfucus on search bar will show all the list of career
  const [query, setQuery]=useState("");//store the value of input
  
  //useEffect is used to call Api as soon as the page load
     useEffect(()=>
    {
      axios.get('https://newsapi.org/v2/top-headlines?q=career&from=2022-09-19&to=2022-09-19&sortBy=popularity&apiKey=9904b4a740bf476383cc75a848f17e0d')
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
    <input type="text" className="form-control" onChange={(event)=>{setQuery(event.target.value)}} onClick={()=>{setList(true)}} onMouseLeave={()=>{setList(false)}} id="floatingInputGroup1" placeholder="career path"/>
    <label htmlFor="floatingInputGroup1">Career Path</label>
  </div>
          </div>
          {list?<div className='mx-auto w-50'>
           <ul className='list-group '>
              {data.filter((post)=>{//use to filter out the career
                    if(query==='')
                    {
                      return post;
                    }
                    else if(post.career.toLowerCase().includes(query.toLowerCase()))
                    {
                      return post;
                    }
              }).map((display)=>{
                return <div key={display.id}>
                  <li className="list-group-item">{display.career}</li>
                </div>
              })}
           </ul>
          </div>:null}





          {/*Latest News */}

        {  value?<Carousel  centerMode={true} showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
                <div>
                    <img  height={400} src={newsData[0].urlToImage}/>
                   
                    <p className="legend">{newsData[0].description}</p>
                </div>
                <div>
                    <img width={900} height={400} src={newsData[1].urlToImage}/>
                   
                    <p className="legend">{newsData[1].description}</p>
                </div>
                <div>
                    <img  width={900} height={400} src={newsData[2].urlToImage}/>
                    
                    <p className="legend">{newsData[2].description}</p>
                </div>
                
            </Carousel>:null}


 {/*Career Path */}
            <div className='container'>
             

            </div>
            
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