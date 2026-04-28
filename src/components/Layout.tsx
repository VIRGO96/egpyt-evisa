import { Footer } from "./ui/footer";
import { Header } from "./ui/header";
import CookieConsent from "react-cookie-consent";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />
{/* 
      <CookieConsent
        location="bottom"
        buttonText="Accept All"
        declineButtonText="Necessary Only"
        flipButtons
        enableDeclineButton
        cookieName="site_cookie_consent"
        style={{
          background: "white", // modal background
          color: "rgb(11 57 71 / var(--tw-text-opacity, 1))", // text color
          fontSize: "14px",
          padding: "0.5rem 1rem",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.15)",
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
        buttonStyle={{
          background: "black", // Accept All button background
          color: "white", // text color
          fontSize: "13px",
          borderRadius: "12px",
          padding: "6px 18px",
          marginTop: "0px",
          fontWeight: 500,
          cursor: "pointer",
        }}
        declineButtonStyle={{
          background: "white", // Necessary Only button background
          color: "black", // text color
          fontSize: "13px",
          borderRadius: "12px",
          padding: "6px 18px",
          border: "1px solid black",
          margin: "0px 7px",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        <span style={{ color: "rgb(11 57 71 / var(--tw-text-opacity, 1))" }}>
          We use cookies to enable site functionality, analytics, advertising,
          and personalization.
        </span>
        <a
          href="/privacy-policy"
          className="underline ml-1 hover:text-black"
          style={{
            color: "rgb(11 57 71 / var(--tw-text-opacity, 1))",
            fontWeight: 500,
          }}
        >
          Privacy Policy
        </a>
      </CookieConsent> */}
    </div>
  );
};
