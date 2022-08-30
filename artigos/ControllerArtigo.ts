import { Categoria } from './../categorias/Categoria';
import express, { Request, Response } from 'express';
import moment from 'moment';
import slugify from 'slugify';

import { Constantes } from '../src/enums/constantes';
import { Partials } from '../src/enums/partials';
import { Views } from '../src/enums/views';
import { Artigo } from './Artigo';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const artigos = await Artigo.findAll({
    raw: true,
    include: { association: Artigo.JOIN_CATEGORIA },
    nest: true
  });

  res.render(Views.INDEX, {
    pagina: Partials.LISTAR_ARTIGO,
    artigos,
    moment,
    dataHora: Constantes.PATTERN_DATA_HORA,
  });
});

router.get('/admin/criar', async (req: Request, res: Response) => {
  const categorias = await Categoria.findAll({ raw: true });

  res.render(Views.INDEX, {
    pagina: Partials.CRIAR_ARTIGO,
    categorias,
    artigo: null,
  });
});

router.post(
  '/admin/artigo-criado',
  async (req: Request<{}, {}, Artigo>, res: Response) => {
    console.table(req.body);
    const { id, titulo, corpo, idCategoria } = req.body;

    const categoria = await Categoria.findByPk(idCategoria);

    if (titulo && corpo && idCategoria && categoria) {
      await Artigo.upsert({
        id,
        titulo,
        corpo,
        idCategoria,
        slug: slugify(titulo, { lower: true }),
      });
    }

    res.redirect('/artigos');
  }
);

router.post(
  '/admin/remover',
  async (req: Request<{}, {}, { id: string }>, res: Response) => {
    const id = req.body.id;

    console.log('id artigo a remover:', id);

    if (id) {
      await Artigo.destroy({
        where: {
          id,
        },
      });
    }

    res.redirect('/artigos');
  }
);

router.get(
  '/admin/editar/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    const artigo = await Artigo.findByPk(req.params.id);

    if (!artigo) {
      res.redirect('/artigos');
    }

    const categorias = await Categoria.findAll({ raw: true });

    res.render(Views.INDEX, {
      pagina: Partials.CRIAR_ARTIGO,
      categorias,
      artigo,
    });
  }
);

module.exports = router;
