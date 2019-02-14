import React from 'react';

const UserDetails = () => (
  <section id="user-details">
    <div id="user-container">
      <div id="user-identify">
        <img src="./images/user.jpg" alt="user_pic" />
        <div id="user-identify-text">
          <h2>loading</h2>
          <p />
        </div>
      </div>
      <div id="user-actions">
        <ul id="list-user-actions">
          <li>
            Meals ordered
            <span
              id="meal-number"
            >
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
);

export default UserDetails;
