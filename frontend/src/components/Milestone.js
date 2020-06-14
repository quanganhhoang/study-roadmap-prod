import React from 'react'

const Milestone = (props) => {
    return (
        <div>
            <Card 
                title={props.title}
                extra={<a href="#">More</a>} 
                style={{ width: 300 }}
            >
                <p>{props.content}</p>
            </Card>
    </div>
    )
}

export default Milestone;