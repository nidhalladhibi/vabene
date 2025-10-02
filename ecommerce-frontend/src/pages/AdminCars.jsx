import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminCars() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    model: "",
    year: "",
    km: "",
    price: "",
    image: ""
  });
  const [editingCar, setEditingCar] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/cars", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCar) {
        await axios.put(
          `http://127.0.0.1:8000/api/cars/${editingCar.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://127.0.0.1:8000/api/cars", formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchCars();
      setFormData({ model: "", year: "", km: "", price: "", image: "" });
      setEditingCar(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل تريد حذف هذه السيارة ؟")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCars();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">🚗 لوحة تحكم السيارات</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              className="form-control"
              placeholder="موديل"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="form-control"
              placeholder="سنة"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="km"
              value={formData.km}
              onChange={handleInputChange}
              className="form-control"
              placeholder="كم"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form-control"
              placeholder="السعر €"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="form-control"
              placeholder="رابط الصورة"
              required
            />
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-primary">
              {editingCar ? "تعديل" : "إضافة"}
            </button>
          </div>
        </form>
      </div>

      {/* Cars Table */}
      <div className="card shadow-lg mt-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">📋 قائمة السيارات ({cars.length})</h5>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>الصورة</th>
                <th>الموديل</th>
                <th>السنة</th>
                <th>الكيلومترات</th>
                <th>السعر (€)</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {cars.length > 0 ? (
                cars.map((car) => (
                  <tr key={car.id}>
                    <td>
                      <img
                        src={car.image}
                        alt={car.model}
                        style={{ width: "100px", borderRadius: "8px" }}
                      />
                    </td>
                    <td className="fw-bold">{car.model}</td>
                    <td>{car.year}</td>
                    <td>{car.km} كم</td>
                    <td className="text-success fw-bold">{car.price} €</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => setEditingCar(car)}
                      >
                        ✏️ تعديل
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(car.id)}
                      >
                        🗑️ حذف
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    🚫 لا توجد سيارات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminCars;
