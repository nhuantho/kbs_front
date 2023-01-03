import { Button, Input, Layout, Menu, Result } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useAppContext } from "../../App";
import Answer from "./Answer";
import Chat from "./Chat";
import {
	MessageOutlined,
	QuestionCircleOutlined,
	UserOutlined,
	LogoutOutlined,
	LoginOutlined,
	UserAddOutlined,
	ExportOutlined,
} from "@ant-design/icons";
import PersonalInformation from "./PersonalInformation";
import PandaIcon from "../../Icon/PandaIcon ";

const { Header, Content } = Layout;

export default function Home() {
	const navigate = useNavigate();
	const { user, setUser } = useAppContext();
	const [checkKey, setCheckKey] = useState(2);
	const [checkIDChat, setCheckIDChat] = useState();
	const [checkThemIDChat, setCheckThemIDChat] = useState(true);
	const [idChat, setIDChat] = useState();
	const [checkTK, setCheckTK] = useState(true);
	const [checkCTL, setCheckCTL] = useState(true);

	const onChange = (e) => {
		setIDChat(e.target.value);
	};

	const logOut = () => {
		setUser(null);
	};

	useEffect(() => {
		getIDChat();
	});
	const getIDChat = async () => {
		axios({
			method: "get",
			url: "http://localhost:8888/api/checkIDChat/" + user?.taikhoan,
		})
			.then((res) => {
				setCheckIDChat(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const themIDChat = async () => {
		axios({
			method: "post",
			url: "http://localhost:8888/api/checkIDChatByID",
			data: {
				idChat: idChat,
				taiKhoan: user?.taikhoan,
				ghiChu: "",
			},
		})
			.then((res) => {
				if (res?.data === "Đã tồn tại") {
					swal({
						title: "Đã tồn tại",
						icon: "warning",
						dangerMode: true,
					});
				} else if (res?.data === "Thành công") {
					swal({
						title: "Thành công",
						icon: "success",
						dangerMode: true,
					});
				}
				setCheckThemIDChat(true);
			})
			.catch((err) => {
				swal({
					title: "Không bỏ trống",
					icon: "warning",
					dangerMode: true,
				});
				console.log("Đây là lỗi", err);
			});
	};

	useEffect(() => {
		checkCauTraLoi();
	});
	const checkCauTraLoi = async () => {
		axios({
			method: "get",
			url: "http://localhost:8888/api/checkCauTraLoi/" + user?.taikhoan,
		})
			.then((res) => {
				if (res?.data === "Chưa trả lời câu hỏi") {
					setCheckKey(1);
					setCheckCTL(true);
				} else {
					setCheckCTL(false);
				}
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	return (
		<div>
			{user?.taikhoan == null ? (
				<div style={{ textAlign: "center" }}>
					<div
						style={{
							minHeight: "100vh",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Result
							title='Bạn cần đăng nhập để trải nghiệm dịch vụ'
							extra={
								<Button
									icon={<LoginOutlined />}
									type='primary'
									key='console'
									onClick={() => navigate("/dangnhap")}>
									Đăng nhập
								</Button>
							}
						/>
					</div>
				</div>
			) : (
				<Layout>
					<Header
						style={{
							zIndex: 5,
							position: "fixed",
							right: 0,
							left: 0,
							top: 0,
							backgroundColor: "rgb(2, 173, 252)",
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
						}}>
						<PandaIcon
							style={{
								marginRight: 35,
								fontSize: 50,
								float: "left",
								marginLeft: -20,
								marginTop: 7,
							}}
						/>
						<div
							style={{
								height: 31,
								background: "rgba(255, 255, 255, 0.3)",
								margin: "16px 24px 16px 0px",
								float: "left",
							}}>
							<p
								style={{
									padding: "0px 10px 0px 10px",
									marginTop: -15,
									color: "#fff",
								}}>
								{"Xin chào " + user?.hoten + "!"}
							</p>
						</div>
						<Menu
							theme='dark'
							mode='horizontal'
							defaultSelectedKeys={["2"]}
							style={{
								lineHeight: "64px",
								float: "right",
								backgroundColor: "rgb(2, 173, 252)",
							}}>
							<Menu.Item key='1'>
								<Button
									icon={<QuestionCircleOutlined />}
									onClick={() => setCheckKey(1)}
									disabled={checkCTL ? false : true}
									style={{
										background: checkKey === 1 ? "#008bfc" : "rgb(2, 173, 252)",
										color: "#fff",
									}}>
									Trả lời câu hỏi
								</Button>
							</Menu.Item>
							<Menu.Item key='2'>
								<Button
									icon={<MessageOutlined />}
									disabled={checkCTL ? true : false}
									onClick={() => setCheckKey(2)}
									style={{
										background: checkKey === 2 ? "#008bfc" : "rgb(2, 173, 252)",
										color: "#fff",
									}}>
									Quay lại chat
								</Button>
							</Menu.Item>
							<Menu.Item key='3'>
								<Button
									icon={<UserOutlined />}
									disabled={checkCTL ? true : false}
									onClick={() => setCheckKey(3)}
									style={{
										background: checkKey === 3 ? "#008bfc" : "rgb(2, 173, 252)",
										color: "#fff",
									}}>
									Xem thông tin cá nhân
								</Button>
							</Menu.Item>
							<Menu.Item key='4'>
								<Button
									icon={<LogoutOutlined />}
									style={{ background: "rgb(2, 173, 252)", color: "#fff" }}
									onClick={() => logOut()}>
									Đăng xuất
								</Button>
							</Menu.Item>
						</Menu>
						{checkCTL ? (
							<h3 style={{ color: "red" }}>
								*Chú ý: Hãy trả lời câu hỏi để có một kết quả chính xác!
							</h3>
						) : (
							<></>
						)}
					</Header>

					<Content
						style={{
							padding: checkKey === 2 ? "0 50px 0px 0" : "0 50px",
							marginTop: 54,
						}}>
						<div
							style={{
								background: "#fff",
								minHeight: 585,
								display: "flex",
							}}>
							{checkKey === 2 ? (
								<div
									style={{
										minHeight: 400,
										background: "rgba(0, 0, 0, 0.04)",
										width: 200,
										display: "flex",
										alignItems: "center",
										flexDirection: "column",
										padding: "10px 10px 10px 10px",
										marginTop: 64,
										position: "fixed",
										top: 0,
										left: 0,
										bottom: 0,
									}}>
									<h3>Chế độ chat</h3>
									<div
										style={{
											display: "flex",
											width: 200,
											alignItems: "center",
										}}>
										{checkIDChat?.idChat == null ? (
											<div style={{ display: "flex", flexDirection: "column" }}>
												{checkThemIDChat ? (
													<Button style={{ marginBottom: 20 }}>
														{user?.taikhoan}
													</Button>
												) : (
													<div></div>
												)}
												<>
													{checkThemIDChat ? (
														<Button
															icon={<UserAddOutlined />}
															onClick={() => setCheckThemIDChat(false)}>
															Thêm chat
														</Button>
													) : (
														<div style={{ width: "100%" }}>
															<Input.Group compact>
																<Input
																	style={{ width: 100 }}
																	placeholder='Nhập mã'
																	onChange={onChange}
																/>
																<Button
																	icon={<UserAddOutlined />}
																	onClick={themIDChat}>
																	Thêm
																</Button>
															</Input.Group>
															<Button
																icon={<ExportOutlined />}
																onClick={() => setCheckThemIDChat(true)}
																style={{ width: "100%", marginTop: 20 }}>
																Thoát thêm
															</Button>
														</div>
													)}
												</>
											</div>
										) : (
											<div style={{ display: "flex", flexDirection: "column" }}>
												<Button
													style={{
														marginBottom: 20,
														backgroundColor: checkTK ? "#008bfc" : "#fff",
														color: checkTK ? "#fff" : "#000",
													}}
													onClick={() => setCheckTK(true)}>
													{"Người nhà: " + user?.taikhoan}
												</Button>
												<Button
													onClick={() => setCheckTK(false)}
													style={{
														marginBottom: 20,
														backgroundColor:
															checkTK === false ? "#008bfc" : "#fff",
														color: checkTK === false ? "#fff" : "#000",
													}}>
													{"Bệnh nhân: " + checkIDChat?.idChat}
												</Button>
											</div>
										)}
									</div>
								</div>
							) : (
								<></>
							)}
							<div style={{ padding: "10px 0px 0px 10px" }}>
								{checkKey === 1 ? (
									<Answer
										namsinh={user?.namsinh}
										taikhoan={user?.taikhoan}
										setCheckKey={setCheckKey}
									/>
								) : checkKey === 3 ? (
									<PersonalInformation
										diachi={user?.diachi}
										gioitinh={user?.gioitinh}
										hoten={user?.hoten}
										namsinh={user?.namsinh}
										nghenghiep={user?.nghenghiep}
										sdt={user?.sdt}
										taikhoan={user?.taikhoan}
									/>
								) : (
									<div>
										<Chat
											loaiChat={checkTK ? "NNBN" : "BN"}
											taiKhoan={user?.taikhoan}
											idChat={
												typeof checkIDChat?.idChat === "undefined"
													? ""
													: checkTK === false
													? checkIDChat?.idChat
													: ""
											}
										/>
									</div>
								)}
							</div>
						</div>
					</Content>
				</Layout>
			)}
		</div>
	);
}
