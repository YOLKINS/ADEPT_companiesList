import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from '../reducers/companiesSlice';
import {
  addCompany,
  updateCompany,
  removeCompanies,
  selectCompany,
  selectAllCompanies,
  deselectCompany,
  deselectAllCompanies,
} from '../reducers/companiesSlice'

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  addCompany,
  updateCompany,
  removeCompanies,
  selectCompany,
  selectAllCompanies,
  deselectCompany,
  deselectAllCompanies,
}