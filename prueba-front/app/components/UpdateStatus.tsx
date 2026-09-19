'use client';

import { apiClient } from "@/app/server/api";
import { useState, useEffect } from "react";

interface UpdateStatusProps {
    isOpen: boolean;
    id: number | null;
    currentStatus: string;
    onClose: () => void;
    onSuccess: () => void;
}

export function UpdateStatus({
    isOpen,
    id,
    currentStatus,
    onClose,
    onSuccess,
}: UpdateStatusProps) {
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Sincronizar el select cada vez que se abre con un registro diferente
    useEffect(() => {
        setSelectedStatus(currentStatus);
        setError(null);
    }, [currentStatus, isOpen]);

    if (!isOpen || !id) return null;

    const handleUpdate = async () => {
        setLoading(true);
        setError(null);
        try {

            const response = await apiClient<any>(`/solicitudes/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                data: { status: selectedStatus },
            });

            console.log(response)
            if (response.message) {
                setSuccessMessage('Actualizado con exito')
                setTimeout(() => {
                    setSuccessMessage('')
                    onSuccess();
                    onClose();
                }, 2000);
            }
        } catch (err: any) {
            setError(err?.message || 'Error al actualizar el estado');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Actualizar Estado</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Modificando el estado de la solicitud ID: <span className="font-semibold">{id}</span>
                </p>

                {error && (
                    <div className="mb-4 p-2 text-sm text-red-700 bg-red-100 rounded">
                        {error}
                    </div>
                )}

                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nuevo Estado
                </label>
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-6 text-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                    <option value="PENDING">PENDIENTE</option>
                    <option value="APPROVED">APROBADO</option>
                    <option value="REJECTED">RECHAZADO</option>
                </select>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleUpdate}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-neutral-800 rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
                {successMessage && (
                    <div className="mt-4 p-2 text-sm text-green-700 bg-green-100 rounded">
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    );
}