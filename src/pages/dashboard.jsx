import React from "react";

const Dashboard = () => {
    return (
        <>
            <div style={{ width: '100%', border: 'solid black 1px', minHeight: '360px' }}>
                <h1 style={{ textAlign: 'center' }}>Organization details</h1>
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ flex: '0 0 60%', height: '430px', border: 'solid black 1px' }}>
                    <h2 style={{ textAlign: 'center', paddingTop: '20px' }}>Statistics</h2>
                </div>

                <div style={{ flex: '0 0 40%', height: '430px', border: 'solid black 1px' }}>
                    <h2 style={{ textAlign: 'center', paddingTop: '20px' }}>Recent Processes</h2>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

