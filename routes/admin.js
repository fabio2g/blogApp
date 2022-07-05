const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");

require("../models/Postagem");
const Postagem = mongoose.model("postagens");

/**
 * ---------------------------
 * Rota principal da aplicação
 * ---------------------------
 */
router.get("/", (req, res) => {
    res.render("admin/index");
});

router.get("/posts", (req, res) => {
    res.render("admincategorias");
});

router.get("/categorias", (req, res) => {
    Categoria.find()
        .lean()
        .sort({ date: "desc" })
        .then((categorias) => {
            res.render("admin/categorias", { categorias: categorias });
        })
        .catch((err) => {
            req.flash("error_msg", "Erro ao listar as categorias");
            res.redirect("/admin");
        });
});

/**
 * ---------------------------------------------------------------
 * Rota responsável por renderizar a view de adição de categorias
 * ---------------------------------------------------------------
 */
router.get("/categorias/add", (req, res) => {
    res.render("admin/addcategorias");
});

/**
 * -------------------------------------------------
 * Rota responsável por adicionar uma nova categoria
 * -------------------------------------------------
 */
router.post("/categorias/nova", (req, res) => {
    const erros = [];

    if (
        !req.body.nome ||
        typeof req.body.nome == undefined ||
        req.body.nome == null
    ) {
        erros.push({
            texto: "Nome inválido",
        });
    }

    if (
        !req.body.slug ||
        typeof req.body.slug == undefined ||
        req.body.slug == null
    ) {
        erros.push({
            texto: "Slug inválido",
        });
    }

    if (erros.length > 0) {
        res.render("admin/addcategorias", { erros: erros });
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug,
        };

        new Categoria(novaCategoria)
            .save()
            .then(() => {
                req.flash("success_msg", "Categoria editada com sucesso!");
                res.redirect("/admin/categorias");
            })
            .catch((err) => {
                req.flash(
                    "error_msg",
                    "Erro ao registrar categoria, tente novamente!"
                );
                res.redirect("/admin");
            });
    }
});

/**
 * ------------------------------------------------------------
 * Rota responsável por rederizar a view de edição de categoria
 * ------------------------------------------------------------
 */
router.get("/categorias/edit/:id", (req, res) => {
    Categoria.findOne({ _id: req.params.id })
        .lean()
        .then((categoria) => {
            res.render("admin/editCategorias", { categoria: categoria });
        })
        .catch((err) => {
            req.flash("error_msg", "Essa categoria não existe!");
            res.redirect("/admin/categorias");
        });
});

/**
 * ----------------------------------------------------------------------
 * Rota responsável pela percistência de dados edidados na view de edição
 * ----------------------------------------------------------------------
 */
router.post("/categorias/edit", (req, res) => {
    const erros = [];

    if (
        !req.body.nome ||
        typeof req.body.nome == undefined ||
        req.body.nome == null
    ) {
        erros.push({
            texto: "Nome inválido",
        });
    }

    if (
        !req.body.slug ||
        typeof req.body.slug == undefined ||
        req.body.slug == null
    ) {
        erros.push({
            texto: "Slug inválido",
        });
    }

    if (erros.length > 0) {
        // Blug aqui
        req.flash("erro_msg", "Erro ao editar a categoria!");
        res.redirect("/admin/categorias");
    } else {
        Categoria.findOne({ _id: req.body.id })
            .then((categoria) => {
                categoria.nome = req.body.nome;
                categoria.slug = req.body.slug;

                categoria
                    .save()
                    .then(() => {
                        req.flash(
                            "success_msg",
                            "Categoria editada com sucesso!"
                        );
                        res.redirect("/admin/categorias");
                    })
                    .catch((err) => {
                        req.flash("error_msg", "Erro ao salvar a categiria!");
                        res.redirect("/admin/categorias");
                    });
            })
            .catch((err) => {
                req.flash("erro_msg", "Erro ao editar a categoria!");
                res.redirect("/admin/categorias");
            });
    }
});

/**
 * -------------------------------------
 * Rota responsável por deletar categias
 * -------------------------------------
 */
router.post("/categorias/deletar", (req, res) => {
    Categoria.remove({ _id: req.body.id })
        .then(() => {
            req.flash("success_msg", "Categoria deletada com sucesso!");
            res.redirect("/admin/categorias");
        })
        .catch((err) => {
            req.flash("error_msg", "Erro aao deletar a categoria!");
            res.redirect("/admin/categorias");
        });
});

/**
 * ---------------------------------------------------
 * Rota responsável por renderizar a view de postagens
 * ---------------------------------------------------
 */
router.get("/postagens", (req, res) => {
    Postagem.find()
        .lean()
        .populate("categoria")
        .sort({ date: "desc" })
        .then((postagens) => {
            res.render("admin/postagens", { postagens: postagens });
        })
        .catch((err) => {
            req.flash("error_msg", "Erro ao listar as categorias");
            res.redirect("/admin");
        });
});

/**
 * -------------------------------------------------------------
 * Rota responsável por renderizar a view de adição de postagens
 * -------------------------------------------------------------
 */
router.get("/postagens/add", (req, res) => {
    Categoria.find()
        .lean()
        .then((categorias) => {
            res.render("admin/addpostagens", { categorias: categorias });
        })
        .catch((err) => {
            req.flash("error_msg", "Erro ao carregar o formulário!");
            res.redirect("/admin");
        });
});

/**
 * ------------------------------------------------
 * Rota responsável por adicionar uma nova postagem
 * ------------------------------------------------
 */
router.post("/postagens/nova", (req, res) => {
    const erros = [];
    //Validação aqui
    if (req.body.categoria == "0") {
        erros.push({
            texto: "Categoria inválida, por favor registre uma categoria!",
        });
        res.render("admin/addpostagens", { erros: erros });
    }

    if (erros.length > 0) {
        res.render("admin/postagens", { erros: erros });
    } else {
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            categoria: req.body.categoria,
            conteudo: req.body.conteudo,
        };

        new Postagem(novaPostagem)
            .save()
            .then(() => {
                req.flash("success_msg", "Postagem criada com sucessso!");
                res.redirect("/admin/postagens");
            })
            .catch((err) => {
                req.flash("error_msg", "Erro ao salvar postagem!");
                res.redirect("/admin/postagens");
            });
    }
});

/**
 * ------------------------------------------------------------
 * Rota responsável por rederizar a view de edição de postagens
 * ------------------------------------------------------------
 */
router.get("/postagens/edit/:id", (req, res) => {
    Postagem.findOne({ _id: req.params.id })
        .lean()
        .then((postagem) => {
            Categoria.find()
                .lean()
                .then((categorias) => {
                    res.render("admin/editPostagens", {
                        categorias: categorias,
                        postagem: postagem,
                    });
                })
                .catch((err) => {
                    req.flash("error_msg", "Erro ao listar as categorias!");
                    res.redirect("/admin/postagens");
                });
        })
        .catch((err) => {
            req.flash("error_msg", "Erro ao carregar formulário de edição");
            res.redirect("admin/postagens");
        });
});

/**
 * ----------------------------------------------------------------------------------
 * Rota responsável pela percistência de dados edidados na view de edição de postagem
 * ----------------------------------------------------------------------------------
 */
router.post("/postagens/edit", (req, res) => {
    Postagem.findOne({ _id: req.body.id })
        .then((postagem) => {
            postagem.titulo = req.body.titulo;
            postagem.slug = req.body.slug;
            postagem.descricao = req.body.descricao;
            postagem.categoria = req.body.categoria;
            postagem.conteudo = req.body.conteudo;

            postagem
                .save()
                .then(() => {
                    req.flash("success_msg", "Postagem editada com scesso!");
                    res.redirect("/admin/postagens");
                })
                .catch((err) => {
                    req.flash("error_msg", "Erro interno!");
                    res.redirect("/admin/postagens");
                });
        })
        .catch((err) => {
            req.flash("error_msg", "Erro ao salvar a edição!");
            res.redirect("/admin/postagens");
        });
});

module.exports = router;
