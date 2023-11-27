import { Container } from "@/components/Container";
import { FormWrap } from "@/components/Login/FormWrap";
import { RegisterForm } from "@/components/Login/RegisterForm";
import { Toaster } from "react-hot-toast";

export default function Register() {
  return (
    <Container>
      <FormWrap>
        <RegisterForm />
      </FormWrap>
    </Container>
  )
}
