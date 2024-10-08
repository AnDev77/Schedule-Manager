import UserLayout from '@/components/layouts/user-layout';

export const metadata = {
    title: '회원가입 | Schedule Manager'
}

export default function RegisterLayout({ children }) {
    return (
        <UserLayout>
            {children}
        </UserLayout>
    );
}