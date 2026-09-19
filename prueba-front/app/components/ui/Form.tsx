'use client';
import { apiClient } from '@/app/server/api';
import React, { useState } from 'react';

export function Form() {
    
interface FormState {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  dni: string;
  amount: number;
  months: number;
}
const INITIAL_FORM: FormState = {
  name: '',
  lastname: '',
  email: '',
  phone: '',
  dni: '',
  amount: 0,
  months: 6,
};
const [formData, setFormData] = useState<FormState>(INITIAL_FORM);

const validate = (): string | null => {
    const { name, lastname, email, phone, dni, amount, months } = formData;
    if (!name || !lastname || !email || !phone || !dni || !amount || !months) {
      return 'Por favor, complete todos los campos.';
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name) || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(lastname)) {
      return 'El nombre y apellido deben contener solo letras.';
    }

    if (name.length > 50 || lastname.length > 50) {
      return 'El nombre y apellido no deben exceder los 50 caracteres.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Por favor, ingrese un correo electrónico válido.';
    }

    if (!/^9\d{8}$/.test(phone)) {
      return 'El teléfono debe empezar con 9 y tener 9 dígitos numéricos.';
    }

    if (!/^\d{8}$/.test(dni)) {
      return 'El DNI debe contener exactamente 8 dígitos numéricos.';
    }

    const parsedAmount = amount;
    if (isNaN(parsedAmount) || parsedAmount < 1000 || parsedAmount > 10000) {
      return 'El monto debe estar entre 1000 y 10000.';
    }

    if (![6, 12, 18, 24].includes(Number(months))) {      
        return 'Los meses permitidos son únicamente 6, 12, 18 o 24.';
    }

    return null;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const validationError = validate();
    if (validationError) {
      alert(validationError);
      return;
    }
    const payload = {
        ...formData,
        amount: Number(formData.amount),
        months: Number(formData.months),
    };
    try {
      const res = await apiClient('/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: payload,
      });
      console.log("🚀 ~ handleSubmit ~ res:", res)

      if ( res && res.message){
          alert('¡Solicitud enviada con éxito!');

      }
    } catch (err) {
      alert('Ocurrió un error al enviar la solicitud.');
    } finally {
    }
  };

  return(
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-10 bg-white/40 backdrop-blur-xs border border-white/20 rounded-2xl shadow-xl">   
        <h1 className="text-3xl font-bold mb-6 text-center text-[#191919]">Bienvenido, Ingrese sus datos</h1>     
        <div className="flex gap-2 md:flex-row flex-col">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" className="w-full p-2 mb-4 text-black rounded bg-white" />
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Apellido" className="w-full p-2 mb-4 text-black rounded bg-white" />
        </div>
        <div className="flex gap-2 md:flex-row flex-col">
            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Correo Electrónico" className="w-full p-2 mb-4 text-black rounded bg-white" />
            <input type="number" name="phone" value={formData.phone} onChange={handleChange} placeholder="Número de Teléfono" className="w-full p-2 mb-4 text-black rounded bg-white" />
        </div>
        <div className="flex gap-2 md:flex-row flex-col">
            <input type="number" name="dni" value={formData.dni} onChange={handleChange} placeholder="DNI" className="w-full p-2 mb-4 text-black rounded bg-white" />
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Monto" className="w-full p-2 mb-4 text-black rounded bg-white" />
        </div>
        <div className="flex gap-2 md:flex-row flex-col">
            <input type="number" name="months" value={formData.months} onChange={handleChange} placeholder="Meses" className="w-full p-2 mb-4 text-black rounded bg-white" />
        </div>
        <button 
            type="submit" 
            className="w-full p-2 mb-4 text-white rounded bg-[#191919] hover:bg-[#333333] transition-colors duration-300 cursor-pointer"
            >
            Enviar
        </button>
    </form>
  )
}

