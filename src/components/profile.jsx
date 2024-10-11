import React from "react";
import Avatar from "antd/es/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import { Space } from "antd";

const Profile = () => (
    <Space style={{
        display: 'flex',
        justifyContent: 'end',
        paddingRight: 80,
        padding: 30,
        fontSize: 24,
        color: "white",
        fontFamily: 'BlinkMacSystemFont',
    }} wrap size={16}>
        <Avatar style={{background: '#025375'}} size={52} icon={<UserOutlined />} />User123
    </Space>
);

export default Profile;