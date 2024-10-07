import UserLayout from '@/components/layouts/user-layout';

export const metadata = {
    title: 'findUser | Schedule Manager'
}

export default function FindLayout({ children }) {
    return (
        <UserLayout>
            {children}
        </UserLayout>
    );
}