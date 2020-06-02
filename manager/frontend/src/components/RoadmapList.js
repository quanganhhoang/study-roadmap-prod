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
        pageSize: 3
      }}
      dataSource={props.data}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <IconText type="star" text="156" />,
            <IconText type="like" text="156" />,
            <IconText type="comment" text="2" />
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
            title={<a href={`/roadmaps/${item.id}/`}> {item.title} </a>}
            // description={item.description}
            description="FAKE DESCRIPTION"
          />
          {item.content}
        </List.Item>
      )}
    />
  );
};

export default RoadmapList;