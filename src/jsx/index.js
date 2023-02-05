import React, { useContext } from "react";

/// React router dom
import {  Routes, Route, Outlet  } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
//import Main from './layouts/Main';

import ScrollToTop from "./layouts/ScrollToTop";
/// Dashboard
import Home from "./components/Dashboard/Home";



//Crypto


import Buy from './components/Crypto/Buy';
import Sell from './components/Crypto/Sell';
import Stake from './components/Crypto/Stake';


//admin
import Requests from "./components/Crypto/Requests";

//Report 
import History from './components/Report/History';
import Order from './components/Report/Order';
import Reports from './components/Report/Reports';
import User from './components/Report/User';
import Contact from './components/Report/Contact';
import Activity from './components/Report/Activity';


/// Bootstrap
import UiAlert from "./components/bootstrap/Alert";
import UiAccordion from "./components/bootstrap/Accordion";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// Plugins
import Select2 from "./components/PluginsMenu/Select2/Select2";
import MainNouiSlider from "./components/PluginsMenu/NouiSlider/MainNouiSlider";
import MainSweetAlert from "./components/PluginsMenu/SweetAlert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
import JqvMap from "./components/PluginsMenu/JqvMap/JqvMap";
import Lightgallery from "./components/PluginsMenu/Lightgallery/Lightgallery";

//Redux
//import Todo from "./pages/Todo";

// Widget
import Widget from "./pages/Widget";

/// Table
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import CkEditor from "./components/Forms/CkEditor/CkEditor";
import Pickers from "./components/Forms/Pickers/Pickers";
import FormValidation from "./components/Forms/FormValidation/FormValidation";







/// Pages
//import Registration from "./pages/Registration";
//import Login from "./pages/Login";
//import ForgotPassword from "./pages/ForgotPassword";

import { ThemeContext } from "../context/ThemeContext";
import { useSelector } from "react-redux";
import AdminHome from "./components/Dashboard/AdminHome";




const Markup = () => {

  const state = useSelector((state) => state);
  const allroutes = [
    /// Dashboard
    { url: "", component: <Home /> },
    { url: "dashboard", component: <Home /> },
    
    
    //Crypto
    
    {url:"buy", component: <Buy/>},
    {url:"sell", component: <Sell/>},
    {url:"stake", component: <Stake/>},


    //admin
    { url: "admindashboard", component: <AdminHome /> },
    {url:"requests", component: <Requests/>},
    


    //Report 
    {url :"history", component: <History />},
    {url :"orders", component: <Order />},
    {url :"reports", component: <Reports />},
    {url :"user", component: <User />},
    {url :"contact", component: <Contact />},
    {url :"activity", component: <Activity />},
	/////Demo
    // { url: "sidebar-primary", component: <Theme1 /> },
    // { url: "horizontal-sidebar", component: <Theme2 /> },
    // { url: "nav-header", component: <Theme3 /> },
    // { url: "secondary-header", component: <Theme4 /> },
    // { url: "sidebar-theme", component: <Theme5/> },
    // { url: "primary-theme", component: <Theme6/> },
    // { url: "nav-theme", component: <Theme7/> },
    // { url: "sidebar-mini", component: <Theme8 /> },
	
	// /// Apps
  //   { url: "app-profile", component: <AppProfile /> },
  //   { url: "edit-profile", component: <EditProfile /> },
  //   { url: "email-compose", component: <Compose /> },
  //   { url: "email-inbox", component: <Inbox /> },
  //   { url: "email-read", component: <Read /> },
  //   { url: "app-calender", component: <Calendar /> },
  //   { url: "post-details", component: <PostDetails /> },

  // /// Shop
  //   { url: "ecom-product-grid", component: <ProductGrid /> },
  //   { url: "ecom-product-list", component: <ProductList /> },
  //   { url: "ecom-product-detail", component: <ProductDetail /> },
  //   { url: "ecom-product-order", component: <ProductOrder /> },
  //   { url: "ecom-checkout", component: <Checkout /> },
  //   { url: "ecom-invoice", component: <Invoice /> },
  //   { url: "ecom-customers", component: <Customers /> },
//
    // ///// Chart
    // { url: "chart-sparkline", component: <SparklineChart /> },
    // { url: "chart-chartjs", component: <ChartJs /> },    
    // { url: "chart-apexchart", component: <ApexChart /> },
    // { url: "chart-rechart", component: <RechartJs /> },
//
    ///// Bootstrap
    { url: "ui-alert", component: <UiAlert /> },
    { url: "ui-badge", component: <UiBadge /> },
    { url: "ui-button", component: <UiButton /> },
    { url: "ui-modal", component: <UiModal /> },
    { url: "ui-button-group", component: <UiButtonGroup /> },
    { url: "ui-accordion", component: <UiAccordion /> },
    { url: "ui-list-group", component: <UiListGroup /> },
    { url: "ui-card", component: <UiCards />},
    { url: "ui-carousel", component: <UiCarousel /> },
    { url: "ui-dropdown", component: <UiDropDown /> },
    { url: "ui-popover", component: <UiPopOver /> },
    { url: "ui-progressbar", component: <UiProgressBar /> },
    { url: "ui-tab", component: <UiTab /> },
    { url: "ui-pagination", component: <UiPagination /> },
    { url: "ui-typography", component: <UiTypography /> },
    { url: "ui-grid", component: <UiGrid /> },
	//
    ///// Plugin
    { url: "uc-select2", component: <Select2 /> },
    { url: "uc-noui-slider", component: <MainNouiSlider /> },
    { url: "uc-sweetalert", component: <MainSweetAlert /> },
    { url: "uc-toastr", component: <Toastr /> },
    { url: "map-jqvmap", component: <JqvMap /> },
    { url: "uc-lightgallery", component: <Lightgallery /> },
//
	/////Redux
	//{ url: "todo", component: Todo },	
	//
    ///// Widget
    { url: "widget-basic", component: <Widget /> },

    ///// Form
    { url: "form-element", component: <Element /> },
    { url: "form-wizard", component: <Wizard /> },
    { url: "form-ckeditor", component: <CkEditor /> },
    { url: "form-pickers", component: <Pickers /> },
    { url: "form-validation", component: <FormValidation /> },
//
    ///// table
	  { url: 'table-filtering', component: <FilteringTable /> },
    { url: 'table-sorting', component: <SortingTable /> },
    { url: "table-bootstrap-basic", component: <BootstrapTable /> },
//
    ///// pages
    //{ url: "page-register", component: Registration },
    //{ url: "page-lock-screen", component: <LockScreen /> },
    ////{ url: "page-login", component: Login },
    //{ url: "page-forgot-password", component: <ForgotPassword /> },
    //{ url: "page-error-400", component: <Error400 /> },
    //{ url: "page-error-403", component: <Error403 /> },
    //{ url: "page-error-404", component: <Error404 /> },
    //{ url: "page-error-500", component: <Error500 /> },
    //{ url: "page-error-503", component: <Error503 /> },
  ];
  //let path = window.location.pathname;
  //path = path.split("/");
  //path = path[path.length - 1];

  //let pagePath = path.split("-").includes("page");
  //const { menuToggle } = useContext(ThemeContext);

  return (
    <>
        <Routes>
            <Route  element={<MainLayout />} > 
                {allroutes.map((data, i) => (
                  <Route
                    key={i}
                    exact
                    path={`${data.url}`}
                    element={data.component}
                  />
                ))}
            </Route>
        </Routes>
        <ScrollToTop />
        
    </>
  );
};


function MainLayout(){
  const { menuToggle } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`show ${ menuToggle ? "menu-toggle" : ""}`}>  
      <Nav />
      <div className="content-body" style={{ minHeight: window.screen.height - 45 }}>
          <div className="container-fluid">
            <Outlet />                
          </div>
      </div>
      <Footer />
    </div>
  )

};

export default Markup;
