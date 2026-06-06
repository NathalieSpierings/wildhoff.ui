import { UseMutationResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToastr } from "../components/Providers/ToastrContext";

export interface ErrorProps {
    message: string | ((err: any) => string);
    mutation: UseMutationResult<any, any, any>;
}

export const useMutationError = ({ message, mutation }: ErrorProps) => {
    const { enqueue } = useToastr();

    useEffect(() => {
        if (mutation.isError) {
            enqueue({ message: typeof (message) == "string" ? message : message(mutation.error), variant: "negative" });
            mutation.reset();
        }
    }, [mutation.isError]);
};


export class NotFoundError extends Error {
    constructor(message = "Geen gegevens gevonden!") {
        super(message);
        this.name = "NotFoundError";
    }
}