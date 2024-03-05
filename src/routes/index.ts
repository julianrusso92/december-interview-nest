import { Router } from 'express';

import authRoute from './auth.router';
import transactionsRoute from './transactions.route';
import transferRoute from './transfers.route';

const apiRoutes = Router();

apiRoutes.use('/auth', authRoute);
apiRoutes.use('/transactions', transactionsRoute);
apiRoutes.use('/transfer', transferRoute);

export default apiRoutes;