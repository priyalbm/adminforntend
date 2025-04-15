import React, { useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchSetting, updateSetting } from "../redux/notificationSlice";
import { ToastContainer, toast } from "react-toastify";

export const Notification = () => {
  const dispatch = useDispatch();
  const { settings, isLoading, error, message } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    dispatch(fetchSetting());
  }, [dispatch]);

  const notifyData = [
    {
      key: "site_maintenance",
      head: "System Maintenance",
      para: "Enable or disable system maintenance notifications.",
    },
    {
      key: "policy_change_notification",
      head: "Policy Changes",
      para: "Receive alerts about updated policies.",
    },
    {
      key: "expiry_notification",
      head: "Subscription Expirations",
      para: "Get notified before your subscriptions expire.",
    },
  ];

  const handleToggle = (key, value) => {
    const updateddata = { [key]: value ? 0 : 1 };
    dispatch(updateSetting(updateddata));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [error, message]);

  return (
    <DashboardLayout>
      <ToastContainer />

      <section className="notification">
        <div className="row">
          <div className="col-lg-12">
            <div className="count_box">
              <div className="dashboard_head">
                <h5 className="mb-0">Notifications</h5>
              </div>
              <div className="row">
                <div className="col-xxl-7 col-lg-10">
                  <div className="notification_box">
                    <div className="row">
                      {notifyData.map((item, i) => (
                        <div className="col-lg-12" key={i}>
                          <div className="d-flex justify-content-between align-items-center mb-xl-4 mb-2 notify_data">
                            <div>
                              <label
                                className="form-check-label"
                                htmlFor={item.key}
                              >
                                {item.head}
                              </label>
                              <p className="mb-0">{item.para}</p>
                            </div>
                            {isLoading ? "Loading ..." : (
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={item.key}
                                checked={settings?.[item.key] === true}
                                onChange={() =>
                                  handleToggle(item.key, settings?.[item.key])
                                }
                              />
                            </div>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};
