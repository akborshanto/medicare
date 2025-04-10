
import { getServerSession } from "next-auth";
import { Navbar } from "../components/shared/navbar";
import { Footer } from './../components/shared/footer';
import { authOptions } from "@/utils/authOptions";

const CommonLayout=async ({children}:{children:React.ReactNode})=>{
    const session=await getServerSession(authOptions)
    return <>
        <Navbar session={session }/>
     <main className="min-h-screen ">

     {children}
     </main>
        <Footer></Footer>
        </>
}
export default CommonLayout;