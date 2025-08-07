import React from 'react';
import ProgressBar from './ProgressBar';
import {
    CheckCircle,
    AlertCircle,
    Check,
    AlertTriangle,
    Link as LinkIcon,
    XCircle,
    CircleCheck,
    CircleAlert,
    CircleX
} from 'lucide-react';

interface Suggestion {
    type: "good" | "improve";
    tip: string;
}

interface ATSProps {
    score: number;
    suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
    // Determine score category
    const scoreCategory = score > 69
        ? 'good'
        : score > 49
            ? 'medium'
            : 'poor';

    // Determine colors based on score
    const colors = {
        good: {
            bg: 'bg-green-50',
            text: 'text-green-800',
            iconColor: 'text-green-500',
            progress: 'bg-green-500',
            suggestionBg: 'bg-green-100',
            border: 'border-green-200'
        },
        medium: {
            bg: 'bg-amber-50',
            text: 'text-amber-800',
            iconColor: 'text-amber-500',
            progress: 'bg-amber-500',
            suggestionBg: 'bg-amber-100',
            border: 'border-amber-200'
        },
        poor: {
            bg: 'bg-red-50',
            text: 'text-red-800',
            iconColor: 'text-red-500',
            progress: 'bg-red-500',
            suggestionBg: 'bg-red-100',
            border: 'border-red-200'
        }
    }[scoreCategory];

    // Determine subtitle based on score
    const subtitle = score > 69
        ? 'Excellent ATS compatibility'
        : score > 49
            ? 'Moderate ATS compatibility'
            : 'Low ATS compatibility';

    // Split suggestions into good and improvement lists
    const goodSuggestions = suggestions.filter(s => s.type === "good");
    const improveSuggestions = suggestions.filter(s => s.type === "improve");

    return (
        <div className={`${colors.bg} ${colors.border} rounded-2xl border w-full p-6 shadow-sm`}>
            {/* Score header with icon */}
            <div className="flex items-center gap-4 mb-6">
                <div className={`p-2 rounded-lg ${colors.suggestionBg}`}>
                    {scoreCategory === 'good' && <CircleCheck className={`w-8 h-8 ${colors.iconColor}`} />}
                    {scoreCategory === 'medium' && <CircleAlert className={`w-8 h-8 ${colors.iconColor}`} />}
                    {scoreCategory === 'poor' && <CircleX className={`w-8 h-8 ${colors.iconColor}`} />}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">ATS Compatibility Score</h2>
                    <p className="text-gray-600">{subtitle}</p>
                </div>
            </div>

            {/* Score visualization */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className={`text-lg font-semibold ${colors.text}`}>{score}/100</span>
                    <span className="text-sm text-gray-500">Applicant Tracking Systems</span>
                </div>
                <ProgressBar value={score} max={100} color={colors.progress} />
            </div>

            {/* Description */}
            <div className="mb-6">
                <p className="text-gray-700">
                    This score represents how well your resume performs in automated tracking systems used by employers.
                    Higher scores increase your chances of being seen by hiring managers.
                </p>
            </div>

            {/* Suggestions sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Good suggestions */}
                {goodSuggestions.length > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow-xs border border-green-100">
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <h3 className="font-semibold text-green-700">Strengths</h3>
                        </div>
                        <ul className="space-y-2">
                            {goodSuggestions.map((suggestion, index) => (
                                <li key={`good-${index}`} className="flex items-start gap-2">
                                    <Check className="w-4 h-4 mt-1 text-green-500 flex-shrink-0" />
                                    <span className="text-green-700">{suggestion.tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Improvement suggestions */}
                {improveSuggestions.length > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow-xs border border-amber-100">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                            <h3 className="font-semibold text-amber-700">Areas to Improve</h3>
                        </div>
                        <ul className="space-y-2">
                            {improveSuggestions.map((suggestion, index) => (
                                <li key={`improve-${index}`} className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 mt-1 text-amber-500 flex-shrink-0" />
                                    <span className="text-amber-700">{suggestion.tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Resources section */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Resources to improve your score</h3>
                <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                        <LinkIcon className="w-4 h-4 text-current" />
                        <a href="#" className="hover:underline">ATS Optimization Guide</a>
                    </li>
                    <li className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                        <LinkIcon className="w-4 h-4 text-current" />
                        <a href="#" className="hover:underline">Keyword Research Tool</a>
                    </li>
                    <li className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                        <LinkIcon className="w-4 h-4 text-current" />
                        <a href="#" className="hover:underline">Resume Template Gallery</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ATS;