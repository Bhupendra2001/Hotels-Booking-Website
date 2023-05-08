import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

import { Rooms } from "./components/Rooms";
import { RoomBook } from "./components/RoomBook";
import RoomBookUpdate from "./components/RoomBookUpdate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/rooms/:id" element={<Rooms />} />

        <Route path="/rooms/:hotelId/:roomId" element={<RoomBook />} />
        <Route
          path="/roomsbook/update/:hotelId/:roomId/:bookedId"
          element={<RoomBookUpdate />}
        />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
