import * as React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { history } from '@console/internal/components/utils';
import { defaultRepositoryFormValues } from './consts';
import { createRepositoryResources, repositoryValidationSchema } from './repository-form-utils';
import { RepositoryForm } from './RepositoryForm';
import { RepositoryFormValues } from './types';

type RepositoryFormPageProps = RouteComponentProps<{ ns?: string }>;

const RepositoryFormPage: React.FC<RepositoryFormPageProps> = ({
  match: {
    params: { ns },
  },
}) => {
  const { t } = useTranslation();

  const handleSubmit = (
    values: RepositoryFormValues,
    actions: FormikHelpers<RepositoryFormValues>,
  ): void => {
    createRepositoryResources(values, ns)
      .then(() => {
        actions.setFieldValue('showOverviewPage', true);
        actions.setStatus({
          submitError: '',
        });
      })
      .catch((e) => {
        actions.setStatus({ submitError: e.message });
      });
  };

  return (
    <Formik
      initialValues={defaultRepositoryFormValues}
      onSubmit={handleSubmit}
      onReset={history.goBack}
      validationSchema={repositoryValidationSchema(t)}
    >
      {(formikProps) => <RepositoryForm {...formikProps} />}
    </Formik>
  );
};

export default RepositoryFormPage;
