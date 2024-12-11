// Config values
const port = import.meta.env.VITE_API_PORT;

const config = {
    url: `http://localhost:${port}`,
    gatewayCatalogPath: '/api/v1/catalog',
    gatewayNegotiationsPath: '/api/v1/negotiations',
    gatewayTransfersPath: '/api/v1/transfers',
    gatewayClientPath: '/api/v1/client',
    gatewatManagmentPath: '/api/v1/management'
};

export default config;