import { message } from "antd";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice.js";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userMenu = [
    {
      title: "Home",
      paths: ["/", "/user/write-exam"],
      icon: <i className="ri-home-line"></i>,
      onClick: () => navigate("/"),
    },
    {
      title: "Reports",
      paths: ["/user/reports"],
      icon: <i className="ri-bar-chart-line"></i>,
      onClick: () => navigate("/user/reports"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      icon: <i className="ri-user-line"></i>,
      onClick: () => navigate("/profile"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      paths: ["/", "/user/write-exam"],
      icon: <i className="ri-home-line"></i>,
      onClick: () => navigate("/"),
    },
    {
      title: "Exams",
      paths: ["/admin/exams", "/admin/exams/add"],
      icon: <i className="ri-file-list-line"></i>,
      onClick: () => navigate("/admin/exams"),
    },
    {
      title: "Reports",
      paths: ["/admin/reports"],
      icon: <i className="ri-bar-chart-line"></i>,
      onClick: () => navigate("/admin/reports"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      icon: <i className="ri-user-line"></i>,
      onClick: () => navigate("/profile"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  // Handle window resize to automatically collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      navigate("/login");
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      navigate("/login");
    }
  }, []);

  const activeRoute = window.location.pathname;

  const getIsActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      if (
        activeRoute.includes("/admin/exams/edit") &&
        paths.includes("/admin/exams")
      ) {
        return true;
      }
      if (
        activeRoute.includes("/user/write-exam") &&
        paths.includes("/user/write-exam")
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="layout">
      <div className="flex w-full h-full h-100 layout-container">
        <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="menu">
            {menu.map((item, index) => {
              return (
                <div
                  className={`menu-item ${
                    getIsActiveOrNot(item.paths) && "active-menu-item"
                  }`}
                  key={index}
                  onClick={(e) => {
                    if (window.innerWidth < 768) {
                      setCollapsed(true);
                    }
                    item.onClick();
                  }}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </div>
              );
            })}
          </div>
          {/* Close button inside sidebar for mobile */}
          {!collapsed && window.innerWidth < 768 && (
            <div className="mobile-close-btn">
              <i 
                className="ri-close-line" 
                onClick={() => setCollapsed(true)}
              ></i>
            </div>
          )}
        </div>
        <div className="body">
          <div className="header flex justify-between">
            <div className="menu-toggle">
              {collapsed && (
                <i
                  className="ri-menu-line"
                  onClick={() => setCollapsed(false)}
                ></i>
              )}
            </div>
            <h1 className="text-2xl text-white platform-title">Insider Threat trainee platform</h1>
            <div className="user-info">
              <div className="flex gap-1 items-center">
                <h1 className="text-md text-white">{user?.name}</h1>
              </div>
              <span>Role : {user?.isAdmin ? "Admin" : "User"}</span>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>

      {/* Add CSS for responsiveness while maintaining original colors */}
      <style jsx>{`
        .layout {
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        
        .layout-container {
          position: relative;
        }
        
        .sidebar {
          transition: all 0.3s;
          width: 250px;
          overflow-y: auto;
          z-index: 100;
        }
        
        .sidebar-collapsed {
          width: 80px;
        }
        
        .menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }
        
        .menu-toggle i {
          font-size: 24px;
          cursor: pointer;
        }
        
        .platform-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        
        .content {
          padding: 15px;
          height: 100%;
          overflow-y: auto;
        }
        
        /* Mobile close button inside sidebar */
        .mobile-close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          display: none;
        }
        
        .mobile-close-btn i {
          font-size: 24px;
          color: white;
          cursor: pointer;
        }
        
        /* Responsive adjustments */
        @media screen and (max-width: 992px) {
          .platform-title {
            font-size: 1.5rem;
          }
        }
        
        @media screen and (max-width: 768px) {
          .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            transform: translateX(-100%);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
          }
          
          .sidebar.sidebar-collapsed {
            transform: translateX(-100%);
          }
          
          .sidebar:not(.sidebar-collapsed) {
            transform: translateX(0);
          }
          
          .body {
            width: 100%;
            position: relative;
          }
          
          /* Show the mobile close button in sidebar only on mobile */
          .mobile-close-btn {
            display: block;
          }
        }
        
        @media screen and (max-width: 576px) {
          .header {
            flex-direction: column;
            align-items: flex-start;
            padding: 10px;
          }
          
          .menu-toggle {
            position: absolute;
            top: 15px;
            left: 15px;
            z-index: 10;
          }
          
          .platform-title {
            font-size: 1.2rem;
            width: 100%;
            text-align: center;
            margin: 5px 0;
            padding-left: 30px;
            padding-right: 30px;
          }
          
          .user-info {
            width: 100%;
            align-items: center;
            margin-top: 5px;
          }
          
          .content {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default ProtectedRoute;