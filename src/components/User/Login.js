import React from "react";
import { Button, Form, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { useAppContext } from "../../App";

export default function Login() {
	const navigate = useNavigate();
	const { setUser } = useAppContext();

	const checkTTNguoiDungByTK = async (values) => {
		axios({
			method: "post",
			url: "http://localhost:8888/api/checkTTNguoiDungByTK",
			data: {
				taiKhoan: values?.username,
				matKhau: values?.password,
			},
		})
			.then((res) => {
				if (res?.data?.taikhoan == null) {
					swal({
						title: "Tài khoản không tồn tại",
						icon: "warning",
						dangerMode: true,
					});
				} else {
					if (res?.data?.idnguoidunght === "QL") {
						navigate("/quanly");
					} else if (res?.data?.idnguoidunght === "NV") {
						navigate("/nhanvien");
					} else if (res?.data?.idnguoidunght === "NGY") {
						navigate("/nguoigopy");
					} else if (res?.data?.idnguoidunght === "NNBN") {
						navigate("/");
					}
					setUser(res?.data);
				}
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const onFinish = (values) => {
		checkTTNguoiDungByTK(values);
	};
	const onFinishFailed = (errorInfo) => {
		swal({
			title: "Chưa nhập đủ thông tin",
			icon: "warning",
			dangerMode: true,
		});
	};
	return (
		<div style={{ textAlign: "center" }}>
			<div
				style={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
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
							label='Tài khoản'
							name='username'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							label='Mật khẩu'
							name='password'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<Input.Password />
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
										Đăng nhập
									</Button>
								</div>
								<p style={{ marginTop: 20 }}>
									Chưa có tài khoản? <a href='/dangky'>Đăng ký</a>
								</p>
							</div>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
