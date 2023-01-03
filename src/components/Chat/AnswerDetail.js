import { Radio, Space } from "antd";
import React, { useState } from "react";

const AnswerDetail = ({ tsb, index, taikhoan, cauTraLoi }) => {
	const [value, setValue] = useState(0);

	const onChange = (e) => {
		setValue(e.target.value);
		cauTraLoi.push({
			taiKhoan: taikhoan,
			idTienSuBenhVaCauTraLoi: e.target.value,
		});
		console.log(cauTraLoi);
	};

	return (
		<div
			style={{
				marginTop: 20,
				width: 800,
				backgroundColor: "azure",
				padding: 10,
				color: "#000",
				borderRadius: 10,
			}}>
			<h3 style={{ width: 800 }}>
				Câu hỏi {index + 1} : {tsb?.noiDung}
			</h3>
			<Radio.Group
				disabled={value === 0 ? false : true}
				onChange={onChange}
				value={value}>
				<Space direction='vertical'>
					{tsb?.tienSuBenhVaCauTraLois.map((tsbvctl, index1) => {
						return (
							<Radio key={index1} value={tsbvctl.id} style={{ color: "#000" }}>
								{tsbvctl?.cauTraLoi?.noiDung}
							</Radio>
						);
					})}
				</Space>
			</Radio.Group>
		</div>
	);
};

export default AnswerDetail;
