import {FC} from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "@/components/Home.tsx";

export const App: FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:z" element={<Home />} />
      </Routes>
  );
};
