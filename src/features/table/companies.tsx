import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { removeCompanies, selectAllCompanies, deselectAllCompanies, selectCompany, deselectCompany } from '../../redux/store/store'; 
import { Company } from '../../redux/reducers/types';
import CompanyRow from './row';
import styles from '../../styles/companies.module.css';

const CompanyTable: React.FC = () => {

  const dispatch = useDispatch();

  const companies = useSelector((state: RootState) => state.companies.companies);
  const selectedCompanyIds = useSelector((state: RootState) => state.companies.selectedCompanyIds);

  const [visibleCompanies, setVisibleCompanies] = useState<Company[]>([]);

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

  const loadMoreCompanies = useCallback(() => {
    setVisibleCompanies(prev => {
      const nextBatch = companies.slice(prev.length, prev.length + 20);
      return [...prev, ...nextBatch];
    });
  }, [companies]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const bottom = Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - e.currentTarget.clientHeight) < 1;
    if (bottom) {
      loadMoreCompanies();
    }
  }, []);

  useEffect(() => {
    setVisibleCompanies(companies.slice(0, 20));
  }, [companies]);

  return (
    <>
    <div className={styles.tableContainer} onScroll={handleScroll}>
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
    {visibleCompanies.length === 0 ? '' : <button className={styles.button} onClick={handleDeleteSelected}>Удалить выбранные</button>}
    </>
  );
};

export default CompanyTable;