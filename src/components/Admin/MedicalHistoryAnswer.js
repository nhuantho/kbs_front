import { Button, Form, Input, Select, Table } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const columns = [
	{
		title: "Mã trả lời câu hỏi",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "Mã tiền sử bệnh",
		dataIndex: "idTienSuBenh",
		key: "idTienSuBenh",
	},
	{
		title: "Mã câu trả lời",
		dataIndex: "idCauTraLoi",
		key: "idCauTraLoi",
	},
	{
		title: "Điểm",
		dataIndex: "diem",
		key: "diem",
	},
];

export default function MedicalHistoryAnswer() {
	const [thongKe, setThongKe] = useState([]);
	useEffect(() => {
		thongKeNguoiBenh();
	});
	const thongKeNguoiBenh = async () => {
		axios({
			method: "get",
			url: "http://localhost:8888/api/getAllTSBVCTL",
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
				idTienSuBenh: values?.idTienSuBenh,
				idCauTraLoi: values?.idCauTraLoi,
				diem: values?.diem,
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

	const [thongKe1, setThongKe1] = useState([]);
	useEffect(() => {
		thongKeNguoiBenh1();
	});
	const thongKeNguoiBenh1 = async () => {
		axios({
			method: "get",
			url: "http://localhost:8888/api/getAllTSB",
		})
			.then((res) => {
				setThongKe1(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const [thongKe2, setThongKe2] = useState([]);
	useEffect(() => {
		thongKeNguoiBenh2();
	});
	const thongKeNguoiBenh2 = async () => {
		axios({
			method: "get",
			url: "http://localhost:8888/api/getAllCTL",
		})
			.then((res) => {
				setThongKe2(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
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
						marginLeft: 90,
					}}>
					<div style={{ width: 1000 }}>
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
								name='idTienSuBenh'
								label='Tiền sử bệnh'
								hasFeedback
								rules={[
									{ required: true, message: "Vui lòng chọn tiền sử bệnh" },
								]}>
								<Select placeholder='Chọn tiền sử bệnh'>
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
								name='idCauTraLoi'
								label='Câu trả lời'
								hasFeedback
								rules={[
									{ required: true, message: "Vui lòng chọn câu trả lời" },
								]}>
								<Select placeholder='Chọn câu trả lời'>
									{thongKe2.map((tk, index) => {
										return (
											<Select.Option key={index} value={tk?.id}>
												{tk?.noiDung}
											</Select.Option>
										);
									})}
								</Select>
							</Form.Item>

							<Form.Item
								label='Điểm'
								name='diem'
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
