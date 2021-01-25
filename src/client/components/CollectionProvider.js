import React from 'react';
import PropTypes from 'prop-types';

const CollectionContext = React.createContext();

// eslint-disable-next-line react/prefer-stateless-function
class CollectionProvider extends React.Component {
  static propTypes = {
    data: PropTypes.shape({}).isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const { children, data } = this.props;
    return (
      <CollectionContext.Provider value={data}>
        {children}
      </CollectionContext.Provider>
    );
  }
}

export { CollectionContext, CollectionProvider };