import {actions} from "../store";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";


export const useOpenDialog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const open = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.addEventListener('input', function onChange(e){
            const reader = new FileReader();
            reader.readAsText(fileInput.files[0]);

            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);

                    if(data.avatars == null || !Array.isArray(data.avatars) || data.avatars.length === 0) {
                        throw new Error('В файле отсутствуют аватары');
                    }

                    if(data.members == null || !Array.isArray(data.members)) {
                        throw new Error('В файле отсутствуют участники чата');
                    }

                    if(data.messages == null || !Array.isArray(data.messages)) {
                        throw new Error('В файле отсутствуют участники чата');
                    }

                    dispatch(actions.avatars.set(data.avatars));
                    dispatch(actions.members.set(data.members));
                    dispatch(actions.messages.set(data.messages));

                    navigate("/members");
                } catch (e) {

                } finally {
                    fileInput.removeEventListener('input', onChange);
                    fileInput.remove();
                }
            }
        });

        fileInput.click();
    };

    return {
        open
    }
}