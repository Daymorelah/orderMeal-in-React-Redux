import React from 'react';
import Footer from '../footer';
import UserDetails from './userDetails';
import MenuFilter from './menuFilter';
import Paginate from '../paginate';
import MealsOrdered from './mealsOrdered';

const HomePage = () => (
  <div>
    <header>
      <nav>
        <div id="logo">
          <a href="./loginPage.html">O-Meal</a>
        </div>
        <div id="large-width-nav">
          <a id="active" href="/profile">Profile</a>
          <a href="/menu">Order</a>
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
        <a href="/profile">Profile</a>
        <a href="/menu">Order</a>
        <a href="./aboutPage.html">About</a>
        <a className="logout" href="./">Logout</a>
      </div>
    </header>
    <main>
      <div id="profile-page-container">
        <UserDetails />
        <MenuFilter />
        <section id="loading">
          <div id="loader-container">
            <div id="loader" />
            <h3>loading...</h3>
          </div>
          <div id="no-internet">
            <p>
              Could not connect to the server.
              Please check your internet connection
            </p>
          </div>
        </section>
        <MealsOrdered />
        <Paginate />
      </div>
    </main>
    <Footer />
  </div>
);

export default HomePage;
