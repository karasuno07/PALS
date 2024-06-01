import RegisterForm from '@/components/RegisterForm';
import { AbsoluteCenter, Card, CardBody, CardHeader } from '@chakra-ui/react';
import Image from 'next/image';

export default function Register() {
  return (
    <AbsoluteCenter>
      <Card>
        <CardHeader display='flex' justifyContent='center' paddingBottom={0}>
          <Image src='/images/logo.png' alt='PALS' width={200} height={50} />
        </CardHeader>
        <CardBody>
          <RegisterForm />
        </CardBody>
      </Card>
    </AbsoluteCenter>
  );
}
