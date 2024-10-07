import UserLayout from '@/components/layouts/user-layout';

export const metadata = {
    title: 'Login | Schedule Manager'
}

export default function LoginLayout({ children }) {
    return (
        <UserLayout>
            {children}
        </UserLayout>
    );
}