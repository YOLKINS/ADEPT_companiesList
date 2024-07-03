// src/features/companies/CompanyRow.tsx
import React, { useState } from 'react';
import { Company } from '../../redux/reducers/types';
import styles from '../../styles/row.module.css';

interface CompanyRowProps {
    company: Company;
    isSelected: boolean;
    onSelect: () => void;
    onDeselect: () => void;
  }
  
  const CompanyRow: React.FC<CompanyRowProps> = ({ company, isSelected, onSelect, onDeselect }) => {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        onSelect();
      } else {
        onDeselect();
      }
    };
  
    return (
      <tr className={isSelected ? styles.selectedRow : ''}>
        <td>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
          />
        </td>
        <td contentEditable suppressContentEditableWarning>{company.name}</td>
        <td contentEditable suppressContentEditableWarning>{company.address}</td>
      </tr>
    );
  };
  
  export default CompanyRow;