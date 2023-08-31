import React, { useEffect, useState } from "react";
import { hasCookie, setCookie } from "cookies-next";
import { Button, Col, Row } from "react-bootstrap";

import { CookiesProvider, useCookies } from "react-cookie";
const CookieConsent = (props) => {
	const [showConsent, setShowConsent] = useState(true);

	const [cookies, setCookies] = useCookies(["localConsent"]);

	useEffect(() => {
		setShowConsent(hasCookie("localConsent"));
	}, []);

	const acceptCookie = () => {
		setShowConsent(true);
		setCookie("localConsent", "true", { sameSite: "none", secure: true });
	};

	if (showConsent) {
		return null;
	}

	const overlayStyle = {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		zIndex: 9999,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backdropFilter: "blur(8px)",
	};

	return (
		<CookiesProvider>
			<div style={overlayStyle}>
				<Row className="justify-content-center text-center sticky mt-3 ">
					<Col className="bg-black rounded">
						<Col className="fixed inset-0 bg-slate-700 bg-opacity-70">
							<Col className="fixed bottom-0 left-0 right-0  flex items-center justify-between px-4 py-2 bg-gray-100">
								<Row className="overflow-auto">
									<h6 className="text-light text-base ">
										Diese Website verwendet Cookies. Cookies sind notwendig, um
										die ordnungsgemäße Funktion der Website zu gewährleisten,
										Inhalte zu personalisieren, Werbung anzupassen und den
										Website-Verkehr zu analysieren. Wenn Sie unsere Website
										nutzen, stimmen Sie der Verwendung von Cookies gemäß unserer
										Datenschutzrichtlinie zu.
									</h6>
									<h6 className="text-light text-base py-1">
										Sie können die Cookie-Einstellungen in Ihrem Browser ändern
										oder Cookie-Verwaltungstools verwenden, um Cookies zu
										blockieren oder zu löschen. Beachten Sie jedoch, dass das
										Deaktivieren von Cookies einige Funktionen und Dienste auf
										unserer Website beeinträchtigen kann.
									</h6>
									<h6 className="text-light text-base ">
										Weitere Informationen zu Cookies und unserer
										Datenschutzrichtlinie finden Sie auf der Website. Durch
										Klicken auf "Akzeptieren" oder die weitere Nutzung der
										Website stimmen Sie der Verwendung von Cookies zu.
									</h6>
								</Row>

								<Button
									variant="dark"
									className=" m-2"
									onClick={() => acceptCookie()}
								>
									Akzeptieren
								</Button>
							</Col>
						</Col>
					</Col>
				</Row>
			</div>
		</CookiesProvider>
	);
};

export default CookieConsent;
