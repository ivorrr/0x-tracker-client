import React from 'react';

import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardFooter from '../../../components/card-footer';
import CardHeading from '../../../components/card-heading';
import CardHeader from '../../../components/card-header';
import Footnote from '../../../components/footnote';
import sharedPropTypes from '../../../prop-types';
import TopProtocols from './top-protocols';

const TopProtocolsCard = ({ period }) => (
  <Card css="height: 360px;">
    <CardHeader>
      <CardHeading>Protocol Share</CardHeading>
    </CardHeader>
    <CardBody css="padding: 2rem;">
      <TopProtocols period={period} />
    </CardBody>
    <CardFooter>
      <Footnote>Protocol share by fill volume</Footnote>
    </CardFooter>
  </Card>
);

TopProtocolsCard.propTypes = {
  period: sharedPropTypes.timePeriod,
};

TopProtocolsCard.defaultProps = {
  period: undefined,
};

export default TopProtocolsCard;
