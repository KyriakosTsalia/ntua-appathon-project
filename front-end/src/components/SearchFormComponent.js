import React from "react"

function SearchFormComponent(props) {
  return (
    <div className="container">
      <form className="diseaseForm text-center" action="/disease_result" method="get" onSubmit={props.handleSubmit}>
        <div className="form-row text-center">
          < div className="form-group col-12">
            <label name="disease">
              <input
                type="text"
                className="form-control form-control-lg"
                name="disease"
                value={props.data.disease}
                onChange={props.handleChange}
                placeholder="Search for a disease..."
                required
              />
            </label>
          </div>
        </div>
        <div className="form-row text-center">
          <div className="form-group col-12">
            <label name="min_publish_time">
              <input
                type={props.data.type}
                placeholder="Starting date of publication..."
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                className="form-control form-control-lg"
                name="min_publish_time"
                value={props.data.min_publish_time }
                onChange={props.handleChange}
                min="1900-01-01"
                required
              />
            </label>
          </div>
        </div>
        <div className="form-row text-center">
          <div className="form-group col-12">
            <button type="submit" className="btn btn-lg btn-primary" style={{backgroundColor: "#b0e0e6", border: "#b0e0e6", fontWeight: "900"}} name="button">Search</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchFormComponent
