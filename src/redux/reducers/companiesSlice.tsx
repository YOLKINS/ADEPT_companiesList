import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company, CompaniesState } from './types';
import { v4 as id } from 'uuid';
import generateFakeCompanies from './generationCompanies';

const initialCompanies = generateFakeCompanies(1000);

const initialState: CompaniesState = {
  companies: initialCompanies,
  selectedCompanyIds: [],
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<Omit<Company, 'id'>>) => {
      const newCompany: Company = { ...action.payload, id: id() };
      state.companies.push(newCompany);
    },
    updateCompany: (state, action: PayloadAction<Company>) => {
      const index = state.companies.findIndex(company => company.id === action.payload.id);
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
    },
    removeCompanies: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter(company => company.id !== action.payload);
    },
    selectCompany: (state, action: PayloadAction<string>) => {
      if (!state.selectedCompanyIds.includes(action.payload)) {
        state.selectedCompanyIds.push(action.payload);
      }
    },
    deselectCompany: (state, action: PayloadAction<string>) => {
      state.selectedCompanyIds = state.selectedCompanyIds.filter(id => id !== action.payload);
    },
    selectAllCompanies: (state) => {
      state.selectedCompanyIds = state.companies.map(company => company.id);
    },
    deselectAllCompanies: (state) => {
      state.selectedCompanyIds = [];
    },    
  },
});

export const {
  addCompany,
  updateCompany,
  removeCompanies,
  selectCompany,
  selectAllCompanies,
  deselectCompany,
  deselectAllCompanies,
} = companiesSlice.actions;
export default companiesSlice.reducer;