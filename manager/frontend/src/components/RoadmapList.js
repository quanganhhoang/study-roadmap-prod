import React from "react";
import { List, Avatar } from "antd";
import { Icon } from '@ant-design/icons' 

// const IconText = ({ type, text }) => (
//   <span>
//     <Icon
//       type={type}
//       style={{
//         marginRight: 8
//       }}
//     />
//     {text}
//   </span>
// );

const Roadmaps = props => {
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
        //   actions={[
        //     <IconText type="star-o" text="156" />,
        //     <IconText type="like-o" text="156" />,
        //     <IconText type="message" text="2" />
        //   ]}
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
          {/* {item.content} */}
        </List.Item>
      )}
    />
  );
};

export default Roadmaps;