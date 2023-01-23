import { serviceMaruplas } from "../Apis";
import { useDispatch} from "react-redux"
import { onUser, clearStateMessage } from "../store";

export const useUsers = () => {

    const dispatch = useDispatch();

    const getUser = async () => {
        try {
            const { data } = await serviceMaruplas.get('/auth');
            console.log(data)
            dispatch(onUser(data.usuario));

        } catch (error) {
            dispatch(clearStateMessage())
            console.log(error)
        }
    }


    return {

        //metodos
        getUser
    }
}