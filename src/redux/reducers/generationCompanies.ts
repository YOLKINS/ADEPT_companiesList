import { v4 as uuidv4 } from 'uuid';
import { Company } from './types';

const generateFakeCompanies = (num: number): Company[] => {
  const companies: Company[] = [];
  for (let i = 0; i < num; i++) {
    companies.push({
      id: uuidv4(),
      name: `Company ${i + 1}`,
      address: `Address ${i + 1}`,
    });
  }
  return companies;
};

export default generateFakeCompanies