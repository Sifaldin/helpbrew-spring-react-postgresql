import React from 'react';
import { useHistory } from 'react-router-dom';
import slide1 from '../../Images/slide1.png';
import slide2 from '../../Images/slide2.jpg';
import slide3 from '../../Images/slide3.jpg';

function HomePage() {
  const history = useHistory();
  return (
    <div >
      <div >
        <div style={{ marginTop: '3%' }} >
          <h1 >Harvest</h1>

          <p >
            Harvest was started as an initiative to compact Food Waste.
          </p>
          <p >
            Food waste has a major impact on Climate Change and other Environmental issue.
          </p>
          <p >
            Food and Agricultural Organisation estimated in 2014 that Food waste cause
            global social, economical and environmental cost of 2.6 trillion dollars a
            year and is responsible for 8% of the global greenhouse gas emission.
            Moreover, Food waste that is not handled properly can lead to servious
            Environmental issues. This initiative is a small step forward to save our
            Environment by serving the needy people with daily meals.
          </p>
          <p >"Together We can Change!!!"</p>
          <button onClick={() => history.push('/posts')} >
            Start Claiming{' '}
          </button>
        </div>

        <div >
          <div
            id="carouselExampleInterval"
            data-ride="carousel">
            <div >
              <div  data-interval="400">
                <img
                  src={slide1}
                  style={{ height: '650px' }}
                  alt="..."
                />
              </div>
              <div  data-interval="2000">
                <img
                  src={slide2}
                  style={{ height: '650px' }}
                  alt="..."
                />
              </div>
              <div >
                <img
                  src={slide3}
                  style={{ height: '650px' }}
                  alt="..."
                />
              </div>
            </div>
            <a
              href="#carouselExampleInterval"
              role="button"
              data-slide="prev">
              <span  aria-hidden="true"></span>
              <span >Previous</span>
            </a>
            <a
              href="#carouselExampleInterval"
              role="button"
              data-slide="next">
              <span  aria-hidden="true"></span>
              <span >Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
