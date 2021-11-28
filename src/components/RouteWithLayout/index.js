import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../../service/Auth';

const RouteWithLayout = props => {
  const {component: Component, ...rest } = props;

  const renderRoute = (rest) => {
    if (rest.private) {
      return (
        <Route
          {...rest}
          render={matchProps =>
            isAuthenticated() ? 
              (<><Component {...matchProps} /></>) :
              (<Redirect to={{ path: "/clientes", state: { from: matchProps.location } }} />)
          }
        />
      )
    }
    return (
      <Route
        {...rest}
        render={matchProps => (
          <>
            <Component {...matchProps} />
          </>
        )}
      />)
  }
  
  return (
    renderRoute(rest)
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string,
  private: PropTypes.bool
};

export default RouteWithLayout;