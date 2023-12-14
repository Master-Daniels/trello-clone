import { XCircleIcon } from "lucide-react";

interface FormErrosProps {
    id: string;
    errors?: Record<string, string[]> | undefined;
}
const FormErrors = ({ id, errors }: FormErrosProps) => {
    if (!errors) return null;
    return (
        <div id={`${id}-error`} aria-live="polite" className="mt-2 text-xs text-rose-500">
            {errors?.[id]?.map((error: string) => (
                <div
                    key={error}
                    className="flex -tems-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-md"
                >
                    <XCircleIcon className="h-4 w-4 mr-2" />
                    <p>{error}</p>
                </div>
            ))}
        </div>
    );
};

export { FormErrors };
