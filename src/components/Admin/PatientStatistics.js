import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const columns = [
	{
		title: "Tài khoản",
		dataIndex: "taiKhoan",
		key: "taiKhoan",
	},
	{
		title: "Họ tên",
		dataIndex: "hoTen",
		key: "hoTen",
	},
	{
		title: "Tên bệnh",
		dataIndex: "tenBenh",
		key: "tenBenh",
	},
	{
		title: "Tỉ lệ",
		dataIndex: "tiLe",
		key: "tiLe",
	},
	{
		title: "Thời gian",
		dataIndex: "thoiGian",
		key: "thoiGian",
	},
	{
		title: "Thông tin người nhà",
		dataIndex: "ttNguoiNha",
		key: "ttNguoiNha",
	},
];

export default function PatientStatistics({ link }) {
	const [thongKe, setThongKe] = useState([]);
	useEffect(() => {
		thongKeNguoiBenh();
	});
	const thongKeNguoiBenh = async () => {
		axios({
			method: "get",
			url: link,
		})
			.then((res) => {
				setThongKe(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};
	return (
		<div
			style={{
				// minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				// justifyContent: "center",
				width: 1400,
				marginLeft: 100,
			}}>
			<Table
				loading={thongKe.length > 0 ? false : true}
				style={{ width: 1000 }}
				dataSource={thongKe}
				columns={columns}
			/>
		</div>
	);
}
