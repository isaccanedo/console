import * as React from 'react';
import { OverviewDetailItem } from '@openshift-console/plugin-shared/src';
import { Card, CardBody, CardHeader, CardTitle } from '@patternfly/react-core';
import { useTranslation } from 'react-i18next';
import {
  SourceMissingStatus,
  SubscriptionStatus,
} from '@console/operator-lifecycle-manager/src/components/subscription';
import DetailsBody from '@console/shared/src/components/dashboard/details-card/DetailsBody';
import { useKubevirtCsvDetails } from '../../hooks/use-kubevirt-csv-details';

export const VirtOverviewDetailsCard: React.FC = () => {
  const { t } = useTranslation();
  const kvCsvDetails = useKubevirtCsvDetails();
  const {
    name,
    provider,
    version,
    updateChannel,
    kubevirtSub,
    catalogSourceMissing,
    loaded,
    loadError,
  } = kvCsvDetails;
  const isLoading = !loaded && !loadError && !kubevirtSub;

  return (
    <Card data-test-id="kubevirt-overview-dashboard--details-card">
      <CardHeader>
        <CardTitle>{t('kubevirt-plugin~Details')}</CardTitle>
      </CardHeader>
      <CardBody>
        <DetailsBody>
          <OverviewDetailItem isLoading={isLoading} title={t('kubevirt-plugin~Service name')}>
            {name}
          </OverviewDetailItem>
          <OverviewDetailItem isLoading={isLoading} title={t('kubevirt-plugin~Provider')}>
            {provider}
          </OverviewDetailItem>
          <OverviewDetailItem
            isLoading={isLoading}
            title={t('kubevirt-plugin~OpenShift Virtualization version')}
          >
            {version}
            <div>
              {catalogSourceMissing ? (
                <SourceMissingStatus />
              ) : (
                <SubscriptionStatus subscription={kubevirtSub} />
              )}
            </div>
          </OverviewDetailItem>
          <OverviewDetailItem isLoading={isLoading} title={t('kubevirt-plugin~Update Channel')}>
            {updateChannel}
          </OverviewDetailItem>
        </DetailsBody>
      </CardBody>
    </Card>
  );
};
