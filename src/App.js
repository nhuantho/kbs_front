import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Home from "./components/Chat/Home";
import Commenter from "./components/Commenter/Commenter";
import Staff from "./components/Saff/Staff";
import Login from "./components/User/Login";
import Register from "./components/User/Register";

export const AppContext = createContext({
	user: {},
	setUser: () => {},
});

export const useAppContext = () => useContext(AppContext);

export default function App() {
	const [user, setUser] = useState();
	return (
		<div>
			<AppContext.Provider
				value={{
					user,
					setUser,
				}}>
				<Router>
					<div>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/dangnhap' element={<Login />} />
							<Route path='/dangky' element={<Register />} />
							<Route path='/quanly' element={<Admin />} />
							<Route path='/nguoigopy' element={<Commenter />} />
							<Route path='/nhanvien' element={<Staff />} />
						</Routes>
					</div>
				</Router>
			</AppContext.Provider>
		</div>
	);
}
