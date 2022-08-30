import express, { Request, Response } from 'express';
import moment from 'moment';
import slugify from 'slugify';

import { Constantes } from '../src/enums/constantes';
import { Partials } from '../src/enums/partials';
import { Views } from '../src/enums/views';
import { Categoria } from './Categoria';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const categorias = await Categoria.findAll({ raw: true });

  res.render(Views.INDEX, {
    pagina: Partials.LISTAR_CATEGORIAS,
    categorias,
    moment,
    dataHora: Constantes.PATTERN_DATA_HORA,
  });
});

router.get('/admin/criar', (req: Request, res: Response) => {
  res.render(Views.INDEX, {
    pagina: Partials.CRIAR_CATEGORIA,
    categoria: null,
  });
});

router.post(
  '/admin/categoria-criada',
  async (req: Request<{}, {}, Categoria>, res: Response) => {
    console.table(req.body);
    const { id, titulo, descricao } = req.body;

    if (titulo && descricao) {
      await Categoria.upsert({
        id,
        titulo,
        descricao,
        slug: slugify(titulo, { lower: true }),
      });
    }

    res.redirect('/categorias');
  }
);

router.post(
  '/admin/remover',
  async (req: Request<{}, {}, { id: string }>, res: Response) => {
    const id = req.body.id;

    console.log('id categoria a remover:', id);

    if (id) {
      await Categoria.destroy({
        where: {
          id,
        },
      });
    }

    res.redirect('/categorias');
  }
);

router.get(
  '/admin/editar/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      res.redirect('/categorias');
    }

    res.render(Views.INDEX, {
      pagina: Partials.CRIAR_CATEGORIA,
      categoria,
    });
  }
);

module.exports = router;
