import React from "react";
import Organizations from "../pages/organization";

const Dashboard = () => {
    return (
        <>
            <div style={{ width: '100%', border: 'solid black 1px', minHeight: '360px' }}>
                <h1 style={{ textAlign: 'center' }}>Organization details</h1>
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ flex: '0 0 60%', height: '425px', border: 'solid black 1px' }}>
                    <h3 style={{ textAlign: 'center', paddingTop: '20px' }}>Statistics</h3>
                </div>

                <div style={{ flex: '0 0 40%', height: '425px', border: 'solid black 1px' }}>
                    <h3 style={{ textAlign: 'center', paddingTop: '20px' }}>Recent Processes</h3>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

