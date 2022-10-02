import { TFunction } from 'i18next';
import * as _ from 'lodash';
import { RowFilter } from '@console/dynamic-plugin-sdk';
import {
  getVmStatusLabelFromPrintable,
  VM_STATUS_SIMPLE_LABELS,
} from '../../constants/vm/vm-status';
import { VMStatusBundle } from '../../statuses/vm/types';

export const vmStatusFilter = (t: TFunction): RowFilter => {
  return {
    filterGroupName: t('kubevirt-plugin~Status'),
    type: 'vm-status',
    reducer: (obj) => {
      return ((obj?.metadata as any)?.vmStatusBundle as VMStatusBundle)?.status?.getSimpleLabel();
    },
    items: VM_STATUS_SIMPLE_LABELS.map((status) => ({
      id: status,
      title: status,
    })),
    filter: (statuses, obj) => {
      const status = ((obj?.metadata as any)
        ?.vmStatusBundle as VMStatusBundle)?.status.getSimpleLabel();
      return (
        statuses.selected?.length === 0 ||
        statuses.selected?.includes(status) ||
        !_.includes(statuses.all, status)
      );
    },
  };
};

export const vmStatusFilterNew = (t: TFunction): RowFilter => {
  return {
    filterGroupName: t('kubevirt-plugin~Status'),
    type: 'vm-status',
    reducer: (obj) => getVmStatusLabelFromPrintable(obj?.metadata?.status),
    items: VM_STATUS_SIMPLE_LABELS.map((status) => ({
      id: status,
      title: status,
    })),
    filter: (statuses, obj) => {
      const status = getVmStatusLabelFromPrintable(obj?.metadata?.status);
      return (
        statuses.selected?.length === 0 ||
        statuses.selected?.includes(status) ||
        !_.includes(statuses?.all, status)
      );
    },
  };
};
