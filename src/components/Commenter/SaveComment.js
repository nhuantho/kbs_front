import React from "react";
import { Button, Form, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import axios from "axios";

export default function SaveComment({ link, taiKhoan }) {
	const luuKetQua = async (values) => {
		axios({
			method: "post",
			url: link,
			data: {
				benh: values?.benh,
				loaiRoiLoan: values?.loaiRoiLoan,
				chiTietRoiLoan: values?.chiTietRoiLoan,
				taiKhoan: taiKhoan,
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
		<div style={{ textAlign: "center", width: 1500 }}>
			<div
				style={{
					minHeight: "98vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					marginTop: -50,
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
							label='Loại rối loạn'
							name='loaiRoiLoan'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							label='Chi tiết rối loạn'
							name='chiTietRoiLoan'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							label='Bệnh'
							name='benh'
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
										Thêm đóng góp
									</Button>
								</div>
							</div>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
