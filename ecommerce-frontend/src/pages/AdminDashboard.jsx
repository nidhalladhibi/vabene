import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    model: "",
    year: "",
    km: "",
    price: "",
    image: null, // رفع الصور
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ✅ التحقق من صلاحيات الأدمن
  useEffect(() => {
    if (user.role !== "admin") {
      window.location.href = "/";
      return;
    }
    fetchCars();
  }, []);

  // جلب كل السيارات
  const fetchCars = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/cars", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(response.data);
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  // التعامل مع إدخال البيانات
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // لو input file ناخذ أول صورة
    });
  };

  // ✅ إضافة/تعديل سيارة
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      data.append("model", formData.model);
      data.append("year", formData.year);
      data.append("km", formData.km);
      data.append("price", formData.price);
      if (formData.image) data.append("image", formData.image);

      if (editingCar) {
        // تعديل سيارة
        await axios.post(
          `http://127.0.0.1:8000/api/cars/${editingCar.id}?_method=PUT`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSuccess("🚗 Voiture mise à jour avec succès !");
      } else {
        // إضافة سيارة
        await axios.post("http://127.0.0.1:8000/api/cars", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setSuccess("🚗 Voiture ajoutée avec succès !");
      }

      fetchCars();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'opération");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setFormData({
      model: car.model,
      year: car.year,
      km: car.km,
      price: car.price,
      image: null, // لازم نرفع صورة جديدة
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette voiture ?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("🚗 Voiture supprimée avec succès !");
      fetchCars();
    } catch (err) {
      setError("Erreur lors de la suppression");
    }
  };

  const openAddModal = () => {
    setEditingCar(null);
    setFormData({
      model: "",
      year: "",
      km: "",
      price: "",
      image: null,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCar(null);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (user.role !== "admin") {
    return null;
  }

  return (
    <div className="container-fluid" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <div className="bg-primary text-white py-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <h2 className="mb-0">🚗 Admin Dashboard - AutoVista</h2>
            <small>Bienvenue, {user.name}</small>
          </div>
          <button onClick={handleLogout} className="btn btn-light">
            Déconnexion
          </button>
        </div>
      </div>

      <div className="container">
        {/* Messages */}
        {success && (
          <div className="alert alert-success alert-dismissible fade show">
            {success}
            <button type="button" className="btn-close" onClick={() => setSuccess("")}></button>
          </div>
        )}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show">
            {error}
            <button type="button" className="btn-close" onClick={() => setError("")}></button>
          </div>
        )}

        {/* Ajouter */}
        <div className="mb-4">
          <button onClick={openAddModal} className="btn btn-success btn-lg">
            ➕ Ajouter une voiture
          </button>
        </div>

        {/* Tableau */}
        <div className="card shadow">
          <div className="card-header bg-white">
            <h4 className="mb-0">Liste des voitures ({cars.length})</h4>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Modèle</th>
                    <th>Année</th>
                    <th>Kilométrage</th>
                    <th>Prix</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id}>
                      <td>
                        {car.image && (
                          <img
                            src={`http://127.0.0.1:8000/storage/${car.image}`}
                            alt={car.model}
                            style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                          />
                        )}
                      </td>
                      <td className="fw-bold">{car.model}</td>
                      <td>{car.year}</td>
                      <td>{car.km?.toLocaleString()} km</td>
                      <td className="text-success fw-bold">{car.price?.toLocaleString()} €</td>
                      <td>
                        <button onClick={() => handleEdit(car)} className="btn btn-sm btn-primary me-2">
                          ✏️ Modifier
                        </button>
                        <button onClick={() => handleDelete(car.id)} className="btn btn-sm btn-danger">
                          🗑️ Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                  {cars.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center text-muted p-3">
                        Aucune voiture disponible
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Ajouter/Modifier */}
      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingCar ? "Modifier la voiture" : "Ajouter une voiture"}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Modèle *</label>
                    <input type="text" className="form-control" name="model" value={formData.model} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Année *</label>
                    <input type="number" className="form-control" name="year" value={formData.year} onChange={handleInputChange} min="1990" max={new Date().getFullYear() + 1} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Kilométrage (km) *</label>
                    <input type="number" className="form-control" name="km" value={formData.km} onChange={handleInputChange} min="0" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Prix (€) *</label>
                    <input type="number" className="form-control" name="price" value={formData.price} onChange={handleInputChange} min="0" step="0.01" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image *</label>
                    <input type="file" className="form-control" name="image" onChange={handleInputChange} accept="image/*" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "En cours..." : editingCar ? "Modifier" : "Ajouter"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
