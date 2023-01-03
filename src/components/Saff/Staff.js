import { Button, Layout, Menu, Result, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../App";
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import MessageUserDetail from "./MessageUserDetail";
import PandaIcon from "../../Icon/PandaIcon ";

const { Header, Content } = Layout;

const columns = [
	{
		title: "Tài khoản",
		dataIndex: "taiKhoan",
		key: "taiKhoan",
	},
	{
		title: "Họ tên",
		dataIndex: "hoTen",
		key: "hoTen",
	},
	{
		title: "Số Lượng",
		dataIndex: "soLuong",
		key: "soLuong",
	},
];

export default function Staff() {
	const navigate = useNavigate();
	const { user, setUser } = useAppContext();

	const logOut = () => {
		setUser(null);
	};

	const [danhSachND, setdanhSachND] = useState([]);
	const [tkTinNhan, setTKTinNhan] = useState([]);
	const [idx, setIdx] = useState(-1);
	const [taiKhoan, setTaiKhoan] = useState();

	useEffect(() => {
		nguoiDungs();
	});
	const nguoiDungs = async () => {
		axios({
			method: "get",
			url: "http://localhost:8888/api/nguoiDungs",
		})
			.then((res) => {
				setdanhSachND(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	useEffect(() => {
		thongKeTinNhan();
	});
	const thongKeTinNhan = async () => {
		axios({
			method: "get",
			url: "http://localhost:8888/api/thongKeTinNhan",
		})
			.then((res) => {
				setTKTinNhan(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const onClick = (index, taiKhoan) => {
		setIdx(index);
		setTaiKhoan(taiKhoan);
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
							theme='light'
							mode='horizontal'
							defaultSelectedKeys={["2"]}
							style={{
								lineHeight: "64px",
								float: "right",
								backgroundColor: "rgb(2, 173, 252)",
							}}>
							<Menu.Item key='1' style={{ float: "right" }}>
								<Button
									icon={<LogoutOutlined />}
									style={{ background: "rgb(2, 173, 252)", color: "#fff" }}
									onClick={() => logOut()}>
									Đăng xuất
								</Button>
							</Menu.Item>
						</Menu>
					</Header>

					<Content
						style={{
							padding: "0 50px 0px 0",
							marginTop: 54,
						}}>
						<div>
							<div
								style={{
									background: "#fff",
									minHeight: 585,
									display: "flex",
								}}>
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
									<h3>Danh sách chat</h3>
									<div
										style={{
											display: "flex",
											width: 200,
											flexDirection: "column",
											padding: 20,
										}}>
										<Button
											onClick={() => setIdx(-1)}
											style={{
												backgroundColor: idx === -1 ? "#008bfc" : "#fff",
												color: idx === -1 ? "#fff" : "#000",
											}}>
											Xem thống kê
										</Button>
										{danhSachND.map((ds, index) => {
											return (
												<Button
													onClick={() => onClick(index, ds?.taiKhoan)}
													key={index}
													style={{
														marginTop: 10,
														backgroundColor: idx === index ? "#008bfc" : "#fff",
														color: idx === index ? "#fff" : "#000",
													}}>
													{ds?.taiKhoan}
												</Button>
											);
										})}
									</div>
								</div>
								<div style={{ padding: "10px 0px 0px 10px" }}>
									{idx === -1 ? (
										<div
											style={{
												marginLeft: 230,
												marginTop: 20,
												marginBottom: 100,
											}}>
											{tkTinNhan.length === 0 ? (
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
												<div
													style={{
														display: "flex",
														flexDirection: "column",
														alignItems: "center",
														width: 1250,
													}}>
													<Table
														loading={tkTinNhan.length > 0 ? false : true}
														style={{ width: 800 }}
														dataSource={tkTinNhan}
														columns={columns}
													/>
												</div>
											)}
										</div>
									) : (
										<MessageUserDetail taiKhoan={taiKhoan} />
									)}
								</div>
							</div>
						</div>
					</Content>
				</Layout>
			)}
		</div>
	);
}
