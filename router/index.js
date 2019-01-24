import token from './token'
import user from './user'

export default app => {
  // app.use('/api', token);
  app.use('/api', user);
}
