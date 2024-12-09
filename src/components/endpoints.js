import config from "../config";

export const negotiationEndpoints = {
    requestEndpoint:
        `${config.url}${config.consumer}${config.gatewayNegotiationsPath}/request`,
    selfDescriptionEndpoint:
        `${config.url}${config.consumer}${config.gatewayNegotiationsPath}/self-description?endpoint=`,
    offerEndpoint:
        `${config.url}${config.provider}${config.gatewayNegotiationsPath}/offer`,
    acceptEndpoint: (negotiationId) =>
        `${config.url}${config.consumer}${config.gatewayNegotiationsPath}/${encodeURIComponent(negotiationId)}/acceptance`,
    agreeEndpoint: (negotiationId) =>
        `${config.url}${config.provider}${config.gatewayNegotiationsPath}/${encodeURIComponent(negotiationId)}/agreements`,
    verifyEndpoint: (negotiationId, agreementId) =>
        `${config.url}${config.consumer}${config.gatewayNegotiationsPath}/${encodeURIComponent(negotiationId)}/agreements/${encodeURIComponent(agreementId)}/verification`,
    finalizeEndpoint: (negotiationId) =>
        `${config.url}${config.provider}${config.gatewayNegotiationsPath}/${encodeURIComponent(negotiationId)}/finalization`,
    terminateEndpoint: (endpoint, negotiationId) =>
        `${config.url}${endpoint}${config.gatewayNegotiationsPath}/${encodeURIComponent(negotiationId)}/termination`,
};

export const transferEndpoints = {
    requestTransferEndpoint: `${config.url}${config.consumer}${config.gatewayTransfersPath}/request`,
    startEndpoint: (transferId, endpoint) =>
        `${config.url}${endpoint}${config.gatewayTransfersPath}/${encodeURIComponent(transferId)}/start`,
    suspendEndpoint: (transferId, endpoint) =>
        `${config.url}${endpoint}${config.gatewayTransfersPath}/${encodeURIComponent(transferId)}/suspension`,
    completeEndpoint: (transferId, endpoint) =>
        `${config.url}${endpoint}${config.gatewayTransfersPath}/${encodeURIComponent(transferId)}/completion`,
    terminateTEndpoint: (transferId, endpoint) =>
        `${config.url}${endpoint}${config.gatewayTransfersPath}/${encodeURIComponent(transferId)}/termination`,
};

export const catalogEndpoints = {
    addPolicyEndpoint: `${config.url}${config.provider}${config.gatewayCatalogPath}/policies`,
    addDatasetEndpoint: `${config.url}${config.provider}${config.gatewayCatalogPath}/datasets`
}

export const clientEndpoints = {

}
