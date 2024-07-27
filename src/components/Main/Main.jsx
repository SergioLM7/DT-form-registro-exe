import React from "react";
import Form from "./Form/Form";
import { Routes, Route } from 'react-router-dom';


const Main = () => {
  return <>
    <main className="main-container">
      <Routes>
        <Route
          path="/"
          element={<Form />}
        />
      </Routes>
    </main>
  </>
};

export default Main;
