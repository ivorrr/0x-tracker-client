import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import { SquareIcon } from '../../../components/icons';

const RelayerImage = ({ className, height, imageUrl, width }) =>
  _.isString(imageUrl) ? (
    <img
      className={className}
      css={`
        border-radius: 0.25rem;
        height: ${height}px;
        width: ${width}px;
      `}
      src={imageUrl}
    />
  ) : (
    <SquareIcon
      className={className}
      color={COLORS.NEUTRAL.MYSTIC_400}
      height={height}
      width={width}
    />
  );

RelayerImage.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  imageUrl: PropTypes.string,
  width: PropTypes.number,
};

RelayerImage.defaultProps = {
  className: undefined,
  height: 40,
  imageUrl: undefined,
  width: 40,
};

export default RelayerImage;
