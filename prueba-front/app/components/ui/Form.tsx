'use client';
import { apiClient } from '@/app/server/api';
import { time } from 'console';
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
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const availableMonths = [6, 12, 18, 24];
  const [sucessMessage, setSuccessMessage] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessages([]);
    const payload = {
      ...formData,
      amount: Number(formData.amount),
      months: Number(formData.months),
    };
    try {
      setSubmitLoading(true);
      const res = await apiClient<any>('/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: payload,
      });

      if (res.message) {
        setSubmitLoading(false);
        setSuccessMessage(res.message + ' ' + 'Debe pagar: S/ ' + res.request.monthlyPayment);
        setTimeout(() => {
          setSuccessMessage('');
          setFormData(INITIAL_FORM);
        }, 2000);
      }
    } catch (err: any) {
      const status = err?.response?.status;
      const errorData = err?.response?.data;
      setSubmitLoading(false);

      switch (status) {
        case 400:
          setErrorMessages(errorData?.message || ['Error en la solicitud']);

      }
    } finally {
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-7xl mx-auto p-10 bg-white/40 backdrop-blur-xs border border-white/20 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#191919]">Bienvenido, Ingrese sus datos</h1>
      {errorMessages.length > 0 && (
        <div className="flex flex-col gap-1 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-4 text-sm">
          <p className="font-semibold">Por favor corrige los siguientes errores:</p>
          <ul className="list-disc list-inside space-y-1">
            {errorMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
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
        <select name="months" value={formData.months} onChange={handleChange} className="w-full p-2 mb-4 text-black rounded bg-white">
          {availableMonths.map((month) => (
            <option key={month} value={month}>
              {month} meses
            </option>
          ))}
        </select>
      </div>
      <button
        disabled={submitLoading || Boolean(sucessMessage)}
        type="submit"
        className="w-full p-2 mb-4 text-white rounded bg-[#191919] hover:bg-[#333333] transition-colors duration-300 cursor-pointer"
      >
        {submitLoading ? (
          <p className="animate-pulse">Enviando...</p>
        ) : (
          'Enviar'
        )}
      </button>
      {submitLoading}
      {sucessMessage && submitLoading == false && (
        <div className="flex flex-col gap-1 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg mb-4 text-sm">
          <p className="font-semibold">{sucessMessage}</p>
        </div>
      )}
    </form>
  )
}


