import 'babel-polyfill';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';
import { cognitoApi as Account } from './lib';

export { Logout, PrivateRoute, Account };
