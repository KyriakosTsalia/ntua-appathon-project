import React, {Component} from 'react'
import axios from "axios"
import Navbar from "./Navbar"
import ResultComponent from "./ResultComponent"

class ResultContainer extends Component {
  constructor() {
    super()
    this.state = {
      disease: "",
      min_publish_time: "",
      results: [],
      avgDataPoints: [],
      countDataPoints: [],
      errorDataPoints: []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  // helper method to precisely round floats up to 2 decimal digits
  roundToTwoDigits(number) {
    var negative = false;
    if (number < 0) {
      negative = true;
      number = number * -1 ;
    }
    let multiplicator = Math.pow(10, 2);
    number = parseFloat((number * multiplicator).toFixed(11));
    number = (Math.round(number) / multiplicator).toFixed(2);
    if (negative) {
      number = (number * -1).toFixed(2);
    }
    return Number(number);
  }

  componentDidMount() {
    let disease, min_publish_time
    let avgDataPoints = []
    let countDataPoints = []
    let errorDataPoints = []

    // this is to make sure we can refresh the page,
    // otherwise we would get disease and min_publish_time from this.props.location.userInput
    // but we wouldn't be able to refresh
    let [firstPart, secondPart] = this.props.location.search.split("&")

    if(!firstPart || !secondPart || firstPart.split("=").length === 1 || secondPart.split("=").length === 1 || firstPart.split("=")[1] === "" || secondPart.split("=")[1] === "") {
      this.setState({
        results: "none"
      })
    }
    else {
      disease = firstPart.split("=")[1]
      min_publish_time = secondPart.split("=")[1]
      console.log("disease " + firstPart.split("=")[1]);
      console.log("min_publish_time " + secondPart.split("=")[1]);

      axios.get("http://localhost:3001/disease_result?disease=" + disease + "&min_publish_time=" + min_publish_time)
      .then(response => {
        console.log(response.data);
        let results = response.data
        if(results.length === 0) {
          results = "none"
        } else {
          for(let i = 0; i < results.length; i++) {
            countDataPoints.push({ y: results[i].sourcePaperCount, label: results[i].sourceName })
            avgDataPoints.push({ y: this.roundToTwoDigits(results[i].avgNoOfauthors), label: results[i].sourceName })
            errorDataPoints.push({
              y: [
                this.roundToTwoDigits(results[i].avgNoOfauthors - results[i].stdDevNoOfAuthors),
                this.roundToTwoDigits(results[i].avgNoOfauthors + results[i].stdDevNoOfAuthors)
              ],
              label: results[i].sourceName
            })
          }
        }
        this.setState({
          disease: disease,
          min_publish_time: min_publish_time,
          results: results,
          avgDataPoints: avgDataPoints,
          countDataPoints: countDataPoints,
          errorDataPoints: errorDataPoints
        })
      })
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <ResultComponent data={this.state} />
      </div>
    )
  }
}

export default ResultContainer
