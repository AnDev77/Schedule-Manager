import UserLayout from '@/components/layouts/user-layout';

export const metadata = {
    title: '로그인 | Schedule Manager'
}

export default function LoginLayout({ children }) {
    return (
        <UserLayout>
            {children}
        </UserLayout>
    );
}