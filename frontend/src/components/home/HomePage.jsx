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
          <h1 className="card-title">HelpBrew</h1>

          <p className="smallpara">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, magna aliqua. ip ex ea commodo consequat. Duis aute </p>
          <p className="bigpara">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, magna aliqua. ip ex ea commodo consequat. Duis aute          </p>
          <p className="nextpara">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, magna aliqua. ip ex ea commodo consequat. Duis aute
          </p>
          <p className="finalpara">"Together We can Change the world!!!"</p>
          <button onClick={() => history.push('/posts')} className="btn-home-claim">
            Check out the latest offers{' '}
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
                  src="https://ak.picdn.net/shutterstock/videos/1030584008/thumb/6.jpg"
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
