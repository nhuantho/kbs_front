import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";
import axios from "axios";

const PersonalInformation = (props) => {
	const [benh, setBenh] = useState([]);
	useEffect(() => {
		benhCuaBenhNhan();
	});
	const benhCuaBenhNhan = async () => {
		axios({
			method: "get",
			url: "http://localhost:8888/api/benhCuaBenhNhan/" + props?.taikhoan,
		})
			.then((res) => {
				setBenh(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};
	return (
		<div
			style={{
				textAlign: "center",
				width: 1415,
				marginTop: 20,
				padding: "0 300px",
				minHeight: "88vh",
			}}>
			<Descriptions
				title='Thông tin người dùng'
				bordered
				column={{
					xxl: 4,
					xl: 1,
					lg: 3,
					md: 3,
					sm: 2,
					xs: 1,
				}}
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					backgroundColor: "azure",
					borderRadius: 10,
				}}>
				<Descriptions.Item label='Tài khoản'>
					{props?.taikhoan}
				</Descriptions.Item>
				<Descriptions.Item label='Họ tên'>{props?.hoten}</Descriptions.Item>
				<Descriptions.Item label='Giới tính'>
					{props?.gioitinh}
				</Descriptions.Item>
				<Descriptions.Item label='Năm sinh'>{props?.namsinh}</Descriptions.Item>
				<Descriptions.Item label='Số điện thoại'>
					{props?.sdt}
				</Descriptions.Item>
				<Descriptions.Item label='Địa chỉ'>{props?.diachi}</Descriptions.Item>
				<Descriptions.Item label='Nghề nghiệp'>
					{props?.nghenghiep}
				</Descriptions.Item>
				<Descriptions.Item label='Bệnh mắc phải'>
					{benh.length === 0 ? (
						<div>
							Chưa thể chuẩn đoán do chưa nắm bắt được tình hình của bệnh nhân
						</div>
					) : (
						benh.map((b) => {
							return (
								<div>
									{b?.tenBenh}
									<br />
								</div>
							);
						})
					)}

					{/* Data disk type: MongoDB
				<br />
				Database version: 3.4
				<br />
				Package: dds.mongo.mid
				<br />
				Storage space: 10 GB
				<br />
				Replication factor: 3
				<br />
				Region: East China 1 */}
				</Descriptions.Item>
			</Descriptions>
		</div>
	);
};
export default PersonalInformation;
