import { Artigo } from './artigos/Artigo';
import { Categoria } from './categorias/Categoria';
import { Partials } from './src/enums/partials';
import { Views } from './src/enums/views';
import { BodyParser } from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { Sequelize } from 'sequelize/types';

//------------CONFIG------------

const port = 9336;
const app: Express = express();
const bodyParser: BodyParser = require('body-parser');
const sqlize: Sequelize = require('../config/db/db-config'); // tomar cuidado com imports locais quando usado typescript com outDir

const models = [
  Categoria,
  Artigo
];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
sqlize
  .authenticate()
  .then(() => console.table(sqlize.config))
  .catch((error) => console.error(error));

const controllerCategoria = require('./categorias/ControllerCategoria');
app.use('/categorias', controllerCategoria);

const controllerArtigo = require('./artigos/ControllerArtigo');
app.use('/artigos', controllerArtigo);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

app.get('/status', (req: Request, res: Response) => {
  res.send('UP');
});

//------------CONFIG------------

app.get('/', (req: Request, res: Response) => {

  res.render(Views.INDEX, {
    pagina: Partials.HOME,
  });
});
