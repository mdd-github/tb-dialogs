import {useSelector} from "react-redux";


export const useSaveDialog = () => {
    const messages = useSelector((state) => state.messages.list);
    const avatars = useSelector((state) => state.avatars.list);
    const members = useSelector((state) => state.members.list);

    const save = () => {
        const href = 'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify({
                messages,
                avatars,
                members
            }));

        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'dialog.json');
        downloadLink.setAttribute('href', href);

        downloadLink.click();
        downloadLink.remove();
    }

    return {
        save
    };
}