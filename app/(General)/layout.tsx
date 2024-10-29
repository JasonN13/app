import Home from "../page";
import Navbar from "../Componentes/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function GeneralLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>
    <main>
   
     <Navbar></Navbar>




      {children}


    </main>
    </>
  );
}