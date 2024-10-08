import UserLayout from '@/components/layouts/user-layout';

export const metadata = {
    title: '찾기 | Schedule Manager'
}

export default function FindLayout({ children }) {
    return (
        <UserLayout>
            {children}
        </UserLayout>
    );
}