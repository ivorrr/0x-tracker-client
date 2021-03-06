import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import {
  useMetadata,
  useNavigator,
  usePaginator,
  useSearchParam,
} from '../../../hooks';
import { RelayersIcon } from '../../../components/icons';
import { getPeriodDescriptor } from '../../../util';
import ActiveRelayerMetrics from './active-relayer-metrics';
import Card from '../../../components/card';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import CardBody from '../../../components/card-body';
import PageLayout from '../../../components/page-layout';
import Relayers from './relayers';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import HelpWidget from '../../../components/help-widget';

const RelayersPage = () => {
  useMetadata({ title: '0x Protocol Relayer Metrics & Charts' });

  const { navigateTo } = useNavigator();
  const { page, setPage } = usePaginator();
  const statsPeriod = useSearchParam('statsPeriod', TIME_PERIOD.MONTH);

  return (
    <PageLayout
      actions={
        <ResponsiveTimePeriodFilter
          name="statsPeriod"
          onChange={(newPeriod) => {
            navigateTo(URL.RELAYERS, { statsPeriod: newPeriod });
          }}
          value={statsPeriod}
        />
      }
      icon={<RelayersIcon size={32} />}
      subTitle={getPeriodDescriptor(statsPeriod)}
      title="Active Relayers"
    >
      <CardGrid>
        <CardGridRow minHeight="330px">
          <CardGridCol>
            <Card errorMessage="An error occurred while loading active relayers">
              <CardHeader>
                <CardHeading css="align-items: center; display: flex;">
                  Trend{' '}
                  <HelpWidget css="margin-left: 8px;">
                    Number of active relayers over time in the selected period.
                  </HelpWidget>
                </CardHeading>
              </CardHeader>
              <CardBody padded>
                <ActiveRelayerMetrics period={statsPeriod} />
              </CardBody>
            </Card>
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol>
            <Card errorMessage="An error occurred while loading relayers">
              <Relayers
                onPageChange={setPage}
                page={page}
                statsPeriod={statsPeriod}
              />
            </Card>
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default RelayersPage;
