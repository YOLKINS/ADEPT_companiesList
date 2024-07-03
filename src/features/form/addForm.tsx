import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addCompany } from '../../redux/store/store';
import styles from '../../styles/addForm.module.css';

type FormData = {
    name: string;
    address: string;
};

const AddCompanyForm: React.FC = () => {

  const { register, handleSubmit, reset } = useForm<FormData>();
  const dispatch = useDispatch();
  const companyNameInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (data: FormData) => {
    dispatch(addCompany(data));
    reset();
  };

  useEffect(()=>{   
    if (companyNameInputRef.current) {
        companyNameInputRef.current.focus();
      }
  },[])

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register('name', { required: true })} 
        placeholder="Название компании"
        autoFocus 
      />
      <input 
        {...register('address', { required: true })} 
        placeholder="Адрес" 
      />
      <button type="submit">Добавить компанию</button>
    </form>
  );
};

export default AddCompanyForm;