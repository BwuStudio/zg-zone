const globe = {
    process: {
        env: {
            NODE_ENV: 'production'
        }
    }
}

Object.assign(window, globe)
export default globe