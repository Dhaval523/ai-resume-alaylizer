interface ProgressBarProps {
    value: number;
    max: number;
    color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, color }) => {
    const percentage = (value / max) * 100;

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
                className={`h-full rounded-full ${color}`}
                style={{ width: `${percentage}%` }}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
            >
                <span className="sr-only">{percentage}%</span>
            </div>
        </div>
    );
};

export default  ProgressBar;