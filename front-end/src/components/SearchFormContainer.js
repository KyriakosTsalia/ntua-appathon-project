import React, {Component} from "react"
import SearchFormComponent from "./SearchFormComponent"
import {withRouter} from 'react-router-dom';

class SearchFormContainer extends Component {
  constructor() {
    super()
    this.state = {
      disease: "",
      min_publish_time: "",
      type: "text"
    }
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onFocus() {
    this.setState({
      type: "date"
    })
  }

  onBlur() {
    this.setState({
      type: "text"
    })
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.history.push({
        pathname: "/disease_result",
        search: "?disease="+this.state.disease+"&min_publish_time="+this.state.min_publish_time,
        userInput: {
          disease: this.state.disease,
          min_publish_time: this.state.min_publish_time
        }
    })

    this.setState({
        disease: "",
        min_publish_time: ""
    })
  }

  render() {
    return (
      <SearchFormComponent
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        data={this.state}
      />
    )
  }
}

export default withRouter(SearchFormContainer)
