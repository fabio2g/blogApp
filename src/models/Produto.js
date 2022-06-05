import { Sequelize, sequelize } from "./Database";

export const Produto = Sequelize.define("produtos", {
    codigo: {
        type: sequelize.INTEGER,
    },
    nome: {
        type: sequelize.STRING,
    },
    modelo: {
        type: sequelize.STRING,
    },
    categoria: {
        type: sequelize.STRING,
    },
    valor: {
        type: sequelize.FLOAT,
    },
    descricao: {
        type: sequelize.TEXT,
    },
});

// Produto.sync();
