import React from "react";
import { Button, Form, Input, Select } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export default function Register() {
	const navigate = useNavigate();

	const luuNguoiDung = async (values) => {
		axios({
			method: "post",
			url: "http://localhost:8888/api/luuNguoiDung",
			data: {
				diachi: values?.address,
				ghichu: "",
				gioitinh: values?.gender,
				hoten: values?.name,
				matkhau: values?.password,
				namsinh: values?.dob,
				nghenghiep: values?.job,
				sdt: values?.phone,
				taikhoan: values?.username,
				idnguoidunght: "NNBN",
				loainguoidung: "Người nhà bệnh nhân",
			},
		})
			.then((res) => {
				if (res?.data === "Đã tồn tại") {
					swal({
						title: "Đã tồn tại",
						icon: "warning",
						dangerMode: true,
					});
				} else {
					swal({
						title: "Thành công",
						icon: "success",
						dangerMode: true,
					});
					navigate("/dangnhap");
				}
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const onFinish = (values) => {
		console.log("Success:", values);
		luuNguoiDung(values);
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
		swal({
			title: "Chưa nhập đủ thông tin",
			icon: "warning",
			dangerMode: true,
		});
	};

	return (
		<div style={{ textAlign: "center" }}>
			<header
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
							name='username'
							label='Tài khoản'
							hasFeedback
							rules={[
								{ required: true, message: "Vui lòng không bỏ trống" },
								{ whitespace: true },
								{ min: 6, message: "Vui lòng nhập lớn hơn 6 ký tự" },
							]}>
							<Input placeholder='Nhập tài khoản' />
						</Form.Item>
						<Form.Item
							name='password'
							label='Mật khẩu'
							hasFeedback
							rules={[
								{ required: true, message: "Vui lòng không bỏ trống" },
								{ min: 6, message: "Vui lòng nhập lớn hơn 6 ký tự" },
							]}>
							<Input.Password placeholder='Nhập mật khẩu' />
						</Form.Item>

						<Form.Item
							name='confirm'
							label='Nhập lại mật khẩu'
							hasFeedback
							dependencies={["password"]} // phụ thuộc
							rules={[
								{ required: true, message: "Vui lòng không bỏ trống" },
								{ min: 6, message: "Vui lòng nhập lớn hơn 6 ký tự" },
								({ getFieldValue }) => ({
									validator(rules, value) {
										if (!value || value === getFieldValue("password"))
											return Promise.resolve();
										return Promise.reject("Hai mật khẩu không khớp");
									},
								}),
							]}>
							<Input.Password placeholder='Nhập lại mật khẩu' />
						</Form.Item>
						<Form.Item
							name='name'
							label='Họ và tên'
							hasFeedback
							rules={[
								{ required: true, message: "Vui lòng không bỏ trống" },
								{ whitespace: true },
								{ min: 3 },
							]}>
							<Input placeholder='Nhập lại họ tên' />
						</Form.Item>

						<Form.Item
							name='dob'
							label='Năm sinh'
							hasFeedback
							rules={[
								{ required: true, message: "Vui lòng không bỏ trống" },
								{ whitespace: true },
								{ min: 4, max: 4, message: "Vui lòng nhập 4 số" },
							]}>
							<Input placeholder='Nhập năm sinh' />
						</Form.Item>

						<Form.Item
							name='gender'
							label='Giới tính'
							hasFeedback
							rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}>
							<Select placeholder='Chọn giới tính'>
								<Select.Option value='Nam'>Nam</Select.Option>
								<Select.Option value='Nữ'>Nữ</Select.Option>
								<Select.Option value='Đồng giới'>Đồng giới</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item
							name='address'
							label='Địa chỉ'
							hasFeedback
							rules={[
								{ required: true, message: "Vui lòng không bỏ trống" },
								{ whitespace: true },
								{ min: 3 },
							]}>
							<Input placeholder='Nhập địa chỉ' />
						</Form.Item>

						<Form.Item
							name='phone'
							label='Số điện thoại'
							hasFeedback
							rules={[
								{ required: true, message: "Vui lòng không bỏ trống" },
								{ whitespace: true },
								{ min: 9, message: "Vui lòng nhập lớn hơn 9 ký tự" },
							]}>
							<Input placeholder='Nhập số điện thoại' />
						</Form.Item>

						<Form.Item
							name='job'
							label='Nghề nghiệp'
							hasFeedback
							rules={[
								{ required: true, message: "Vui lòng chọn nghề nghiệp" },
							]}>
							<Select placeholder='Chọn nghề nghiệp'>
								<Select.Option value='Học sinh'>Học sinh</Select.Option>
								<Select.Option value='Sinh viên'>Sinh viên</Select.Option>
								<Select.Option value='Đi làm'>Đi làm</Select.Option>
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
										Đăng ký
									</Button>
								</div>
								<p style={{ marginTop: 20 }}>
									Đã có tài khoản? <a href='/dangnhap'>Đăng nhập</a>
								</p>
							</div>
						</Form.Item>
					</Form>
				</div>
			</header>
		</div>
	);
}
