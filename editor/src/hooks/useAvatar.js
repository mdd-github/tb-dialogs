import {useSelector} from "react-redux";
import {useMemo} from "react";

export const useAvatar = (id) => {
    const avatars = useSelector((state) => state.avatars.list);
    return useMemo(() => {
        return avatars.find((avatar) => avatar.id === id);
    }, [avatars, id]);
}