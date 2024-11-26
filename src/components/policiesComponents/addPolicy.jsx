import React, { useState } from "react";
import { Modal, Form, Button, Input, Divider } from "antd";
import { PlusOutlined, MinusCircleOutlined, SendOutlined } from "@ant-design/icons";
import axios from "axios";
import config from "../../config";
import Notification from '../notifications';

const PolicyModal = ({ isModalOpen, handlePolicyOk, handlePolicyCancel, addRowToTable }) => {
    const [target, setTarget] = useState("");
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { openNotification, contextHolder } = Notification();
    const [sections, setSections] = useState({
        permissions: [],
        prohibitions: [],
        obligations: [],
    });

    // Adds a new action with constraints to a specific section
    const addSectionItem = (section) => {
        setSections({
            ...sections,
            [section]: [
                ...sections[section],
                { action: "", constraints: [{ leftOperand: "", operator: "", rightOperand: "" }] },
            ],
        });
    };

    // Removes an action from a specific section
    const removeSectionItem = (section, index) => {
        const updated = sections[section].filter((_, i) => i !== index);
        setSections({ ...sections, [section]: updated });
    };

    // Adds a constraint to a specific action
    const addConstraint = (section, actionIndex) => {
        const updatedSection = [...sections[section]];
        updatedSection[actionIndex].constraints.push({ leftOperand: "", operator: "", rightOperand: "" });
        setSections({ ...sections, [section]: updatedSection });
    };

    // Removes a constraint from a specific action
    const removeConstraint = (section, actionIndex, constraintIndex) => {
        const updatedSection = [...sections[section]];
        updatedSection[actionIndex].constraints = updatedSection[actionIndex].constraints.filter(
            (_, i) => i !== constraintIndex
        );
        setSections({ ...sections, [section]: updatedSection });
    };

    // Update a value in the sections state
    const handleFieldChange = (section, actionIndex, field, value, constraintIndex = null) => {
        const updatedSection = [...sections[section]];
        if (constraintIndex === null) {
            // Update action field
            updatedSection[actionIndex][field] = value;
        } else {
            updatedSection[actionIndex].constraints[constraintIndex][field] = value; // Update constraint field
        }
        setSections({ ...sections, [section]: updatedSection });
    };

    // Main function to create a policy by sending a request 
    const handleCreatePolicy = async () => {
        setLoading(true);
        try {
            // Sends the request
            const response = await axios.post(`${config.providerEndpoint}/api/gateway/create-policy`, {
                target,
                ...sections
            });
            if (response.status === 200) {
                const { policyId } = response.data;
                openNotification('success', 'Offer sent', `Policy ID: ${policyId}`);
                form.resetFields();
                setTarget('')
                setSections({
                    permissions: [],
                    prohibitions: [],
                    obligations: [],
                });
                addRowToTable(policyId, target, sections);
                handlePolicyOk();
            }
        } catch (error) {
            console.error("Error creating policy:", error);
            openNotification('error', 'Error', 'An error occurred while creating the policy.');
        } finally {
            setLoading(false);
        }
    };

    // Render constraints for an action
    const renderConstraints = (section, actionIndex, constraints) => (
        constraints.map((constraint, constraintIndex) => (
            <div style={{ display: "flex", marginBottom: 8 }}>
                <Input placeholder="Left Operand" style={{ flex: 1, marginRight: 8 }} value={constraint.leftOperand} onChange={(e) =>
                    handleFieldChange(section, actionIndex, "leftOperand", e.target.value, constraintIndex)
                } />
                <Input placeholder="Operator" style={{ flex: 1, marginRight: 8 }} value={constraint.operator} onChange={(e) =>
                    handleFieldChange(section, actionIndex, "operator", e.target.value, constraintIndex)
                } />
                <Input placeholder="Right Operand" style={{ flex: 1, marginRight: 8 }} value={constraint.rightOperand} onChange={(e) =>
                    handleFieldChange(section, actionIndex, "rightOperand", e.target.value, constraintIndex)
                } />
                {(
                    <MinusCircleOutlined style={{ color: "red", marginTop: 8 }} onClick={() => removeConstraint(section, actionIndex, constraintIndex)} />
                )}
            </div>
        ))
    );

    // Render actions for a section
    const renderSection = (section) => (
        sections[section].map((actionItem, index) => (
            <div key={index} style={{ marginBottom: 16 }}>
                <Input placeholder="Action" value={actionItem.action} onChange={(e) => handleFieldChange(section, index, "action", e.target.value)} style={{ marginBottom: 8 }} />
                {renderConstraints(section, index, actionItem.constraints)}
                <Button type="dashed" onClick={() => addConstraint(section, index)} icon={<PlusOutlined />} style={{ width: "100%", marginBottom: 8 }}>
                    Add Constraint
                </Button>
                {(
                    <Button danger onClick={() => removeSectionItem(section, index)} style={{ marginTop: 8, marginLeft:'44%' }}>
                        Remove Action
                    </Button>
                )}
                <Divider />
            </div>
        ))
    );

    // Modal display
    return (
        <>
            {contextHolder}
            <Modal width={1000} open={isModalOpen} onCancel={handlePolicyCancel} footer={[
                <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 25 }}>
                    <Button style={{ width: '30%' }} size="large" type="primary" disabled={!target} loading={loading} onClick={handleCreatePolicy} icon={<SendOutlined />}>
                        Add Policy
                    </Button>
                    <Button style={{ width: '30%' }} size="large" key="cancel" onClick={handlePolicyCancel}>
                        Cancel
                    </Button>
                </div>
            ]}>
                <h2>Create a new Policy</h2>
                <Form layout="horizontal">
                    <Form.Item label="Target">
                        <Input value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Enter target" />
                    </Form.Item>

                    {/* Permissions display */}
                    <Divider>Permissions</Divider>
                    {renderSection("permissions")}
                    <Button type="dashed" icon={<PlusOutlined />} onClick={() => addSectionItem("permissions")} style={{ width: "100%", marginBottom: 16, marginTop: -16 }} >
                        Add Permission
                    </Button>

                    {/* Prohibitions display */}
                    <Divider>Prohibitions</Divider>
                    {renderSection("prohibitions")}
                    <Button type="dashed" icon={<PlusOutlined />} onClick={() => addSectionItem("prohibitions")} style={{ width: "100%", marginBottom: 16, marginTop: -16 }} >
                        Add Prohibition
                    </Button>

                    {/* Obligations display */}
                    <Divider>Obligations</Divider>
                    {renderSection("obligations")}
                    <Button type="dashed" icon={<PlusOutlined />} onClick={() => addSectionItem("obligations")} style={{ width: "100%", marginTop: -16 }}>
                        Add Obligation
                    </Button>

                </Form>
            </Modal>
        </>
    );
};

export default PolicyModal;
