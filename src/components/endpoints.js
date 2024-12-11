import config from "../config";

export const negotiationEndpoints = {
    getNegotiations: `${config.url}${config.gatewayNegotiationsPath}`,
    requestEndpoint:
        `${config.url}${config.gatewayNegotiationsPath}/request`,
    selfDescriptionEndpoint:
        `${config.url}${config.gatewayNegotiationsPath}/self-description?endpoint=`,
    offerEndpoint:
        `${config.url}${config.gatewayNegotiationsPath}/offer`,
    acceptEndpoint: (negotiationId) =>
        `${config.url}${config.gatewayNegotiationsPath}/${encodeURIComponent(negotiationId)}/acceptance`,
    agreeEndpoint: (negotiationId) =>
        `${config.url}${config.gatewayNegotiationsPath}/${encodeURIComponent(negotiationId)}/agreements`,
    verifyEndpoint: (negotiationId, agreementId) =>
        `${config.url}${config.gatewayNegotiationsPath}/${encodeURIComponent(negotiationId)}/agreements/${encodeURIComponent(agreementId)}/verification`,
    finalizeEndpoint: (negotiationId) =>
        `${config.url}${config.gatewayNegotiationsPath}/${encodeURIComponent(negotiationId)}/finalization`,
    terminateEndpoint: (negotiationId) =>
        `${config.url}${config.gatewayNegotiationsPath}/${encodeURIComponent(negotiationId)}/termination`,
};

export const transferEndpoints = {
    requestTransferEndpoint: `${config.url}${config.gatewayTransfersPath}/request`,
    startEndpoint: (transferId) =>
        `${config.url}${config.gatewayTransfersPath}/${encodeURIComponent(transferId)}/start`,
    suspendEndpoint: (transferId) =>
        `${config.url}${config.gatewayTransfersPath}/${encodeURIComponent(transferId)}/suspension`,
    completeEndpoint: (transferId) =>
        `${config.url}${config.gatewayTransfersPath}/${encodeURIComponent(transferId)}/completion`,
    terminateTEndpoint: (transferId) =>
        `${config.url}${config.gatewayTransfersPath}/${encodeURIComponent(transferId)}/termination`,
};

export const catalogEndpoints = {
    addPolicyEndpoint: `${config.url}${config.gatewayCatalogPath}/policies`,
    addDatasetEndpoint: `${config.url}${config.gatewayCatalogPath}/datasets`
}

export const managmentEndpoints = {
    getOrganization: `${config.url}${config.gatewatManagmentPath}/organization`,
    postOrganization: `${config.url}${config.gatewatManagmentPath}/organization`,
}
