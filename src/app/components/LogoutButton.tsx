"use client";

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await fetch("/user/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "12px 24px",
        fontSize: "1rem",
        fontWeight: "600",
        color: "#dc2626",
        backgroundColor: "transparent",
        border: "2px solid #dc2626",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}