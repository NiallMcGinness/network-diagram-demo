const test = {
    backend: "http://apind.nmcg.dev",
    es_index: "test_1"
}

const prod = {
    backend: "http://apind.nmcg.dev",
    es_index: "production_1"
}

const config = process.env.REACT_APP_STAGE === 'test'
    ? test
    : prod;

export default config;