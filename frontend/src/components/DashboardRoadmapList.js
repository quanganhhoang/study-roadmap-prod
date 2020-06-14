import React from 'react'

import { List } from 'antd';
import { StarOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons' 


const IconComponent = (type) => {
    const iconStyle = {
        marginRight: 8,
    }
    switch (type) {
        case "star":
            return <StarOutlined style={ iconStyle }/>;
        case "like":
            return <LikeOutlined style={ iconStyle }/>;
        case "comment":
            return <CommentOutlined style={ iconStyle }/>;
    }
}

const IconText = ({ type, text }) => (
    <span>  
        {IconComponent(type)}
        {text}
    </span>
);

const DashboardRoadmapList = props => {
    return (
        <List
            // bordered="true"
            itemLayout="vertical"
            size="large"
            grid={{
                gutter: 32,
                column: 2
            }}
            dataSource={props.data}
            pagination={{
                position: "bottom",
                hideOnSinglePage: true,
                onChange: page => {
                    console.log(page);
                },
                pageSize: 2,
            }}
            renderItem={item => {
                return (
                    <List.Item
                        style={{padding: "5px", border: "1px solid"}}
                        key={item.title}
                        actions={[
                            <IconText type="star" text="156" />,
                            <IconText type="like" text="156" />,
                            <IconText type="comment" text="2" />
                        ]}
                        // extra itemLayout does not work with grid
                        // extra={
                        //     <p>This is extra</p>
                        // }
                    >
                        <List.Item.Meta
                            title={
                                <div>
                                    <div>
                                        <a className="dashboard-roadmap-card-title" href={`/roadmaps/${item.id}/`}> 
                                            {item.title} 
                                        </a>
                                    </div>
                                    <div>
                                        <a className="dashboard-roadmap-card-author" href={`/users/${item.author}/`}> 
                                            {item.author} 
                                        </a>
                                    </div> 
                                </div>
                            }
                            description={(
                                <div>
                                    <p className="dashboard-roadmap-card-description">{item.description}</p>
                                </div>
                                
                            )}
                        />
                        {item.content}
                    </List.Item>
                )
            }}
        />
    )
}

export default DashboardRoadmapList;
