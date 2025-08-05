import React, {useEffect} from 'react';
import {useParams} from "react-router";
import {Link} from "react-router";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import type {Route} from "../../.react-router/types/app/routes/+types/home";
import Summary from "~/components/summary";
import Accept from "react-dropzone/typings/tests/accept";
import ATS from "~/components/ATS";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Resumind | Review " },
        { name: "description", content: "Detailed overview of your resume" },
    ];
}
function Resume() {
    const {auth ,isLoading ,kv, fs , } = usePuterStore();
    const {id} = useParams();
     const [imageUrl, setImageUrl] = React.useState('');
    const [resumeUrl ,setResumeUrl] = React.useState('');
    const [feedback, setFeedback] = React.useState<Feedback | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated)navigate(`/auth?next=/resume/${id}`);
    },[isLoading]);

    useEffect(() => {
        const loadResume = async ()=>{
            const resume = await kv.get(`resume:${id}`)
            if(!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath)
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const  imageBlog = await  fs.read(data.imagePath)
            if(!imageBlog) return;
            const imageUrl = URL.createObjectURL(imageBlog);
            setImageUrl(imageUrl);
            setFeedback(data.feedback);
            console.log(resumeUrl , imageUrl ,data.feedback);
        }

        loadResume();
    }, [id]);
    return (
       <main className="!pt-0">
           <nav className="resume-nav">
               <Link to='/' className="back-button" >
                   <img src="/icons/back.svg" alt="Back" className="w-2.5 h-2.5" />
                   <span className="text-gray-950 text-sm font-semibold">Back to Homepage</span>
               </Link>
           </nav>
           <div className="flex flex-row w-full max-lg:flex-col-reverse">
               <section className="feedback-section bg-[url('images/bg-small.svg')] bg-cover h-[1000vh] sticky top-0 items-center justify-center">
                   { imageUrl && resumeUrl && (
                       <div className = "animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                           <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                               <img
                                 src={imageUrl}
                                 className="w-full h-full  object-contain rounded-full"
                                 title = "resume"
                               />
                           </a>
                       </div>
                   ) }

               </section>
               <section className="feedback-section">
                   <h2 className="tex-4xl !text-black font-bold">Resume Review</h2>
                   {feedback ?(
                       <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                          <Summary feedback={feedback}/>
                           <ATS score ={feedback.ATS.score || 0} suggestions = {feedback.ATS.tips || []} />
                           <Details feedback={feedback}/>
                       </div>
                   ):(
                       <div>

                       </div>
                   )}
               </section>
           </div>

       </main>
    );
}

export default Resume;