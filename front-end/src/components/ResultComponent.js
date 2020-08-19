import React from "react"
import {CanvasJSChart} from "canvasjs-react-charts"
import Container from 'react-bootstrap/Container'
import BounceLoader from "react-spinners/BounceLoader"
import NoResults from "./NoResults"

function ResultComponent(props) {
  const options = {
    animationEnabled: true,
    theme: "light2",
    backgroundColor: "#f5f5f5",
    axisY: {
      title: "Number of Papers per Source"
    },
    axisY2: {
      title: "Number of Authors per Paper"
    },
    toolTip: {
      shared: true
    },
    data: [
    {
      type: "column",
      name: "Number of Papers",
      showInLegend: true,
      toolTipContent: "<b>{label}</b> <br> <span style=\"color:#4F81BC\">{name}</span>: {y}",
      dataPoints: props.data.countDataPoints
    },
    {
      type: "line",
      name: "Average Number of Authors per Paper",
      showInLegend: true,
      axisYType: "secondary",
      dataPoints: props.data.avgDataPoints
    },
    {
      type: "error",
      name: "Error in Number of Authors per Paper",
      showInLegend: true,
      axisYType: "secondary",
      toolTipContent: "<span style=\"color:#C0504E\">{name}</span>: {y[0]} - {y[1]}",
      dataPoints: props.data.errorDataPoints
    }
    ]
  }

  const override = `
    display: block;
    margin: 0 auto;
    border-color: #b0e0e6;
  `;

  return (
    <Container className="mt-5">
    {props.data.results.length === 0 ? <BounceLoader css={override} size={150} color={"#b0e0e6"} loading={true}/> :
        props.data.results === "none" ? <NoResults /> :
        <div>
          <h2 style={{color: "gray"}} className="text-center">These are the top scientific sources regarding "{props.data.disease.replace("%20", " ")}" since {props.data.min_publish_time}</h2>
          <br/>
          <CanvasJSChart options={options} />
        </div>
    }
    </Container>
  )
}

export default ResultComponent
