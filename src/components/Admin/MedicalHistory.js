import { Button, Form, Input, Select, Table } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const columns = [
	{
		title: "Mã câu hỏi",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "Mã bộ câu hỏi",
		dataIndex: "idBoTienSuBenh",
		key: "idBoTienSuBenh",
	},
	{
		title: "Nội dung",
		dataIndex: "noiDung",
		key: "noiDung",
	},
];

export default function MedicalHistory() {
	const [thongKe, setThongKe] = useState([]);
	useEffect(() => {
		thongKeNguoiBenh();
	});
	const thongKeNguoiBenh = async () => {
		axios({
			method: "get",
			url: "http://localhost:8888/api/getAllTSB",
		})
			.then((res) => {
				setThongKe(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};
	const luuKetQua = async (values) => {
		axios({
			method: "post",
			url: "http://localhost:8888/api/saveTSB",
			data: {
				id: values?.id,
				idBoTienSuBenh: values?.idBoTienSuBenh,
				noiDung: values?.noiDung,
			},
		})
			.then((res) => {
				swal({
					title: "Thành công",
					icon: "success",
					dangerMode: true,
				});
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const [thongKe1, setThongKe1] = useState([]);
	useEffect(() => {
		thongKeNguoiBenh1();
	});
	const thongKeNguoiBenh1 = async () => {
		axios({
			method: "get",
			url: "http://localhost:8888/api/getAllBTSB",
		})
			.then((res) => {
				setThongKe1(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const onFinish = (values) => {
		luuKetQua(values);
	};
	const onFinishFailed = (errorInfo) => {
		swal({
			title: "Chưa nhập đủ thông tin",
			icon: "warning",
			dangerMode: true,
		});
	};
	return (
		<div
			style={{
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
			<div style={{ textAlign: "center", width: 1400 }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<div style={{ width: 600 }}>
						<Form
							name='basic'
							labelCol={{
								span: 8,
							}}
							wrapperCol={{
								span: 16,
							}}
							initialValues={{
								remember: true,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'>
							<Form.Item
								label='Mã bộ tiền sử bệnh'
								name='id'
								rules={[
									{
										required: true,
										message: "Vui lòng không bỏ trống",
									},
								]}>
								<Input />
							</Form.Item>

							<Form.Item
								label='Nội dung'
								name='noiDung'
								rules={[
									{
										required: true,
										message: "Vui lòng không bỏ trống",
									},
								]}>
								<Input />
							</Form.Item>

							<Form.Item
								name='idBoTienSuBenh'
								label='Giới tính'
								hasFeedback
								rules={[
									{ required: true, message: "Vui lòng chọn mã tiền sử bệnh" },
								]}>
								<Select placeholder='Chọn mã bộ tiền sử bệnh'>
									{thongKe1.map((tk, index) => {
										return (
											<Select.Option key={index} value={tk?.id}>
												{tk?.noiDung}
											</Select.Option>
										);
									})}
								</Select>
							</Form.Item>

							<Form.Item
								wrapperCol={{
									offset: 8,
									span: 16,
								}}>
								<div>
									<div>
										<Button
											icon={<LoginOutlined />}
											type='primary'
											htmlType='submit'>
											Thêm
										</Button>
									</div>
								</div>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}
