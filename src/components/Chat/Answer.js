import { Button, Form } from "antd";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AnswerDetail from "./AnswerDetail";
import swal from "sweetalert";

export default function Answer({ namsinh, taikhoan, setCheckKey }) {
	const [cauHoi, setCauHoi] = useState([]);
	// const [luu, setLuu] = useState(false);
	const [cauTraLoi, setCauTraLoi] = useState([]);

	useEffect(() => {
		getTraLoiCauHoi();
	});
	const getTraLoiCauHoi = async () => {
		axios({
			method: "get",
			url:
				"http://localhost:8888/api/getTraLoiCauHoi/" +
				(parseInt(new Date().getFullYear()) - parseInt(namsinh)).toString(),
		})
			.then((res) => {
				setCauHoi(res?.data);
				// console.log(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const luuCauTraLoi = async () => {
		axios({
			method: "post",
			url: "http://localhost:8888/api/luuCauTraLoi",
			data: cauTraLoi,
		})
			.then((res) => {
				if (res?.data.length === cauTraLoi.length) {
					swal({
						title: "Cảm ơn bạn đã trả lời",
						icon: "success",
						dangerMode: true,
					});
					setCheckKey(2);
				}
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const setSoLuong = (cauHoi, cauTraLoi) => {
		let tong = 0;
		for (let i = 0; i < cauHoi.length; i++) {
			tong = tong + cauHoi[i]?.tienSuBenhs.length;
		}
		if (tong === cauTraLoi.length) {
			// setLuu(true);
			return true;
		}
		return false;
	};

	return (
		<div style={{ width: 1450 }}>
			<div
				style={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<Form style={{ marginLeft: -50 }}>
					<div
						style={{
							textAlign: "center",
						}}>
						<h1 style={{ color: "red" }}>
							*Lưu ý chỉ chọn đáp án 1 lần và chọn đủ đáp án để có kết quả chính
							xác!
						</h1>
					</div>
					{Array.isArray(cauHoi)
						? cauHoi.map((ch, index) => {
								return (
									<div key={index} style={{ marginTop: 20 }}>
										<div
											style={{
												textAlign: "center",
											}}>
											<h1>{ch?.noiDung}</h1>
										</div>

										{Array.isArray(cauHoi)
											? ch?.tienSuBenhs.map((tsb, index1) => {
													return (
														<AnswerDetail
															tsb={tsb}
															index={index1}
															taikhoan={taikhoan}
															cauTraLoi={cauTraLoi}
														/>
													);
											  })
											: "Không phải mảng"}
									</div>
								);
						  })
						: "Không phải mảng"}
					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
						style={{ marginTop: 30, marginLeft: 80 }}>
						<Button
							onClick={() => luuCauTraLoi()}
							disabled={setSoLuong(cauHoi, cauTraLoi) ? false : true}
							icon={<VerticalAlignBottomOutlined />}
							type='primary'>
							Lưu kết quả
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
