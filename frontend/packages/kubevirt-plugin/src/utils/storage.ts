import { ConfigMapKind } from '@console/internal/module/k8s';
import {
  AccessMode,
  DataVolumeSourceType,
  DEFAULT_DISK_SIZE,
  DiskBus,
  DiskType,
  DUMMY_VM_NAME,
  ROOT_DISK_NAME,
  VolumeMode,
  VolumeType,
} from '../constants';
import { DataVolumeWrapper } from '../k8s/wrapper/vm/data-volume-wrapper';
import { DiskWrapper } from '../k8s/wrapper/vm/disk-wrapper';
import { VolumeWrapper } from '../k8s/wrapper/vm/volume-wrapper';
import {
  getDefaultSCAccessModes,
  getDefaultSCVolumeMode,
} from '../selectors/config-map/sc-defaults';
import { generateDataVolumeName } from '.';

export const getEmptyInstallStorage = (
  scConfigMap: ConfigMapKind,
  bus = DiskBus.VIRTIO,
  vmName = DUMMY_VM_NAME,
  size = DEFAULT_DISK_SIZE,
) => {
  const dataVolumeName = generateDataVolumeName(vmName, ROOT_DISK_NAME);
  return {
    disk: new DiskWrapper()
      .init({ name: ROOT_DISK_NAME, bootOrder: 2 })
      .setType(DiskType.DISK, { bus })
      .asResource(),
    volume: new VolumeWrapper()
      .init({ name: ROOT_DISK_NAME })
      .setType(VolumeType.DATA_VOLUME, { name: dataVolumeName })
      .asResource(),
    dataVolume: new DataVolumeWrapper()
      .init({ name: dataVolumeName })
      .setRawSize(size)
      .setType(DataVolumeSourceType.BLANK)
      .setAccessModes(getDefaultSCAccessModes(scConfigMap))
      .setVolumeMode(getDefaultSCVolumeMode(scConfigMap))
      .asResource(),
  };
};

export const getEmptyAdditionalStorage = (
  storageClassName,
  accessMode = [AccessMode.READ_WRITE_ONCE],
  volumeMode = VolumeMode.FILESYSTEM,
) => {
  return {
    disk: new DiskWrapper()
      .init({ name: ROOT_DISK_NAME, bootOrder: 2 })
      .setType(DiskType.DISK, { bus: DiskBus.VIRTIO })
      .asResource(),
    volume: new VolumeWrapper()
      .init({ name: ROOT_DISK_NAME })
      .setType(VolumeType.DATA_VOLUME, { name: ROOT_DISK_NAME })
      .asResource(),
    dataVolume: new DataVolumeWrapper()
      .init({ name: ROOT_DISK_NAME })
      .setRawSize(DEFAULT_DISK_SIZE)
      .setType(DataVolumeSourceType.BLANK)
      .setStorageClassName(storageClassName)
      .setAccessModes(accessMode)
      .setVolumeMode(volumeMode)
      .asResource(),
  };
};
