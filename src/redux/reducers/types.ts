export interface Company {
    id: string;
    name: string;
    address: string;
}
  
export interface CompaniesState {
    companies: Company[];
    selectedCompanyIds: string[];
}