import { Button, Form, Input, Table } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const columns = [
	{
		title: "Mã bộ câu hỏi",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "Nội dung",
		dataIndex: "noiDung",
		key: "noiDung",
	},
	{
		title: "Trọng số",
		dataIndex: "trongSo",
		key: "trongSo",
	},
	{
		title: "Tuổi",
		dataIndex: "tuoi",
		key: "tuoi",
	},
];

export default function MedicalHistorySet() {
	const [thongKe, setThongKe] = useState([]);
	useEffect(() => {
		thongKeNguoiBenh();
	});
	const thongKeNguoiBenh = async () => {
		axios({
			method: "get",
			url: "http://localhost:8888/api/getAllBTSB",
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
			url: "http://localhost:8888/api/saveBTSB",
			data: {
				id: values?.id,
				noiDung: values?.noiDung,
				trongSo: values?.trongSo,
				tuoi: values?.tuoi,
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
								label='Trọng số'
								name='trongSo'
								rules={[
									{
										required: true,
										message: "Vui lòng không bỏ trống",
									},
								]}>
								<Input />
							</Form.Item>

							<Form.Item
								label='Tuổi'
								name='tuoi'
								rules={[
									{
										required: true,
										message: "Vui lòng không bỏ trống",
									},
								]}>
								<Input />
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
