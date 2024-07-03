import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import CompanyTable from './features/table/companies';
import AddCompanyForm from './features/form/addForm';
import styles from './styles/App.module.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <h1>Список компаний</h1>
        <AddCompanyForm />
        <CompanyTable />
      </div>
    </Provider>
  );
};

export default App;
