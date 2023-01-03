import { AndroidOutlined, UserOutlined } from "@ant-design/icons";
import { Result } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MessageUserDetail({ taiKhoan }) {
	const [getTinNhan, setGetTinNhan] = useState([]);
	useEffect(() => {
		if (taiKhoan != null) {
			getTinNhanByND();
		}
	});
	const getTinNhanByND = async () => {
		axios({
			method: "get",
			url: "http://localhost:8888/api/getTinNhanByND/" + taiKhoan,
		})
			.then((res) => {
				setGetTinNhan(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	return (
		<div
			style={{
				marginLeft: 230,
				marginTop: 20,
				marginBottom: 100,
			}}>
			{getTinNhan.length === 0 ? (
				<div style={{ textAlign: "center" }}>
					<div
						style={{
							minHeight: "600px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							width: 1200,
						}}>
						<Result title='Người dùng chưa nhắn tin' />
					</div>
				</div>
			) : (
				getTinNhan.map((tn, index) => {
					return (
						<div key={index} style={{ width: 1245, height: "auto" }}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									width: 1245,
								}}>
								{tn?.thoiGian}
							</div>
							<div
								style={{
									width: 400,
									display: "flex",
									fontSize: 17,
								}}>
								<div style={{ paddingRight: 5, paddingTop: 5 }}>
									<UserOutlined />
								</div>

								<div
									style={{
										padding: 10,
										backgroundColor: "#1677ff",
										color: "#fff",
										borderRadius: 10,
									}}>
									{tn?.nguoiKham}
								</div>
							</div>

							<div
								style={{
									WebkitJustifyContent: "center",
									justifyContent: "flex-end",
									width: 450,
									display: "flex",
									float: "right",
									fontSize: 17,
								}}>
								<div
									style={{
										padding: 10,
										backgroundColor: "#ff7875",
										color: "#fff",
										borderRadius: 10,
									}}>
									{tn?.bot}
								</div>
								<div style={{ paddingLeft: 5, paddingTop: 5 }}>
									<AndroidOutlined />
								</div>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
}
