import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { removeCompanies, selectAllCompanies, deselectAllCompanies, selectCompany, deselectCompany } from '../../redux/store/store'; 
import CompanyRow from './row';
import styles from '../../styles/companies.module.css';

const CompanyTable: React.FC = () => {
  const companies = useSelector((state: RootState) => state.companies.companies);
  const selectedCompanyIds = useSelector((state: RootState) => state.companies.selectedCompanyIds);
  const dispatch = useDispatch();

  const [visibleCompanies, setVisibleCompanies] = useState(companies.slice(0, 20));

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(selectAllCompanies());
    } else {
      dispatch(deselectAllCompanies());
    }
  };

  const handleDeleteSelected = () => {
    selectedCompanyIds.forEach(id => {
      dispatch(removeCompanies(id));
    });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (bottom) {
      const nextBatch = companies.slice(visibleCompanies.length, visibleCompanies.length + 20);
      setVisibleCompanies(prev => [...prev, ...nextBatch]);
    }
  };

  useEffect(() => {
    setVisibleCompanies(companies.slice(0, 20));
  }, [companies]);

  return (
    <div className={styles.tableContainer} onScroll={handleScroll}>
      <button onClick={handleDeleteSelected}>Удалить выбранные</button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={companies.length > 0 && selectedCompanyIds.length === companies.length}
              />
            </th>
            <th>Название компании</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {visibleCompanies.map(company => (
            <CompanyRow
              key={company.id}
              company={company}
              isSelected={selectedCompanyIds.includes(company.id)}
              onSelect={() => dispatch(selectCompany(company.id))}
              onDeselect={() => dispatch(deselectCompany(company.id))}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;