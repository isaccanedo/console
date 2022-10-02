import { coreReducer } from './core/reducers/core';
import sdkK8sReducers from './k8s/reducers/k8s';

/**
 * Dynamic Plugin SDK Redux store reducers
 *
 * If the app uses Redux, these can be spread into the root of your store to provide an integrated SDK.
 * If the app does not use Redux, these will be provided via the SDK Redux Store.
 */
export const SDKReducers = Object.freeze({
  sdkCore: coreReducer,
  k8s: sdkK8sReducers,
});
