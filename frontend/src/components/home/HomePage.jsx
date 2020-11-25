import React from 'react';
import { useHistory } from 'react-router-dom';
import slide1 from '../../Images/slide1.png';
import slide2 from '../../Images/slide2.jpg';
import slide3 from '../../Images/slide3.jpg';

function HomePage() {
  const history = useHistory();
  return (
    <div className="container">
      <div className="row home-data">
        <div style={{ marginTop: '3%' }} className="col-md-3">
          <h1 className="card-title">Harvest</h1>

          <p className="smallpara">
            Harvest was started as an initiative to compact Food Waste.
          </p>
          <p className="bigpara">
            Food waste has a major impact on Climate Change and other Environmental issue.
          </p>
          <p className="nextpara">
            Food and Agricultural Organisation estimated in 2014 that Food waste cause
            global social, economical and environmental cost of 2.6 trillion dollars a
            year and is responsible for 8% of the global greenhouse gas emission.
            Moreover, Food waste that is not handled properly can lead to servious
            Environmental issues. This initiative is a small step forward to save our
            Environment by serving the needy people with daily meals.
          </p>
          <p className="finalpara">"Together We can Change!!!"</p>
          <button onClick={() => history.push('/posts')} className="btn-home-claim">
            Start Claiming{' '}
          </button>
        </div>

        <div className="col-md-9">
          <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active" data-interval="400">
                <img
                  src={slide1}
                  style={{ height: '650px' }}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item" data-interval="2000">
                <img
                  src={slide2}
                  style={{ height: '650px' }}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src={slide3}
                  style={{ height: '650px' }}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleInterval"
              role="button"
              data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleInterval"
              role="button"
              data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
