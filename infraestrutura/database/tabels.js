class Tabel {
    init(conexao) {
        this.conexao = conexao;
        this.criarAtendimentos();
        this.criarPets();
    }
    
    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente VARCHAR(11) NOT NULL, pet VARCHAR(20), servico VARCHAR(20) NOT NULL, data DATETIME NOT NULL, dataCriacao DATETIME NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))';
        
        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro);
            }else{
                console.log('Table Atendimentos has been created');
            }
        });
    }

    criarPets(){
        const sql = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome VARCHAR(50), imagem VARCHAR(200), PRIMARY KEY(id))'; 

        this.conexao.query(sql, err => {
            if (err) {
                console.log(err);
            } else{
                console.log('Table Pets has been created');
            }
        })
    }
}

module.exports = new Tabel;