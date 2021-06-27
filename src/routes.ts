import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUserReceiverComlimentsController } from './controllers/ListUserReceiverComplimentsController';
import { ListUsersController } from './controllers/ListUsersController';
import { ListUserSenderComlimentsController } from './controllers/ListUserSenderComplimentsController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSenderComplimentsController =
  new ListUserSenderComlimentsController();
const listUserReceiverComplimentsController =
  new ListUserReceiverComlimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post('/users', createUserController.handle);
router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle,
);
router.post('/login', authenticateUserController.handle);
router.post(
  '/compliments',
  ensureAuthenticated,
  createComplimentController.handle,
);
router.get(
  '/users/compliments/send',
  ensureAuthenticated,
  listUserSenderComplimentsController.handle,
);
router.get(
  '/users/compliments/receive',
  ensureAuthenticated,
  listUserReceiverComplimentsController.handle,
);
router.get('/tags', ensureAuthenticated, listTagsController.handle);
router.get('/users', ensureAuthenticated, listUsersController.handle);

export { router };
