import React from 'react';
import { notification } from 'antd';

const Notification = () => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type, title, description, onClose) => {
        api[type]({
            message: title,
            description:
                description,
            duration: 8,
            onClose : onClose,
        });
    };
    return (
        { contextHolder, openNotification }
    );
};
export default Notification;