import React from 'react'

const DisciplineCard = (props) => {
    return (
        <div className="dashboard-discipline-container">
            <img className="dashboard-discipline-thumbnail" src={props.thumbnail} width="270" height="140"></img>
            <div className="text_over_image">{props.discipline}</div>
        </div>
    )
}

export default DisciplineCard

