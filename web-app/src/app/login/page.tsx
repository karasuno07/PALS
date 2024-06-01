import LoginForm from '@/components/LoginForm';
import { AbsoluteCenter, Card, CardBody, CardHeader } from '@chakra-ui/react';

export default function Login({}) {
  return (
    <AbsoluteCenter>
      <Card>
        <CardHeader>Login</CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </AbsoluteCenter>
  );
}
