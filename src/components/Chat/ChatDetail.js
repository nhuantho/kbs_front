import { AndroidOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

export default function ChatDetail({ nguoiKham, bot, thoiGian, index }) {
	return (
		<div style={{ width: 1245, height: "auto" }}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: 1245,
				}}>
				{thoiGian}
			</div>
			<div
				style={{
					width: 400,
					display: "flex",
					fontSize: 17,
				}}>
				<div style={{ paddingRight: 5, paddingTop: 5 }}>
					<UserOutlined />
				</div>

				<div
					style={{
						padding: 10,
						backgroundColor: "#1677ff",
						color: "#fff",
						borderRadius: 10,
					}}>
					{nguoiKham}
				</div>
			</div>

			<div
				style={{
					WebkitJustifyContent: "center",
					justifyContent: "flex-end",
					width: 450,
					display: "flex",
					float: "right",
					fontSize: 17,
				}}>
				<div
					style={{
						padding: 10,
						backgroundColor: "#ff7875",
						color: "#fff",
						borderRadius: 10,
					}}>
					{bot}
				</div>
				<div style={{ paddingLeft: 5, paddingTop: 5 }}>
					<AndroidOutlined />
				</div>
			</div>
		</div>
	);
}
