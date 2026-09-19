import { apiClient } from "@/app/server/api"

export async function DataTable() {

    const getData = async () => {
        try {
            const res = await apiClient('/solicitudes', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            console.log("🚀 ~ getData ~ res:", res)
            return res;
        } catch (error) {
            console.error("🚀 ~ getData ~ error:", error)
            return null;
        }
    }
    const data = await getData();
    const pages = data?.pages;
    console.log("🚀 ~ DataTable ~ pages:", pages)
    const results = data?.results;
    console.log("🚀 ~ DataTable ~ results:", results)
    const total = data?.total;
    console.log("🚀 ~ DataTable ~ total:", total)
    return (
        <div className="w-full max-w-7xl mx-auto p-10 bg-white/40 backdrop-blur-xs border border-white/20 rounded-2xl shadow-xl overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Solicitudes</h2>
            <table className="w-full">
                <caption>Lista de usuarios</caption>
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
                                <td>{item.status}</td>
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
        </div>
    )
}
