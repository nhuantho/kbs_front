import { Button, Form, Result } from "antd";
import { UserOutlined, SendOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ChatDetail from "./ChatDetail";

export default function Chat({ loaiChat, taiKhoan, idChat }) {
	const [tinNhanByTK, setTinNhanByTK] = useState([]);
	const [tinNhan, setTinNhan] = useState("");
	const [form] = Form.useForm();

	const onChange = (e) => {
		setTinNhan(e.target.value);
		console.log(tinNhan);
	};

	useEffect(() => {
		allTinNhanByTK();
	});
	const allTinNhanByTK = async () => {
		axios({
			method: "post",
			url: "http://localhost:8888/api/getTinNhanByTK",
			data: {
				idChat: idChat,
				taiKhoan: taiKhoan,
			},
		})
			.then((res) => {
				setTinNhanByTK(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const luuTinNhan = async () => {
		axios({
			method: "post",
			url: "http://localhost:8888/api/luuTinNhan",
			data: {
				idChat: idChat,
				taiKhoan: taiKhoan,
				tinNhan: tinNhan,
			},
		})
			.then((res) => {
				setTinNhanByTK(res?.data);
				console.log(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const checkGuiTinNhan = async () => {
		luuTinNhan();
		setTinNhan("");
		await form.setFieldsValue({
			tinNhanND: "",
		});
	};

	return (
		<div>
			<div
				style={{
					position: "fixed",
					width: "auto",
					height: 35,
					left: 200,
					right: 50,
					marginTop: -50,
					backgroundColor: "#fff",
				}}></div>

			<div
				style={{
					position: "fixed",
					width: "auto",
					height: 1,
					left: 200,
					right: 50,
					marginTop: -15,
					backgroundColor: "#ccc",
				}}></div>
			<div
				className='cxonten'
				style={{
					minHeight: 550,
					minWidth: 1250,
					marginTop: 50,
					marginLeft: 202,
					borderWidth: 1,
					borderColor: "#ccc",
				}}>
				<div style={{ padddingRight: "15px" }}>
					{tinNhanByTK.length === 0 ? (
						<Result
							icon={<UserOutlined />}
							title={
								loaiChat === "NNBN"
									? "Xin chào " + taiKhoan
									: "Xin chào " + idChat
							}
							subTitle='Hãy nhắn tin với chúng tôi để trải nghiệm dịch vụ'
						/>
					) : (
						<div style={{ paddingBottom: 600 }}>
							{Array.isArray(tinNhanByTK)
								? tinNhanByTK.map((tnbtk, index) => {
										return (
											<ChatDetail
												nguoiKham={tnbtk?.nguoiKham}
												bot={tnbtk?.bot}
												thoiGian={tnbtk?.thoiGian}
												index={index}
											/>
										);
								  })
								: "Không phải mảng"}
						</div>
					)}
				</div>
				<div
					style={{
						minHeight: "100px",
						textAlign: "center",
						position: "fixed",
						bottom: " 0",
						minWidth: 1258,
						backgroundColor: "#fff",
					}}>
					<Form
						form={form}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							paddingBottom: 10,
							paddingTop: 10,
						}}>
						<Form.Item name='tinNhanND' style={{ width: 1100 }}>
							<TextArea rows={4} onChange={onChange} />
						</Form.Item>
						<div
							style={{
								padding: 10,
							}}>
							<Button
								icon={<SendOutlined />}
								type='primary'
								disabled={tinNhan === "" ? true : false}
								onClick={() => checkGuiTinNhan()}>
								Gửi tin nhắn
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}
