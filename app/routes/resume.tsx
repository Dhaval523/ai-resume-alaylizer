import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Link, useNavigate} from "react-router";
import {usePuterStore} from "~/lib/puter";
import type {Route} from "../../.react-router/types/app/routes/+types/home";
import Summary from "~/components/summary";
import Details from "~/components/Details";
import ATS from "~/components/ATS";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Resumind | Review " },
        { name: "description", content: "Detailed overview of your resume" },
    ];
}

function Resume() {
    const {auth, isLoading, kv, fs} = usePuterStore();
    const {id} = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading, auth.isAuthenticated]);

    useEffect(() => {
        const loadResume = async () => {
            try {
                setLoading(true);
                const resume = await kv.get(`resume:${id}`);
                if(!resume) return;

                const data = JSON.parse(resume);
                const resumeBlob = await fs.read(data.resumePath);
                const imageBlob = await fs.read(data.imagePath);

                if(resumeBlob) {
                    const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
                    setResumeUrl(URL.createObjectURL(pdfBlob));
                }

                if(imageBlob) {
                    setImageUrl(URL.createObjectURL(imageBlob));
                }

                setFeedback(data.feedback);
            } catch (error) {
                console.error("Error loading resume:", error);
            } finally {
                setLoading(false);
            }
        }

        loadResume();
    }, [id]);

    return (
        <main className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <Link to='/' className="inline-flex items-center text-gray-700 hover:text-gray-900">
                        <img src="/icons/back.svg" alt="Back" className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Back to Homepage</span>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Resume Preview */}
                    <div className="lg:w-2/5">
                        <div className="sticky top-24 rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Preview</h2>
                            {loading ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                </div>
                            ) : imageUrl ? (
                                <a
                                    href={resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block overflow-hidden rounded-lg"
                                >
                                    <img
                                        src={imageUrl}
                                        alt="Resume preview"
                                        className="w-full h-auto object-contain max-h-[70vh]"
                                    />
                                </a>
                            ) : (
                                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                                    <span className="text-gray-500">No preview available</span>
                                </div>
                            )}
                            <div className="mt-4 text-center">
                                <a
                                    href={resumeUrl}
                                    target="_blank"
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    View Full PDF
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Feedback */}
                    <div className="lg:w-3/5">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Resume Review</h1>
                            <p className="text-gray-600 mb-6">Detailed analysis of your resume</p>

                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                                </div>
                            ) : feedback ? (
                                <div className="space-y-8">
                                    <Summary feedback={feedback}/>
                                    <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                    <Details feedback={feedback}/>
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">No feedback available</h3>
                                    <p className="mt-1 text-gray-500">We couldn't find any feedback for this resume.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Resume;