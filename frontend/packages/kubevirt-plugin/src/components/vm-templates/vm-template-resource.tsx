import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { LabelList, ResourceSummary, useAccessReview2 } from '@console/internal/components/utils';
import { TemplateKind } from '@console/internal/module/k8s';
import { VMWrapper } from '../../k8s/wrapper/vm/vm-wrapper';
import { HyperConvergedModel } from '../../models';
import { getDescription } from '../../selectors/selectors';
import { getTemplateOperatingSystems } from '../../selectors/vm-template/advanced';
import {
  getTemplateParentProvider,
  getTemplateProvider,
  getTemplateSupport,
  isCommonTemplate,
} from '../../selectors/vm-template/basic';
import { getVMTemplateNamespacedName } from '../../selectors/vm-template/selectors';
import { getTransformedDevices } from '../../selectors/vm/devices';
import { getWorkloadProfile, isDedicatedCPUPlacement } from '../../selectors/vm/selectors';
import { asVM } from '../../selectors/vm/vm';
import { getVMLikeModel } from '../../selectors/vm/vmlike';
import { TemplateSourceStatus } from '../../statuses/template/types';
import { getBasicID, prefixedID } from '../../utils';
import { BootOrderSummary } from '../boot-order';
import { vmFlavorModal } from '../modals';
import { BootOrderModal } from '../modals/boot-order-modal';
import { descriptionModal } from '../modals/description-modal';
import { gpuDevicesModal } from '../modals/hardware-devices/GPUDeviceModal';
import { hostDevicesModal } from '../modals/hardware-devices/HostDevicesModal';
import { permissionsErrorModal } from '../modals/permissions-error-modal/permissions-error-modal';
import affinityModal from '../modals/scheduling-modals/affinity-modal/connected-affinity-modal';
import { getRowsDataFromAffinity } from '../modals/scheduling-modals/affinity-modal/helpers';
import dedicatedResourcesModal from '../modals/scheduling-modals/dedicated-resources-modal/connected-dedicated-resources-modal';
import evictionStrategyModal from '../modals/scheduling-modals/eviction-strategy-modal/eviction-strategy-modal';
import nodeSelectorModal from '../modals/scheduling-modals/node-selector-modal/connected-node-selector-modal';
import tolerationsModal from '../modals/scheduling-modals/tolerations-modal/connected-tolerations-modal';
import VMDetailsItem from '../vms/VMDetailsItem';
import VMEditWithPencil from '../vms/VMEditWithPencil';
import { getVMTemplateResourceFlavorData } from './utils';
import { VMTemplateLink } from './vm-template-link';
import { TemplateSource } from './vm-template-source';

import './_vm-template-resource.scss';

export const VMTemplateResourceSummary: React.FC<VMTemplateResourceSummaryProps> = ({
  template,
  canUpdateTemplate,
}) => {
  const { t } = useTranslation();

  const id = getBasicID(template);
  const templateNamespacedName = getVMTemplateNamespacedName(template);

  const description = getDescription(template);
  const os = getTemplateOperatingSystems([template])[0];
  const workloadProfile = getWorkloadProfile(template);

  return (
    <ResourceSummary resource={template} canUpdateResource={canUpdateTemplate}>
      <VMDetailsItem
        title={t('kubevirt-plugin~Description')}
        idValue={prefixedID(id, 'description')}
        valueClassName="kubevirt-vm-resource-summary__description"
        canEdit={canUpdateTemplate}
        onEditClick={() => descriptionModal({ resource: template, kind: getVMLikeModel(template) })}
      >
        {!description && (
          <span className="text-secondary">{t('kubevirt-plugin~Not available')}</span>
        )}
        {description}
      </VMDetailsItem>

      <VMDetailsItem
        title={t('kubevirt-plugin~Operating system')}
        idValue={prefixedID(id, 'os')}
        isNotAvail={!os}
      >
        {os ? os.name || os.id : null}
      </VMDetailsItem>

      <VMDetailsItem
        title={t('kubevirt-plugin~Workload profile')}
        idValue={prefixedID(id, 'workload-profile')}
        isNotAvail={!workloadProfile}
      >
        {workloadProfile}
      </VMDetailsItem>

      <VMDetailsItem
        title={t('kubevirt-plugin~Base template')}
        idValue={prefixedID(id, 'base-template')}
        isNotAvail={!templateNamespacedName}
      >
        {templateNamespacedName && <VMTemplateLink {...templateNamespacedName} />}
      </VMDetailsItem>
    </ResourceSummary>
  );
};

type VMTemplateSupportDescriptionProps = {
  template: TemplateKind;
};

export const VMTemplateSupportDescription: React.FC<VMTemplateSupportDescriptionProps> = ({
  template,
}) => {
  const { t } = useTranslation();
  const provider = getTemplateProvider(t, template);
  const templateSupport = getTemplateSupport(template);
  const parentProvider = getTemplateParentProvider(template);
  if ((templateSupport.parent && parentProvider) || (templateSupport.provider && provider)) {
    return (
      <>
        {templateSupport.parent && parentProvider && (
          <div>
            {parentProvider} - {templateSupport.parent}
          </div>
        )}
        {templateSupport.provider && provider && (
          <div>
            {provider} - {templateSupport.provider}
          </div>
        )}
      </>
    );
  }
  return <>-</>;
};

export const VMTemplateDetailsList: React.FC<VMTemplateResourceListProps> = ({
  template,
  sourceStatus,
  sourceLoaded,
  sourceLoadError,
}) => {
  const { t } = useTranslation();

  const id = getBasicID(template);
  const devices = getTransformedDevices(template);
  const vmWrapper = new VMWrapper(asVM(template));

  const [canWatchHC] = useAccessReview2({
    group: HyperConvergedModel?.apiGroup,
    resource: HyperConvergedModel?.plural,
    verb: 'watch',
  });

  return (
    <dl className="co-m-pane__details">
      <VMDetailsItem
        title={t('kubevirt-plugin~Boot order')}
        canEdit={!isCommonTemplate(template)}
        editButtonId={prefixedID(id, 'boot-order-edit')}
        onEditClick={() => BootOrderModal({ vmLikeEntity: template, modalClassName: 'modal-lg' })}
        idValue={prefixedID(id, 'boot-order')}
      >
        <BootOrderSummary devices={devices} />
      </VMDetailsItem>
      <VMDetailsItem
        title={t('kubevirt-plugin~Boot source')}
        idValue={prefixedID(id, 'provisioning-source')}
      >
        <TemplateSource
          loadError={sourceLoadError}
          loaded={sourceLoaded}
          template={template}
          sourceStatus={sourceStatus}
          detailed
        />
      </VMDetailsItem>
      <VMDetailsItem title={t('kubevirt-plugin~Provider')}>
        {getTemplateProvider(t, template) || '-'}
      </VMDetailsItem>
      <VMDetailsItem title={t('kubevirt-plugin~Support')}>
        <VMTemplateSupportDescription template={template} />
      </VMDetailsItem>
      <VMDetailsItem
        title={t('kubevirt-plugin~Hardware devices')}
        idValue={prefixedID(id, 'hardware-devices')}
        editButtonId={prefixedID(id, 'hardware-devices-edit')}
      >
        <VMEditWithPencil
          isEdit={!isCommonTemplate(template)}
          onEditClick={
            canWatchHC
              ? () =>
                  gpuDevicesModal({
                    vmLikeEntity: template,
                    vmDevices: vmWrapper.getGPUDevices(),
                  })
              : () =>
                  permissionsErrorModal({
                    title: t('kubevirt-plugin~Attach GPU device to VM'),
                    errorMsg: t(
                      'kubevirt-plugin~You do not have permissions to attach GPU devices. Contact your system administrator for more information.',
                    ),
                  })
          }
        >
          {t('kubevirt-plugin~{{gpusCount}} GPU devices', {
            gpusCount: vmWrapper.getGPUDevices()?.length || [].length,
          })}
        </VMEditWithPencil>
        <br />
        <VMEditWithPencil
          isEdit={!isCommonTemplate(template)}
          onEditClick={
            canWatchHC
              ? () =>
                  hostDevicesModal({
                    vmLikeEntity: template,
                    vmDevices: vmWrapper.getHostDevices(),
                  })
              : () =>
                  permissionsErrorModal({
                    title: t('kubevirt-plugin~Attach Host device to VM'),
                    errorMsg: t(
                      'kubevirt-plugin~You do not have permissions to attach Host devices. Contact your system administrator for more information.',
                    ),
                  })
          }
        >
          {t('kubevirt-plugin~{{hostDevicesCount}} Host devices', {
            hostDevicesCount: vmWrapper.getHostDevices()?.length || [].length,
          })}
        </VMEditWithPencil>
      </VMDetailsItem>
    </dl>
  );
};

export const VMTemplateSchedulingList: React.FC<VMTemplateResourceSummaryProps> = ({
  template,
  canUpdateTemplate,
}) => {
  const { t } = useTranslation();
  const id = getBasicID(template);
  const vm = asVM(template);
  const vmWrapper = new VMWrapper(vm);
  const flavorText = t(
    'kubevirt-plugin~{{flavor}}: {{count}} CPU | {{memory}} Memory',
    getVMTemplateResourceFlavorData(template, vmWrapper),
  );
  const isCPUPinned = isDedicatedCPUPlacement(vm);
  const nodeSelector = vmWrapper?.getNodeSelector();
  const evictionStrategy = vmWrapper?.getEvictionStrategy();
  const tolerations = vmWrapper?.getTolerations() || [];
  const tolerationsLabels = tolerations.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {});
  const affinityWrapperCount = getRowsDataFromAffinity(vmWrapper?.getAffinity())?.length;

  return (
    <>
      <div className="col-sm-6">
        <dl className="co-m-pane__details">
          <VMDetailsItem
            canEdit={canUpdateTemplate}
            title={t('kubevirt-plugin~Node selector')}
            idValue={prefixedID(id, 'node-selector')}
            editButtonId={prefixedID(id, 'node-selector-edit')}
            onEditClick={() => nodeSelectorModal({ vmLikeEntity: template, blocking: true })}
          >
            <LabelList kind="Node" labels={nodeSelector} />
          </VMDetailsItem>

          <VMDetailsItem
            canEdit={canUpdateTemplate}
            title={t('kubevirt-plugin~Tolerations')}
            idValue={prefixedID(id, 'tolerations')}
            editButtonId={prefixedID(id, 'tolerations-edit')}
            onEditClick={() =>
              tolerationsModal({
                vmLikeEntity: template,
                blocking: true,
                modalClassName: 'modal-lg',
              })
            }
          >
            <LabelList kind="Node" labels={tolerationsLabels} />
          </VMDetailsItem>

          <VMDetailsItem
            canEdit={canUpdateTemplate}
            title={t('kubevirt-plugin~Affinity rules')}
            idValue={prefixedID(id, 'affinity')}
            editButtonId={prefixedID(id, 'affinity-edit')}
            onEditClick={() =>
              affinityModal({
                vmLikeEntity: template,
                blocking: true,
                modalClassName: 'modal-lg',
              })
            }
          >
            {t('kubevirt-plugin~{{count}} Affinity rule', { count: affinityWrapperCount })}
          </VMDetailsItem>
        </dl>
      </div>
      <div className="col-sm-6">
        <dl className="co-m-pane__details">
          <VMDetailsItem
            title={t('kubevirt-plugin~Flavor')}
            idValue={prefixedID(id, 'flavor')}
            canEdit={canUpdateTemplate}
            onEditClick={() => vmFlavorModal({ vmLike: template, blocking: true })}
            editButtonId={prefixedID(id, 'flavor-edit')}
            isNotAvail={!flavorText}
          >
            {flavorText}
          </VMDetailsItem>

          <VMDetailsItem
            title={t('kubevirt-plugin~Dedicated resources')}
            idValue={prefixedID(id, 'dedicated-resources')}
            canEdit={canUpdateTemplate}
            onEditClick={() =>
              dedicatedResourcesModal({
                vmLikeEntity: template,
                blocking: true,
              })
            }
            editButtonId={prefixedID(id, 'dedicated-resources-edit')}
          >
            {isCPUPinned
              ? t('kubevirt-plugin~Workload scheduled with dedicated resources (guaranteed policy)')
              : t('kubevirt-plugin~No Dedicated resources applied')}
          </VMDetailsItem>
          <VMDetailsItem
            title={t('kubevirt-plugin~Eviction strategy')}
            idValue={prefixedID(id, 'eviction-strategy')}
            canEdit={canUpdateTemplate}
            onEditClick={() =>
              evictionStrategyModal({ vmLikeEntity: vm, evictionStrategy, blocking: true })
            }
            editButtonId={prefixedID(id, 'eviction-strategy-edit')}
          >
            {evictionStrategy || (
              <p className="text-muted">{t('kubevirt-plugin~No eviction strategy')}</p>
            )}
          </VMDetailsItem>
        </dl>
      </div>
    </>
  );
};

type VMTemplateResourceListProps = {
  template: TemplateKind;
  sourceStatus: TemplateSourceStatus;
  canUpdateTemplate?: boolean;
  sourceLoaded: boolean;
  sourceLoadError: any;
};

type VMTemplateResourceSummaryProps = {
  template: TemplateKind;
  canUpdateTemplate: boolean;
};
