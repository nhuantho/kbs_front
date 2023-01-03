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
		title: "Loại rối loạn",
		dataIndex: "loaiRoiLoan",
		key: "loaiRoiLoan",
	},
	{
		title: "Chi tiết rối loạn",
		dataIndex: "chiTietRoiLoan",
		key: "chiTietRoiLoan",
	},
	{
		title: "Bệnh",
		dataIndex: "benh",
		key: "benh",
	},
];

export default function GetComment({ link }) {
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
				minHeight: "86vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: 1400,
				marginLeft: 100,
				marginTop: 30,
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
