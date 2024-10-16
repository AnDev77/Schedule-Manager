import Header from '@/components/calendar/header';
import '@/styles/globals.css';

export const metadata = {
    title: '알림 | Schedule Manager',
    description: '일정 관리 프로젝트',
};

export default function AlertLayout({ children }) {
    return (
        <Header>
            {children}
        </Header>
    );
}
