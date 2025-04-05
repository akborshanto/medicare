
import { Navbar } from "../components/shared/navbar";
import { Footer } from './../components/shared/footer';

const CommonLayout=({children}:{children:React.ReactNode})=>{

    return <>
        <Navbar></Navbar>
     <main className="min-h-screen ">

     {children}
     </main>
        <Footer></Footer>
        </>
}
export default CommonLayout;