import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { HoverTooltip, OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

const dateFormat = timeFormat("%Y-%m-%d");
const numberFormat = format(".2f");

function tooltipContent(ys) {
  return ({ currentItem, xAccessor }) => {
    return {
      x: dateFormat(xAccessor(currentItem)),
      y: [
        {
          label: "Open",
          value: currentItem.open && numberFormat(currentItem.open),
        },
        {
          label: "High",
          value: currentItem.high && numberFormat(currentItem.high),
        },
        {
          label: "Low",
          value: currentItem.low && numberFormat(currentItem.low),
        },
        {
          label: "Close",
          value: currentItem.close && numberFormat(currentItem.close),
        },
      ]
        .concat(
          ys.map((each) => ({
            label: each.label,
            value: each.value(currentItem),
            stroke: each.stroke,
          }))
        )
        .filter((line) => line.value),
    };
  };
}

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suffix: 0,
    };
  }
  componentWillMount() {
    this.setState({
      suffix: 1,
    });
  }
  saveNode = (node) => {
    this.node = node;
  };
  resetYDomain = () => {
    this.node.resetYDomain();
  };
  handleReset = () => {
    this.setState({
      suffix: this.state.suffix + 1,
    });
  };
  render() {
    const { type, width, ratio } = this.props;
    const { mouseMoveEvent, panEvent, zoomEvent, zoomAnchor } = this.props;
    const { clamp } = this.props;

    const { data: initialData } = this.props;

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } =
      xScaleProvider(initialData);

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];

    const margin = { left: 10, right: 50, top: 20, bottom: 30 };

    const height = 400;

    const gridHeight = height - margin.top - margin.bottom;
    const gridWidth = width - margin.left - margin.right;

    const showGrid = true;
    const yGrid = showGrid
      ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 }
      : {};
    const xGrid = showGrid
      ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 }
      : {};
    return (
      <div>
        <div>
          <ChartCanvas
            ref={this.saveNode}
            height={height}
            ratio={ratio}
            width={width}
            margin={{ left: 10, right: 50, top: 10, bottom: 30 }}
            mouseMoveEvent={mouseMoveEvent}
            panEvent={panEvent}
            zoomEvent={zoomEvent}
            clamp={clamp}
            zoomAnchor={zoomAnchor}
            type={type}
            data={data}
            xScale={xScale}
            xExtents={xExtents}
            xAccessor={xAccessor}
            displayXAccessor={displayXAccessor}
          >
            <Chart id={1} yExtents={(d) => [d.high, d.low]}>
              <XAxis
                axisAt="bottom"
                orient="bottom"
                ticks={10}
                zoomEnabled={zoomEvent}
                {...xGrid}
              />
              <YAxis
                axisAt="right"
                orient="right"
                ticks={20}
                zoomEnabled={zoomEvent}
                {...yGrid}
              />

              <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")}
              />
              <MouseCoordinateX
                at="bottom"
                orient="bottom"
                displayFormat={timeFormat("%Y-%m-%d")}
              />

              <CandlestickSeries />
              <OHLCTooltip origin={[5, 20]} />
              <HoverTooltip tooltipContent={tooltipContent([])} fontSize={12} />
            </Chart>
            <CrossHairCursor />
          </ChartCanvas>
        </div>
      </div>
    );
  }
}

Charts = fitWidth(Charts);

export default Charts;
