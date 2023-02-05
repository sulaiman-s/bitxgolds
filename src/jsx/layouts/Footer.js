import React from "react";

const Footer = () => {
	var d = new Date();
	return (
		<div className="footer out-footer">
			<div className="copyright">
				<p>Copyright © BitxGold
					{" " +d.getFullYear()}
				</p>
			</div>
		</div>
	);
};

export default Footer;
