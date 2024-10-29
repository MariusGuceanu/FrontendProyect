import React from "react";
import Avatar from "antd/es/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import { Flex, Space } from "antd";
import '../styles/profile.css'

// Basic profile card for the page
const Profile = () => (
    <Space style={{
        padding: 30,
        fontSize: 24,
        color: "white",
        fontFamily: 'BlinkMacSystemFont',
    }} wrap size={16}>
        <Avatar style={{background: '#025375'}} size={52} icon={<UserOutlined />} />User123
    </Space>
);

export default Profile;