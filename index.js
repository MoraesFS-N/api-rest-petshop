const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/database/conexao');
const Tabels = require('./infraestrutura/database/tabels');

conexao.connect(err => {
    if (err) {
        console.log(err);
    }else{
        console.log('Conection established');

        Tabels.init(conexao);

        const app = customExpress();

        app.listen(3505, () => {
            console.log('Listen app at port 3000');
        });
    }
});






