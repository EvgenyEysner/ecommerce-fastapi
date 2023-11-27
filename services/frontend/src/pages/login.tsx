import { Container } from "@/components/Container"
import { FormWrap } from "@/components/Login/FormWrap"
import { LoginForm } from "@/components/Login/LoginForm"

export default function Login() {
  return (
    <Container>
      <FormWrap>
        <LoginForm />
      </FormWrap>
    </Container>
  )
}
