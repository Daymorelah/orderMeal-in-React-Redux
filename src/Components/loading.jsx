import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ isRequestSent }) => {
  const style = {};
  style.display = isRequestSent ? 'block' : 'none';
  return (
    <section id="loading">
      <div id="loader-container" style={style}>
        <div id="loader" />
        <h3>loading...</h3>
      </div>
    </section>
  );
};

Loading.propTypes = {
  isRequestSent: PropTypes.bool.isRequired
};

export default Loading;
