export const environmentVars = {
    OUTPUTS_PATH: process.env.OUTPUTS_PATH || '/../../outputs/',
    ROLLUP_HTTP_SERVER_URL: process.env.ROLLUP_HTTP_SERVER_URL || '[http://127.0.0.1:5004](http://127.0.0.1:5004/)'
}

console.log(`ENVIRONMENT: `, environmentVars);