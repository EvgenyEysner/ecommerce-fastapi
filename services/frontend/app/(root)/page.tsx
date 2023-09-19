import {Container} from "@/app/Container";
import {HomeBanner} from "@/app/components/banner/HomeBanner";

export default function Home() {
  return (
    <div className='p-8'>
      <Container>
        <div>
          <HomeBanner/>
        </div>
      </Container>
    </div>
  )
}
