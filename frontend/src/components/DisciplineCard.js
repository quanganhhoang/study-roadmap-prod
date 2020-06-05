import React from 'react'

const DisciplineCard = (props) => {
    const thumbnail = "https://free-pptbackgrounds.com/wp-content/uploads/2019/04/max-complexity-blue-black-pptbackgrounds.jpg"
    return (
        <div className="dashboard-discipline-container">
            <img className="dashboard-discipline-thumbnail" src={thumbnail} width="270" height="140"></img>
            <div className="text_over_image">{props.discipline}</div>
        </div>
    )
}

export default DisciplineCard

