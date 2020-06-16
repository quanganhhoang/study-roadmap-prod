import React from "react";
import { List } from "antd";
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

const RoadmapList = props => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 5
            }}
            dataSource={props.data}
            renderItem={item => {
                return (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText key="star" type="star" text={item.num_shares} />,
                            <IconText key="like" type="like" text={item.num_votes} />,
                            <IconText key="comment" type="comment" text={item.num_shares} />
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            // avatar={<Avatar src={item.avatar} />}
                            title={<a href={`/roadmaps/${item.id}`}> {item.title} </a>}
                            description={item.author}
                        />
                        {item.description}
                    </List.Item>
                )
            }}
        />
    );
};

export default RoadmapList;