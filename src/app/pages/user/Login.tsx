"use client";

import { useState, useTransition } from "react";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  finishPasskeyLogin,
  finishPasskeyRegistration,
  startPasskeyLogin,
  startPasskeyRegistration,
} from "./functions";

export function Login() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();

  const passkeyLogin = async () => {
    // 1. Get a challenge from the worker
    const options = await startPasskeyLogin();

    // 2. Ask the browser to sign the challenge
    const login = await startAuthentication({ optionsJSON: options });

    // 3. Give the signed challenge to the worker to finish the login process
    const success = await finishPasskeyLogin(login);

    if (!success) {
      setResult("Login failed");
    } else {
      setResult("Login successful!");
      // Redirect to dashboard after successful login
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  };

  const passkeyRegister = async () => {
    // 1. Get a challenge from the worker
    const options = await startPasskeyRegistration(username);

    // 2. Ask the browser to sign the challenge
    const registration = await startRegistration({ optionsJSON: options });

    // 3. Give the signed challenge to the worker to finish the registration process
    const success = await finishPasskeyRegistration(username, registration);

    if (!success) {
      setResult("Registration failed");
    } else {
      setResult("Registration successful!");
      // Redirect to dashboard after successful registration
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  };

  const handlePerformPasskeyLogin = () => {
    startTransition(() => void passkeyLogin());
  };

  const handlePerformPasskeyRegister = () => {
    startTransition(() => void passkeyRegister());
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "32px",
          color: "#1a1a1a",
        }}
      >
        Welcome Back
      </h1>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "32px",
          borderRadius: "12px",
          border: "1px solid #e5e5e5",
          marginBottom: "24px",
        }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: "1rem",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            marginBottom: "24px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            onClick={handlePerformPasskeyLogin}
            disabled={isPending}
            style={{
              width: "100%",
              padding: "12px 24px",
              fontSize: "1rem",
              fontWeight: "600",
              color: "#fff",
              backgroundColor: isPending ? "#9ca3af" : "#0066cc",
              border: "none",
              borderRadius: "8px",
              cursor: isPending ? "not-allowed" : "pointer",
            }}
          >
            {isPending ? "Authenticating..." : "Login with Passkey"}
          </button>

          <button
            onClick={handlePerformPasskeyRegister}
            disabled={isPending || !username.trim()}
            style={{
              width: "100%",
              padding: "12px 24px",
              fontSize: "1rem",
              fontWeight: "600",
              color: "#0066cc",
              backgroundColor: "transparent",
              border: "2px solid #0066cc",
              borderRadius: "8px",
              cursor:
                isPending || !username.trim() ? "not-allowed" : "pointer",
              opacity: isPending || !username.trim() ? 0.5 : 1,
            }}
          >
            {isPending ? "Creating Account..." : "Create Account"}
          </button>
        </div>

        {result && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "6px",
              backgroundColor: result.includes("successful")
                ? "#dcfce7"
                : "#fef2f2",
              color: result.includes("successful") ? "#166534" : "#dc2626",
              fontSize: "0.875rem",
            }}
          >
            {result}
          </div>
        )}
      </div>

      <p style={{ color: "#666", fontSize: "0.875rem", lineHeight: "1.5" }}>
        Use your device's biometric authentication or security key to log in
        securely. New users can create an account by entering a username and
        clicking "Create Account".
      </p>
    </div>
  );
}
