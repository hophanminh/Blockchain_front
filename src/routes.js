import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Block from './pages/Block';
import Blocks from './pages/Blocks';
import Transaction from './pages/Transaction';
import Transactions from './pages/Transactions';
import Wallets from './pages/Wallets';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'block/:id', element: <Block /> },
      { path: 'transaction/:id', element: <Transaction /> },
      { path: 'wallets', element: <Wallets /> },
      { path: '', element: <Dashboard /> },
      { path: '*', element: <NotFound /> },
      { path: 'transactions', element: <Transactions /> },
      { path: 'blocks', element: <Blocks /> },

    ]
  },
];

export default routes;
