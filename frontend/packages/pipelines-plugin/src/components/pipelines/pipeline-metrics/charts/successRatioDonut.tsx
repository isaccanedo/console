import * as React from 'react';
import { ChartDonut, ChartDonutProps, ChartLabel, ChartThemeColor } from '@patternfly/react-charts';
import { global_danger_color_100 as dangerColor } from '@patternfly/react-tokens/dist/js/global_danger_color_100';
import * as _ from 'lodash';

interface SuccessRatioDonutProps {
  successValue: number;
}

const SuccessRatioDonut: React.FC<SuccessRatioDonutProps & ChartDonutProps> = ({
  data,
  width,
  successValue = 0,
  ariaDesc,
  ariaTitle,
  title,
  subTitle,
}) => {
  return (
    <ChartDonut
      ariaDesc={ariaDesc}
      ariaTitle={ariaTitle}
      constrainToVisibleArea
      data={data}
      sortKey={successValue ? ['success', 'failed'] : ['failed']}
      labels={({ datum }) => `${_.capitalize(datum.x)}: ${datum.y}%`}
      colorScale={successValue ? [ChartThemeColor.green, dangerColor.value] : [dangerColor.value]}
      padding={{
        bottom: 20,
        left: 20,
        right: 20,
        top: 20,
      }}
      subTitle={subTitle}
      subTitleComponent={
        <ChartLabel style={{ fill: 'var(--pf-global--Color--400)', fontSize: 14 }} />
      }
      title={title}
      titleComponent={<ChartLabel style={{ fill: 'var(--pf-global--Color--100)', fontSize: 24 }} />}
      width={width}
    />
  );
};

export default SuccessRatioDonut;
