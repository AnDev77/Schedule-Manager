import localFont from "next/font/local";
import { paperlogy, uhBeeZziba } from "@/fonts";
import "@/styles/globals.css";

export const metadata = {
    title: "Managers",
    description: "일정 관리 프로젝트",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <body className={`${paperlogy.variable} ${uhBeeZziba.variable}`}>
                {children}
            </body>
        </html>
    );
}
