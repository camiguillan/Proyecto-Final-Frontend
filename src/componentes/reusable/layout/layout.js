import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div id="wrapper">
        {children}
      </div>
    </div>
  );
}

Layout.propTypes = ({
  children: PropTypes.element.isRequired,
});
