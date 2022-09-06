import Card from '../Home/Card';
import slideOne from '../../Images/poster.png'
import slideTwo from '../../Images/profile1.png'
import { useEffect } from 'react';


export default function Dashboard()
{ 
  let CurrentNew=[];
  
    
      fetch('https://newsapi.org/v2/everything?q=apple&from=2022-09-04&to=2022-09-04&sortBy=popularity&apiKey=9904b4a740bf476383cc75a848f17e0d')
     .then(x => x.json())
     .then(y => {
         for(let i=0;i<3;i++)
        {
          const {title,url,urlToImage,description, ...rest}=y.articles[i];
          CurrentNew[i]={title,url,urlToImage,description}
        }
        //console.log(CurrentNew)
     });
    
    
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

          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
  <div className="carousel-item active">
   { CurrentNew.map((newstext)=>{
    return (
      <div>
      <img src={newstext.urlToImage} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>{newstext.title}</h5>
        <p>{newstext.description}.</p>
      </div>
    </div>
    )
   })}
    
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
 {/*It does not slides */}


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