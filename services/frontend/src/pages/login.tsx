import { Container } from "@/components/Container"
import { FormWrap } from "@/components/Login/FormWrap"
import { LoginForm } from "@/components/Login/LoginForm"
import { AppStore } from "@/store/store";
import { NextPage } from "next";
import { connect } from "react-redux";

const Login: NextPage<AppStore> = () => {
  return (
    <Container>
      <FormWrap>
        <LoginForm />
      </FormWrap>
    </Container>
  )
}

export default Login