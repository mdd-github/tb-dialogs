import {useSelector} from "react-redux";
import {useMemo} from "react";

export const useMesage = (id) => {
    const messages = useSelector((state) => state.messages.list);
    return useMemo(() => {
        return messages.find((messages) => messages.id === id);
    }, [id, messages]);
}