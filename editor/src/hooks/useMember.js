import {useSelector} from "react-redux";
import {useMemo} from "react";

export const useMember = (id) => {
    const members = useSelector((state) => state.members.list);
    return useMemo(() => {
        return members.find((member) => member.id === id);
    }, [id, members]);
}