import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './middleware/logger';
import withAuthentication from './middleware/withAuthentication';
import withAdminPermissions from './middleware/withAdminPermissions';
import getUsersRoutes from './routes/users';

import getLocationsRoutes from './routes/locations'
import getAuthRoutes from './routes/auth';
 import db from './db';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(withAuthentication);
app.use(withAdminPermissions);
app.use(logger);

getUsersRoutes(app);

getAuthRoutes(app);
getLocationsRoutes(app)
const port = process.env.PORT;

app.get('/test', (req, res) => {
    res.send('works');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});