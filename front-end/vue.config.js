module.exports = {
    devServer: {
        port: 3000,
        proxy: {
            //프록시란? 사전적으로 '대리, 대리인'이라는 의미를 갖고 있다
            //프로토콜에 있어서 대리 응답이라는 개념으로 이해를 하면 편함.
            '/api/*': {
                target: 'http://localhost:8080'
            }
        }
    },
    configureWebpack: {
        entry:{
            app: './src/main.js',
            style: [
                'bootstrap/dist/css/bootstrap.min.css'
            ]
        }
    }
}