import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Avatar, Space, Dropdown, Typography, Menu } from "antd";
import { DownOutlined, SettingOutlined, UserOutlined, LogoutOutlined, IdcardOutlined } from "@ant-design/icons";

const Profile = () => {
    const navigate = useNavigate();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // Gets the name stored locally after logging in
    const username = localStorage.getItem("username") || "Guest";

    // Modal functions
    const showProfileModal = () => setIsProfileModalOpen(true);
    const handleProfileOk = () => setIsProfileModalOpen(false)
    const handleProfileCancel = () => setIsProfileModalOpen(false);

    // Handle modal opening and logout
    const handleMenu = ({ key }) => {
        if (key === "1" || key === "2" || key === "3") {
            setIsProfileModalOpen(true)
        }
        else if (key === "4") { // Log-out
            localStorage.removeItem('username')
            navigate("/");
        }
    };

    const dropdownItems = [
        {
            key: "1", label: <span style={{ color: "white" }}>
                <IdcardOutlined style={{ marginRight: 8 }} />
                My Account

            </span>
        },
        {
            key: "2", label: (
                <span style={{ color: "white" }}>
                    <UserOutlined style={{ marginRight: 8 }} />
                    Profile
                </span>
            ),
        },
        {
            key: "3", label: (
                <span style={{ color: "white" }}>
                    <SettingOutlined style={{ marginRight: 8 }} />
                    Settings
                </span>
            ),
        },
        {
            key: "4", label: (
                <span style={{ color: "white" }}>
                    <LogoutOutlined style={{ marginRight: 8 }} />
                    Log-out
                </span>
            ),
        },
    ];

    const menu = (
        <Menu items={dropdownItems} onClick={handleMenu}
            style={{
                backgroundColor: "#001529",
                border: "solid 1px white",
                borderRadius: "6px",
                marginTop: '27px',
            }} />
    );

    return (
        <div
            style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                padding: "8px 16px", border: "1px solid white", borderRadius: "25px",
                color: "white", width: "fit-content",
            }} >
            <Avatar style={{ background: "#ffffff", color: "#025375" }} size={52} icon={<UserOutlined />} />
            <Space style={{ marginLeft: "12px" }}>
                <Typography.Text
                    style={{ color: "white", fontSize: "16px", fontWeight: "bold" }} >
                    {username}
                </Typography.Text>
                <Dropdown overlay={menu} trigger={["click"]}>
                    <a
                        onClick={(e) => e.preventDefault()}
                        style={{
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginTop: '25px',
                        }} >
                        <DownOutlined />
                    </a>
                </Dropdown>
            </Space>
        </div>
    );
};

export default Profile;
