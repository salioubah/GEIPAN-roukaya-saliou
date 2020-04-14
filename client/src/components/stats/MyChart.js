import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data
    };
  }
  componentDidMount() {
    console.log(this.props.data)
  }
  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="total"
            argumentField="Type"
          />
          <Title text={this.props.titre} />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}