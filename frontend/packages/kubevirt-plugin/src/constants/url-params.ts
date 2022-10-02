import { resourceListPathFromModel } from '@console/internal/components/utils';
import { VirtualMachineModel } from '../models/index';
import {
  getKubevirtAvailableModel,
  kubevirtReferenceForModel,
} from '../models/kubevirtReferenceForModel';

export enum VMWizardURLParams {
  NAMESPACE = 'namespace',
  MODE = 'mode',
  INITIAL_DATA = 'initialData',
  VIEW = 'view',
  TEMPLATE = 'template',
  TEMPLATE_NS = 'template-ns',
  PRESELECTED_NS = 'preselected-ns',
}

const baseURLBuilder = (namespace = 'default') =>
  resourceListPathFromModel(getKubevirtAvailableModel(VirtualMachineModel), namespace).concat(
    '/~new',
  );

export const VIRTUALMACHINES_BASE_URL = kubevirtReferenceForModel(VirtualMachineModel);
export const VIRTUALIZATION_BASE_URL = 'virtualization';
export const VIRTUALMACHINES_TEMPLATES_BASE_URL = 'virtualmachinetemplates';

export const wizardBaseURLBuilder = (namespace: string | undefined, params?: string | undefined) =>
  `${baseURLBuilder(namespace)}/wizard${params || ''}`;

export const customizeWizardBaseURLBuilder = (
  namespace: string | undefined,
  params?: string | undefined,
) => `${baseURLBuilder(namespace)}/customize${params || ''}`;

export const YAMLBaseURLBuilder = (namespace: string | undefined) => baseURLBuilder(namespace);

export const instantiateTemplateBaseURLBuilder = (
  namespace: string | undefined,
  params?: string | undefined,
) => `${baseURLBuilder(namespace)}/instantiate-template${params || ''}`;
