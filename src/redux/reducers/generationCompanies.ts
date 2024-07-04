import { v4 as id } from 'uuid';
import { Company } from './types';

const generateFakeCompanies = (num: number): Company[] => {
  const companies: Company[] = [];
  for (let i = 0; i < num; i++) {
    companies.push({
      id: id(),
      name: `Company ${i + 1}`,
      address: `Address ${i + 1}`,
    });
  }
  return companies;
};

export default generateFakeCompanies
