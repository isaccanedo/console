import * as React from 'react';
import { useActivePerspective } from '@console/dynamic-plugin-sdk';
import { DetailsPage } from '@console/internal/components/factory';
import { navFactory } from '@console/internal/components/utils';
import { referenceForModel } from '@console/internal/module/k8s';
import {
  ActionMenu,
  ActionMenuVariant,
  ActionServiceProvider,
  useTabbedTableBreadcrumbsFor,
} from '@console/shared';
import { serverlessTab } from '../../../utils/serverless-tab-utils';
import TriggerDetails from './TriggerDetails';

const TriggerDetailsPage: React.FC<React.ComponentProps<typeof DetailsPage>> = (props) => {
  const { kindObj, match } = props;
  const isAdminPerspective = useActivePerspective()[0] === 'admin';
  const customActionMenu = (kindObjData, obj) => {
    const resourceKind = referenceForModel(kindObjData);
    const context = { [resourceKind]: obj };
    return (
      <ActionServiceProvider context={context}>
        {({ actions, options, loaded }) =>
          loaded && (
            <ActionMenu actions={actions} options={options} variant={ActionMenuVariant.DROPDOWN} />
          )
        }
      </ActionServiceProvider>
    );
  };
  const breadcrumbs = useTabbedTableBreadcrumbsFor(
    kindObj,
    match,
    'eventing',
    serverlessTab(kindObj.kind),
    undefined,
    isAdminPerspective,
  );
  const pages = [navFactory.details(TriggerDetails), navFactory.editYaml()];

  return (
    <DetailsPage
      {...props}
      breadcrumbsFor={() => breadcrumbs}
      pages={pages}
      customActionMenu={customActionMenu}
    />
  );
};

export default TriggerDetailsPage;