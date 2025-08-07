import React from 'react';
import ScoreGauge from './ScoreGauge';
import ScoreBadge from "~/components/ScoreBadge";
import {
    PenLine,
    FileText,
    LayoutTemplate,
    BarChart3,
    Circle,
    AlertCircle,
    CheckCircle
} from 'lucide-react';

// Define Feedback type if not already defined
type Feedback = {
    overallScore: number;
    toneAndStyle: { score: number };
    content: { score: number };
    structure: { score: number };
    skills: { score: number };
};

function Summary({feedback}: {feedback: Feedback}) {
    // Category card component
    const Category = ({title, score}: {title: string, score: number}) => {
        // Determine color based on score
        const bgColor = score > 70 ? 'bg-green-50'
            : score > 49 ? 'bg-amber-50'
                : 'bg-red-50';

        const borderColor = score > 70 ? 'border-green-200'
            : score > 49 ? 'border-amber-200'
                : 'border-red-200';

        const textColor = score > 70 ? 'text-green-700'
            : score > 49 ? 'text-amber-700'
                : 'text-red-700';

        // Get appropriate icon based on category
        const getIcon = () => {
            switch(title.toLowerCase()) {
                case 'tone & style': return <PenLine className={`w-5 h-5 ${textColor}`} />;
                case 'content quality': return <FileText className={`w-5 h-5 ${textColor}`} />;
                case 'structure': return <LayoutTemplate className={`w-5 h-5 ${textColor}`} />;
                case 'skills': return <BarChart3 className={`w-5 h-5 ${textColor}`} />;
                default: return <FileText className={`w-5 h-5 ${textColor}`} />;
            }
        };

        return (
            <div className={`p-4 rounded-xl border ${borderColor} ${bgColor} transition-all hover:shadow-sm`}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${bgColor}`}>
                            {getIcon()}
                        </div>
                        <h3 className="text-sm font-medium text-gray-700 capitalize">{title}</h3>
                    </div>
                    <ScoreBadge score={score} />
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-gray-500">Score</div>
                    <div className={`text-sm font-semibold ${textColor}`}>
                        {score}/100
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header Section */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <ScoreGauge score={feedback.overallScore} />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Resume Summary
                        </h2>
                        <p className="mt-2 text-gray-600 max-w-prose">
                            Your resume has been analyzed across key dimensions.
                            Scores reflect how well each section meets industry standards.
                        </p>

                        <div className="mt-4 inline-flex items-center px-4 py-2 bg-white rounded-full shadow-xs border border-gray-200">
              <span className="text-sm font-medium text-gray-700">
                Overall Score:
              </span>
                            <span className="ml-2 text-sm font-bold text-blue-600">
                {feedback.overallScore}/100
              </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <Category
                    title="Tone & Style"
                    score={feedback.toneAndStyle.score}
                />

                <Category
                    title="Content Quality"
                    score={feedback.content.score}
                />

                <Category
                    title="Structure"
                    score={feedback.structure.score}
                />

                <Category
                    title="Skills"
                    score={feedback.skills.score}
                />
            </div>

            {/* Legend */}
            <div className="px-6 pb-4 flex justify-center">
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                        <Circle className="w-3 h-3 fill-red-500 text-red-500" />
                        <span>Needs Work (0-49)</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Circle className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>Good (50-69)</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Circle className="w-3 h-3 fill-green-500 text-green-500" />
                        <span>Excellent (70-100)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Summary;