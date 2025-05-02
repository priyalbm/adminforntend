import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage } from "../redux/planSlice"; // Import from your exchange slice instead
import DashboardLayout from "../layouts/DashboardLayout";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createExchange } from "../redux/botSlice";
export const AddExchange = () => {
  const [exchangeData, setExchangeData] = useState({
    name: "",
    api_endpoint: "",
    pair_link: "",
    description: "",
    is_active: true
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, message } = useSelector((state) => state.bots); // Change to your exchange state
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExchangeData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your exchange creation action
    dispatch(createExchange(exchangeData));
    // console.log("Submitting exchange data:", exchangeData);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, message, dispatch]);

  return (
    <DashboardLayout>
      <section className="exchange">
        <ToastContainer />
        <div className="row">
          <div className="col-lg-12">
            <div className="count_box">
              <div className="dashboard_head">
                <h5 className="mb-0">Add Exchange</h5>
              </div>
              <div className="row">
                <div className="col-xl-6">
                  <form onSubmit={handleSubmit}>
                    <div className="input_spc">
                      <label htmlFor="name" className="mb-2 text-white">
                        Exchange Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="input_box w-100"
                        placeholder="Enter exchange name"
                        value={exchangeData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="input_spc">
                      <label htmlFor="api_endpoint" className="mb-2 text-white">
                        API Endpoint*
                      </label>
                      <input
                        type="url"
                        id="api_endpoint"
                        name="api_endpoint"
                        className="input_box w-100"
                        placeholder="Enter API endpoint URL"
                        value={exchangeData.api_endpoint}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="input_spc">
                      <label htmlFor="pair_link" className="mb-2 text-white">
                        Pair Link*
                      </label>
                      <input
                        type="url"
                        id="pair_link"
                        name="pair_link"
                        className="input_box w-100"
                        placeholder="Enter pair link URL"
                        value={exchangeData.pair_link}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="input_spc">
                      <label htmlFor="description" className="mb-2 text-white">
                        Description*
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        className="w-100"
                        rows="4"
                        placeholder="Enter exchange description"
                        value={exchangeData.description}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    
                    <div className="d-flex align-items-center gap-2 mb-4">
                      <input
                        type="checkbox"
                        id="is_active"
                        name="is_active"
                        checked={exchangeData.is_active}
                        onChange={handleChange}
                      />
                      <label htmlFor="is_active" className="text-white">
                        Active
                      </label>
                    </div>
                    
                    <div className="add_btn">
                      <button type="submit" className="cmn_btn">
                        {isLoading ? "Saving..." : "Save Exchange"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};