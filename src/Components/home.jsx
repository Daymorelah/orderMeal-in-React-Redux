import React from 'react';
import Footer from './footer';
import Paginate from './paginate';
import NavigationBar from './navigationBar';

const HomePage = ({ registeredUser, }) => (
  <>
    <header>
      <NavigationBar
        isAuthenticated={registeredUser.isAuthenticated}
        showOnAuth="Logout"
      />
    </header>
    <main>
      <div id="page-container">
        <section id="user-details">
          <div id="user-container">
            <div id="user-identify">
              <img src="./images/user.jpg" alt="user_pic" />
              <div id="user-identify-text">
                <h2>Username here</h2>
                <p />
              </div>
            </div>
            <div id="user-actions">
              <ul id="list-user-actions">
                <li>
                  Meals ordered
                  <span id="meal-number">
                    0
                  </span>
                </li>
                <li>view meals ordered</li>
                <li>edit profile</li>
                <li>logout</li>
              </ul>
            </div>
          </div>
        </section>
        <section id="filter-container">
          <div id="filter-text">
            <h2>meals ordered</h2>
          </div>
          <div id="filter">
            <div id="filter-input">
              <input type="text" id="search-by" placeholder="Enter search here" />
              <input type="date" id="filter-by-date" placeholder="Enter date here" />
            </div>
            <div id="filter-by">
              <select id="filter-by-detail">
                <option value="Meal">Meal</option>
                <option value="Meal">Prize</option>
                <option value="Meal">Destination</option>
              </select>
              <span id="search">
                <i className="fas fa-search fa-2x" />
              </span>
            </div>
          </div>
        </section>
        <section id="loading">
          <div id="loader-container">
            <div id="loader" />
            <h3>loading...</h3>
          </div>
          <div id="no-internet">
            <p>Could not connect to the server. Please check your internet connection</p>
          </div>
        </section>
        <section id="meals-ordered-container">
          <div id="meals-ordered" />
        </section>
        <Paginate pagination={{}} />
      </div>
    </main>
    <Footer />
  </>
);

export default HomePage;

/* <nav>
  <div id="logo">
    <a href="./loginPage.html">O-Meal</a>
  </div>
  <div id="large-width-nav">
    <a id="active" href="./userProfile.html">Profile</a>
    <a href="./availableOrders.html">Order</a>
    <a href="./aboutPage.html">About</a>
  </div>
  <div id="nav-menu">
    <a className="logout" href="./">Logout</a>
    <span id="hamburger">
      <i className="fas fa-bars fa-2x" />
    </span>
  </div>
</nav>
<div id="small-width-nav">
  <a href="./userProfile.html">Profile</a>
  <a href="./availableOrders.html">Order</a>
  <a href="./aboutPage.html">About</a>
  <a className="logout" href="./">Logout</a>
</div> */
