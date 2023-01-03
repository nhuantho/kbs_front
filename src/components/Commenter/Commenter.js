import { Button, Layout, Menu, Result } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../App";
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import PandaIcon from "../../Icon/PandaIcon ";
import GetComment from "./GetComment";
import SaveComment from "./SaveComment";

const { Header, Content } = Layout;

export default function Commenter() {
	const navigate = useNavigate();
	const { user, setUser } = useAppContext();
	const [idx, setIdx] = useState(1);

	const logOut = () => {
		setUser(null);
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
							<Menu.Item key='1'>
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
									<h3>Chức năng</h3>
									<div
										style={{
											display: "flex",
											width: 200,
											flexDirection: "column",
											padding: 20,
										}}>
										<Button
											onClick={() => setIdx(1)}
											style={{
												backgroundColor: idx === 1 ? "#008bfc" : "#fff",
												color: idx === 1 ? "#fff" : "#000",
											}}>
											Xem góp ý
										</Button>
										<Button
											onClick={() => setIdx(2)}
											style={{
												backgroundColor: idx === 2 ? "#008bfc" : "#fff",
												color: idx === 2 ? "#fff" : "#000",
												marginTop: 10,
											}}>
											Góp ý phát triển
										</Button>
									</div>
								</div>
								<div style={{ padding: "10px 0px 0px 10px" }}>
									{idx === 1 ? (
										<GetComment
											link={
												"http://localhost:8888/api/getGiaTri/" + user?.taikhoan
											}
										/>
									) : (
										<SaveComment
											link={"http://localhost:8888/api/luuKetQua"}
											taiKhoan={user?.taikhoan}
										/>
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
