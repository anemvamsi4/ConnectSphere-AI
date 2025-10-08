import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Pipeline from './pages/Pipeline';
import SuccessStories from './pages/SuccessStories';
import Contacts from './pages/Contacts';
import Settings from './pages/Settings';
import './App.css';

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 min-h-screen h-full p-4 border-r border-slate-700 fixed left-0 top-0 z-10">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-blue-500 rounded-lg mr-3"></div>
        <h2 className="text-xl font-semibold text-white">EduConnect</h2>
      </div>
      <nav className="flex flex-col gap-2">
        <Link className="px-3 py-2 rounded-lg hover:bg-slate-700 text-gray-300 hover:text-white transition-colors flex items-center gap-3" to="/">
          <span>🏠</span> Dashboard
        </Link>
        <Link className="px-3 py-2 rounded-lg hover:bg-slate-700 text-gray-300 hover:text-white transition-colors flex items-center gap-3" to="/analytics">
          <span>📊</span> Analytics
        </Link>
        <Link className="px-3 py-2 rounded-lg hover:bg-slate-700 text-gray-300 hover:text-white transition-colors flex items-center gap-3" to="/pipeline">
          <span>🔄</span> Pipeline
        </Link>
        <Link className="px-3 py-2 rounded-lg hover:bg-slate-700 text-gray-300 hover:text-white transition-colors flex items-center gap-3" to="/success-stories">
          <span>🌟</span> Success Stories
        </Link>
        <Link className="px-3 py-2 rounded-lg hover:bg-slate-700 text-gray-300 hover:text-white transition-colors flex items-center gap-3" to="/contacts">
          <span>👥</span> My Network
        </Link>
        <Link className="px-3 py-2 rounded-lg hover:bg-slate-700 text-gray-300 hover:text-white transition-colors flex items-center gap-3" to="/settings">
          <span>⚙️</span> Settings
        </Link>
      </nav>
    </aside>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Sidebar />
        <main className="ml-64 p-6 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
//virtula dom // compoent based architecture // reusable code  // lazy loading  //single way data binding
//props : paramters function :paramters 

//data passed from parent to child  2 function -parent--independent  , child -dependent (parent function)
// state: internal , changing of data inside the componnet 
//npx create-react-app Learn
//html, css :document (static) : dynamicness intorduce (javascript, React, typescript->ionic , angular, vue, ionic )
// public : html files, images, icons, css 
//src : javascript , functions , api , logiic (add to cart),css , node modules 
// html, shopping website : header, footer, sidebar, navbar,main content : products.html, index.html
//react : compoents based architecture : header.js, footer.js, sidebar.js, navbar.js, maincontent.js 
//home.js (header, footer, sidebar,) //product.js(header, footer, navbar, mainconetnt)
//name, date, age, dynamic data :react, angular,vue, javascipt , tailwindcss, bootastrap, tyepscript , glass effectr