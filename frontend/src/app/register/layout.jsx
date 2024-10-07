import UserLayout from '@/components/layouts/user-layout';

export const metadata = {
    title: 'register | Schedule Manager'
}

export default function RegisterLayout({ children }) {
    return (
        <UserLayout>
            {children}
        </UserLayout>
    );
}