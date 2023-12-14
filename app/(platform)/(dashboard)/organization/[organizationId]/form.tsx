import { createBoard } from "@/actions/create-board";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";

export const Form = () => {
    const { execute, fieldErrors } = useAction(createBoard);
    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        execute({ title });
    };
    return (
        <form>
            <div className="flex flex-col space-y-2">
                <FormInput id="title" errors={fieldErrors} />
                <FormSubmit>Save</FormSubmit>
            </div>
        </form>
    );
};
