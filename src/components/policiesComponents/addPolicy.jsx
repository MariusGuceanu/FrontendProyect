import React, { useState } from "react";
import { Modal, Form, Button, Input, Divider, Select } from "antd";
import { PlusOutlined, MinusCircleOutlined, SendOutlined } from "@ant-design/icons";
import axios from "axios";
import Notification from '../notifications';
import { catalogEndpoints } from "../endpoints";

const { Option } = Select;

const PolicyModal = ({ isModalOpen, handlePolicyOk, handlePolicyCancel, addRowToTable }) => {
    const [target, setTarget] = useState("");
    const [loading, setLoading] = useState(false);
    const [rules, setRules] = useState([]);
    const [form] = Form.useForm();
    const { openNotification, contextHolder } = Notification();

    // Adds a new rule
    const addRule = () => {
        setRules([...rules, { type: "", action: "", constraints: [{ leftOperand: "", operator: "", rightOperand: "" }] }]);
    };

    // Deletes a rule
    const removeRule = (index) => {
        const updatedRules = rules.filter((_, i) => i !== index);
        setRules(updatedRules);
    };

    // Adds a constraint to a rule
    const addConstraint = (ruleIndex) => {
        const updatedRules = [...rules];
        updatedRules[ruleIndex].constraints.push({ leftOperand: "", operator: "", rightOperand: "" });
        setRules(updatedRules);
    };

    // Deletes a constraint from a specific rule
    const removeConstraint = (ruleIndex, constraintIndex) => {
        const updatedRules = [...rules];
        updatedRules[ruleIndex].constraints = updatedRules[ruleIndex].constraints.filter((_, i) => i !== constraintIndex);
        setRules(updatedRules);
    };

    // Updates the values of the rules and constraints
    const handleFieldChange = (ruleIndex, field, value, constraintIndex = null) => {
        const updatedRules = [...rules];
        if (constraintIndex === null) {
            updatedRules[ruleIndex][field] = value;
        } else {
            updatedRules[ruleIndex].constraints[constraintIndex][field] = value;
        }
        setRules(updatedRules);
    };

    // Main function to create a policy by sending a request
    const handleCreatePolicy = async () => {
        setLoading(true);
        const url = catalogEndpoints.addPolicyEndpoint
        try {
            const response = await axios.post(url, {
                target,
                rules,
            });
            if (response.status === 200) {
                const { policyId } = response.data;
                openNotification('success', 'Policy created successfully', `Policy ID: ${policyId}`);
                form.resetFields();
                setTarget("");
                setRules([]);
                addRowToTable(policyId, target, rules);
                handlePolicyOk();
            }
        } catch (error) {
            console.error("Error creating policy:", error);
            openNotification('error', 'Error', 'An error occurred while creating the policy.');
        } finally {
            setLoading(false);
        }
    };

    // Renders the constraints field inputs 
    const renderConstraints = (ruleIndex, constraints) => (
        constraints.map((constraint, constraintIndex) => (
            <div style={{ display: "flex", marginBottom: 12, marginTop: 12 }} key={constraintIndex}>
                <Input placeholder="Left Operand" style={{ flex: 1, marginRight: 8 }} value={constraint.leftOperand} onChange={(e) => handleFieldChange(ruleIndex, "leftOperand", e.target.value, constraintIndex)} />
                <Input placeholder="Operator" style={{ flex: 1, marginRight: 8 }} value={constraint.operator} onChange={(e) => handleFieldChange(ruleIndex, "operator", e.target.value, constraintIndex)} />
                <Input placeholder="Right Operand" style={{ flex: 1, marginRight: 8 }} value={constraint.rightOperand} onChange={(e) => handleFieldChange(ruleIndex, "rightOperand", e.target.value, constraintIndex)} />
                <MinusCircleOutlined style={{ color: "red" }} onClick={() => removeConstraint(ruleIndex, constraintIndex)} />
            </div>
        ))
    );

    // Render the rules field inputs
    const renderRules = () => (
        rules.map((rule, ruleIndex) => (
            <div key={ruleIndex} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <Select placeholder="Select format" style={{ width: '50%' }} value={rule.type} onChange={(value) => handleFieldChange(ruleIndex, "type", value)} rules={[{ required: true, message: 'Select a type of rule' }]} >
                        <Option value="permissions">Permission</Option>
                        <Option value="prohibitions">Prohibition</Option>
                        <Option value="obligations">Obligation</Option>
                    </Select>
                    <Input style={{ width: '50%' }} placeholder="Action" value={rule.action} onChange={(e) => handleFieldChange(ruleIndex, "action", e.target.value)} />
                </div>
                {renderConstraints(ruleIndex, rule.constraints)}
                <Button type="dashed" onClick={() => addConstraint(ruleIndex)} icon={<PlusOutlined />} style={{ width: "100%", marginBottom: 8 }} >
                    Add Constraint
                </Button>
                <div style={{ display: 'flex', justifyContent: 'center', }}>
                    <Button danger onClick={() => removeRule(ruleIndex)} style={{ width: "25%", marginTop: 10 }}>
                        Remove Rule
                    </Button>
                </div>
                <Divider />
            </div>
        ))
    );

    // Modal display
    return (
        <>
            {contextHolder}
            <Modal width={700} open={isModalOpen} onCancel={handlePolicyCancel} footer={[
                <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 25 }}>
                    <Button style={{ width: '30%' }} size="large" type="primary" disabled={!target} loading={loading} onClick={handleCreatePolicy} icon={<SendOutlined />} >
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

                    {/* Render rules */}
                    <Divider>Rules</Divider>
                    {renderRules()}
                    <Button type="dashed" icon={<PlusOutlined />} onClick={addRule} style={{ width: "100%", marginBottom: 16 }} >
                        Add Rule
                    </Button>
                </Form>
            </Modal>
        </>
    );
};

export default PolicyModal;
