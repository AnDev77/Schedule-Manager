import UserLayout from '@/components/layouts/user-layout';

export const metadata = {
    title: 'register | Schedule Manager'
}

export default function LoginLayout({ children }) {
    return (
        <UserLayout>
            {children}
        </UserLayout>
    );
}