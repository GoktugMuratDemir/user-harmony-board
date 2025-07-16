import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import type { User } from '../types/types';


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

interface AddUserModalProps {
  onClose: () => void;
  onAddUser: (user: User) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
    active: true
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      password: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Ad zorunludur';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email zorunludur';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi girin';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Şifre zorunludur';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const newUser: User = {
        id: uuidv4(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        createdAt: new Date(),
        password: formData.password,
        active: formData.active,
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180
      };
      onAddUser(newUser);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Yeni Kullanıcı Ekle</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Ad</Label>
            <Input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <Error>{errors.name}</Error>}
          </FormGroup>
          
          <FormGroup>
            <Label>Email</Label>
            <Input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <Error>{errors.email}</Error>}
          </FormGroup>
          
          <FormGroup>
            <Label>Şifre</Label>
            <Input 
              type="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <Error>{errors.password}</Error>}
          </FormGroup>
          
          <FormGroup>
            <Label>Rol</Label>
            <Select 
              name="role" 
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>
              <input 
                type="checkbox" 
                name="active" 
                checked={formData.active}
                onChange={handleChange}
              />
              Aktif
            </Label>
          </FormGroup>
          
          <ButtonGroup>
            <button type="button" onClick={onClose}>İptal</button>
            <button type="submit">Kaydet</button>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddUserModal;