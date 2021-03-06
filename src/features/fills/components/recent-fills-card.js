import PropTypes from 'prop-types';
import React from 'react';

import { URL } from '../../../constants';
import { buildUrl } from '../../../util';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import Link from '../../../components/link';
import Pill from '../../../components/pill';
import RecentFills from './recent-fills';

const RecentFillsCard = ({
  filter,
  limit,
  placeholder,
  showRelayer,
  ...otherProps
}) => (
  <Card
    errorMessage="An error occurred while loading recent fills"
    {...otherProps}
  >
    <CardHeader>
      <CardHeading>Recent Fills</CardHeading>
      <Pill as={Link} href={buildUrl(URL.FILLS, filter)}>
        View More
      </Pill>
    </CardHeader>
    <CardBody>
      <RecentFills
        filter={filter}
        limit={limit}
        placeholder={placeholder}
        showRelayer={showRelayer}
      />
    </CardBody>
  </Card>
);

RecentFillsCard.propTypes = {
  filter: PropTypes.shape({
    address: PropTypes.string,
    relayer: PropTypes.string,
    token: PropTypes.string,
  }),
  limit: PropTypes.number,
  placeholder: PropTypes.string,
  showRelayer: PropTypes.bool,
};

RecentFillsCard.defaultProps = {
  filter: undefined,
  limit: undefined,
  placeholder: undefined,
  showRelayer: undefined,
};

export default RecentFillsCard;
