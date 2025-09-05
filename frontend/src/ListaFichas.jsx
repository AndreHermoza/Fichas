import { useState, useEffect } from "react";
import { getFicha, deleteFicha } from "./services/api"; 

function ListaFichas({ tipo, actualizar }) {
  const [fichas, setFichas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarFichas();
  }, [actualizar, tipo]);

  const cargarFichas = async () => {
    try {
      const res = await getFicha();
      const filtradas = res.data.filter(f => f.tipo === tipo);
      setFichas(filtradas);
      setMensaje("");
    } catch (error) {
      setMensaje("❌ Error al cargar las fichas.");
    }
  };

  const fichasFiltradas = fichas.filter(ficha => {
    if (!busqueda) return true;
    if (ficha.tipo === 'libro') {
      return `${ficha.nombre_autor} ${ficha.apellido_autor}`.toLowerCase().includes(busqueda.toLowerCase());
    }
    if (ficha.tipo === 'video') {
      return ficha.tema.toLowerCase().includes(busqueda.toLowerCase());
    }
    return false;
  });

  const eliminarFicha = async (id) => {
    try {
      await deleteFicha(id);
      setMensaje("🗑️ Ficha eliminada.");
      setTimeout(() => setMensaje(""), 3000);
      cargarFichas();
    } catch (error) {
      setMensaje("❌ Error al eliminar la ficha.");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Fichas guardadas:</h2>
      <input
        type="text"
        placeholder={tipo === 'libro' ? "Buscar por autor..." : "Buscar por tema..."}
        className="border p-2 w-full mb-4"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      {mensaje && (
        <p className={`text-sm mb-2 ${mensaje.includes("❌") ? "text-red-600" : "text-green-600"}`}>
          {mensaje}
        </p>
      )}
      <ul className="space-y-2">
        {fichasFiltradas.map(f => (
          <li key={f.id} className="border p-3 rounded bg-gray-50 flex justify-between items-center">
            <div>
              <strong>{f.tipo.toUpperCase()}:</strong>{" "}
              {f.nombre || `${f.nombre_autor} ${f.apellido_autor}`} ({f.anio})
            </div>
            <div className="space-x-2">
              <button
                onClick={() => eliminarFicha(f.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaFichas;
