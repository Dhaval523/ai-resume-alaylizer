import type { Route } from "./+types/home";
import Navabar from "~/components/navabar";
import ResumeCard from "~/components/resumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const {auth ,kv} = usePuterStore();

  const[resume, setResume] = useState<Resume[]>([])
  const [loadingResumes , setLoadingResumes] = useState<boolean>(false)


  const navigate = useNavigate();

  useEffect(() => {
    if(!auth.isAuthenticated)navigate('/auth?next=/');
  },[auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes =async ()=>{
      setLoadingResumes(true)
      const resumes = (await kv.list('resume:*',true)) as KVItem[];
      const parsedResumes = resumes ?.map((resume)=>(

          JSON.parse(resume.value) as Resume

      ))
      console.log(parsedResumes);
      setResume(parsedResumes || [])
      setLoadingResumes(false)
    }
    loadResumes();
  }, []);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
     <Navabar/>
       <section className="main-section">
         <div className="page-heading py-16">
           <h1 className="text-2xl ">Track your Applications & Resume Ratings</h1>

           { !loadingResumes && resume.length === 0 ? (
               <h2>No resumes found.Upload your first resume to get feedback.</h2>
           ):(
               <h2>Review your submissions and check Ai-powered feedback.</h2>
           ) }
           {
             loadingResumes && (
                 <div className="flex flex-col items-center">
                    <img src='/images/resume-scan-2.gif'  className="w-[200px]"/>
                 </div>
               )
           }
           {
             !loadingResumes && (
                 <div className="flex flex-col items-center justify-center mt-10 gap-4">
                    <Link to='/upload' className="primary-button w-fit text-xl font-semibold ">
                       Upload Resume
                    </Link>

                 </div>
               )
           }

         </div>
        { !loadingResumes && resume.length > 0 && (
             <div className= "resumes-section">
               {resume.map((resume)=>(
                  <ResumeCard key={resume.id} resume = {resume}/>
               ))}
             </div>
        )}
       </section>

  </main>
}
