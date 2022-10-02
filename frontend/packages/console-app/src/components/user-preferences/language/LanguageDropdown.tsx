import * as React from 'react';
import { Skeleton, SelectOption, Select, SelectVariant, Checkbox } from '@patternfly/react-core';
import { useTranslation } from 'react-i18next';
import { useTelemetry } from '@console/shared/src/hooks/useTelemetry';
import { supportedLocales } from './const';
import { useLanguage } from './useLanguage';
import { PREFERRED_LANGUAGE_USER_SETTING_KEY, usePreferredLanguage } from './usePreferredLanguage';

import './LanguageDropdown.scss';

const LanguageDropdown: React.FC = () => {
  const { t } = useTranslation();
  const fireTelemetryEvent = useTelemetry();
  const [preferredLanguage, setPreferredLanguage, preferredLanguageLoaded] = usePreferredLanguage();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const selectOptions: JSX.Element[] = React.useMemo(
    () =>
      Object.keys(supportedLocales).map((lang) => (
        <SelectOption key={lang} value={lang}>
          {supportedLocales[lang]}
        </SelectOption>
      )),
    [],
  );

  const [isUsingDefault, setIsUsingDefault] = React.useState<boolean>(!preferredLanguage);
  const checkboxLabel: string = t('console-app~Use the default browser language setting.');

  const onToggle = (isOpen: boolean) => setDropdownOpen(isOpen);
  const onSelect = (_, selection: string) => {
    if (selection !== preferredLanguage) {
      setPreferredLanguage(selection);
      fireTelemetryEvent('User Preference Changed', {
        property: PREFERRED_LANGUAGE_USER_SETTING_KEY,
        value: 'custom',
      });
    }
    setDropdownOpen(false);
  };

  const onUsingDefault = (checked: boolean) => {
    setIsUsingDefault(checked);
    fireTelemetryEvent('User Preference Changed', {
      property: PREFERRED_LANGUAGE_USER_SETTING_KEY,
      value: checked,
    });
    if (checked) {
      setPreferredLanguage(null);
    }
  };

  useLanguage(preferredLanguage, preferredLanguageLoaded); // sync the preferred language with local storage and set the console language

  React.useEffect(() => {
    if (preferredLanguageLoaded) {
      setIsUsingDefault(!preferredLanguage);
    }
    // run this hook only after resources have loaded
    // to set the using default language checkbox when the form loads
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferredLanguageLoaded]);

  return preferredLanguageLoaded ? (
    <>
      <Checkbox
        id="default-language-checkbox"
        label={checkboxLabel}
        isChecked={isUsingDefault}
        data-checked-state={isUsingDefault}
        onChange={onUsingDefault}
        aria-label={checkboxLabel}
        data-test="checkbox console.preferredLanguage"
        className="co-language-dropdown__system-default-checkbox"
      />
      <Select
        variant={SelectVariant.single}
        isOpen={dropdownOpen}
        selections={preferredLanguage}
        toggleId={'console.preferredLanguage'}
        onToggle={onToggle}
        onSelect={onSelect}
        placeholderText={t('console-app~Select a language')}
        aria-label={t('console-app~Select a language')}
        data-test="dropdown console.preferredLanguage"
        maxHeight={300}
        isDisabled={isUsingDefault}
      >
        {selectOptions}
      </Select>
    </>
  ) : (
    <>
      <Skeleton
        height="15px"
        width="100%"
        data-test="checkbox skeleton console.preferredLanguage"
        className="co-language-dropdown__system-default-checkbox"
      />
      <Skeleton
        height="30px"
        width="100%"
        data-test="dropdown skeleton console.preferredLanguage"
      />
    </>
  );
};

export default LanguageDropdown;
