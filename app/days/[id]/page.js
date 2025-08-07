'use client';
import { useParams } from 'next/navigation';
import DaysPage from '../../components/days';

export default function Profile() {
    const params = useParams();
    const id = params?.id;
    return <DaysPage days={id} />;
}
