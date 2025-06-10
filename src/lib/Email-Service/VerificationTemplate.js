import React from "react";

export default function VerificationCodeEmail({ name, verificationCode }) {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333", padding: "20px", maxWidth: "600px", margin: "auto", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2 style={{ color: "#0070f3" }}>Hello, {name}!</h2>
      <p>Thank you for signing up. Please use the verification code below to verify your email address:</p>
      <p style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "4px", margin: "20px 0", textAlign: "center", backgroundColor: "#f0f0f0", padding: "15px", borderRadius: "6px" }}>
        {verificationCode}
      </p>
      <p>If you did not request this code, please ignore this email.</p>
      <p>Best regards,<br />Protees</p>
    </div>
  );
}