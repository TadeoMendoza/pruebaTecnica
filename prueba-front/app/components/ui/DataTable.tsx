'use client'

import { apiClient } from "@/app/server/api"
import { useState, useEffect, useCallback } from "react";
import { UpdateStatus } from "@/app/components/UpdateStatus";
export function DataTable() {
    const [pageFilter, setPageFilter] = useState(1);
    const [limitFilter, setLimitFilter] = useState(10);
    const [statusFilter, setStatusFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const statuses = ['PENDING', 'APPROVED', 'REJECTED'];
    const [selectedRow, setSelectedRow] = useState<{ id: number; status: string } | null>(null);
    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: pageFilter.toString(),
                limit: limitFilter.toString(),
                ...(statusFilter && { status: statusFilter }),
            });

            const res = await apiClient(`/solicitudes?${queryParams.toString()}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            setData(res.data);
        } catch (error) {
            console.error("🚀 ~ getData ~ error:", error);
        } finally {
            setLoading(false);
        }
    }, [pageFilter, limitFilter, statusFilter]);

    useEffect(() => {
        getData();
    }, [getData]);

    const results = data?.results || [];
    const totalPages = data?.pages || 1;
    return (
        <div className="w-full h-dvh max-w-7xl mx-auto p-10 bg-white/40 backdrop-blur-xs border border-white/20 rounded-2xl shadow-xl overflow-x-auto">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Solicitudes</h2>
                <div className="flex gap-5 ">
                    <button onClick={() => getData()} className="cursor-pointer transition-transform duration-300 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-reload">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
                            <path d="M20 4v5h-5" />
                        </svg>
                    </button>
                    <select

                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setPageFilter(1) }}
                        className=" p-2 mb-4 text-black rounded bg-white"
                    >
                        <option value="">Todos</option>
                        {statuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    <div>
                        <button onClick={() => setPageFilter(pageFilter - 1)} disabled={pageFilter === 1} className="cursor-pointer transition-transform duration-300 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
                        </button>
                        <span>{pageFilter}</span>
                        <button onClick={() => setPageFilter(pageFilter + 1)} disabled={pageFilter === (totalPages || 1)} className="cursor-pointer transition-transform duration-300 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 18l6-6l-6-6" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Monto</th>
                        <th>Meses</th>
                        <th>Pago Mensual</th>
                        <th>Estado</th>
                        <th>Fecha de Creación</th>
                        <th>Fecha de Actualización</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {results && results.length > 0 ? (
                        results.map((item: any, index: number) => (
                            <tr key={index}>
                                <td>{(item.name).slice(0, 10)}...</td>
                                <td>{(item.lastname).slice(0, 10)}...</td>
                                <td>{item.dni}</td>
                                <td>{(item.email).slice(0, 10)}...</td>
                                <td>{item.phone}</td>
                                <td>{item.amount}</td>
                                <td>{item.months}</td>
                                <td>{item.monthlyPayment}</td>
                                <td>{item.status}
                                    <button
                                        type="button"
                                        onClick={() => setSelectedRow({ id: item.id, status: item.status })}
                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td>{new Date(item.createdAt).toLocaleString()}</td>
                                <td>{new Date(item.updatedAt).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={11} className="text-center">
                                No hay datos disponibles
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <UpdateStatus
                isOpen={Boolean(selectedRow)}
                id={selectedRow?.id ?? null}
                currentStatus={selectedRow?.status ?? ''}
                onClose={() => setSelectedRow(null)}
                onSuccess={() => {
                    getData();
                }}
            />
        </div >
    )
}
