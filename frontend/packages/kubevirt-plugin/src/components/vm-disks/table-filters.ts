import { TFunction } from 'i18next';
import { RowFilter } from '@console/dynamic-plugin-sdk';
import { DiskType } from '../../constants/vm/storage';

const typeReducer = (obj) => {
  const diskType = obj?.type || DiskType.DISK;
  return diskType.getValue();
};

export const diskSourceFilter = (t: TFunction): RowFilter => {
  return {
    filterGroupName: t('kubevirt-plugin~Disk Type'),
    type: 'disk-type',
    reducer: typeReducer,
    items: DiskType.getAll().map((diskType) => ({
      id: diskType.getValue(),
      title: diskType.toString(),
    })),
    filter: (disks, obj) => {
      const diskType = typeReducer(obj);
      return (
        !disks.selected.length || disks.selected.includes(diskType) || disks.all?.includes(diskType)
      );
    },
  };
};
