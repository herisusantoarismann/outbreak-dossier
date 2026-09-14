import { ImageResponse } from "next/og";

export const size = {
    width: 180,
    height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#05070e",
                borderRadius: "36px",
                border: "3px solid #ef4444",
            }}
        >
            <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <polygon
                    points="12,2 21,7 21,17 12,22 3,17 3,7"
                    stroke="#06b6d4"
                    strokeWidth="1.5"
                    fill="none"
                />
                <circle
                    cx="12"
                    cy="12"
                    r="4.5"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                />
                <circle cx="12" cy="12" r="1.5" fill="#ef4444" />
                <line
                    x1="12"
                    y1="4"
                    x2="12"
                    y2="7.5"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                />
                <line
                    x1="12"
                    y1="16.5"
                    x2="12"
                    y2="20"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                />
                <line
                    x1="4"
                    y1="12"
                    x2="7.5"
                    y2="12"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                />
                <line
                    x1="16.5"
                    y1="12"
                    x2="20"
                    y2="12"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                />
            </svg>
        </div>,
        {
            ...size,
        },
    );
}
