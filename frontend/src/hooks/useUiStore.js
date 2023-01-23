import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal, onUpdateNow, onOpenSuccess, onClosePedido, onOpenPedido, onCloseSuccess, onOpenRuta, onCloseRuta, onTotal } from '../store';


export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isDateModalOpen
    } = useSelector(state => state.ui);

    const {
        isRutaOpen
    } = useSelector(state => state.ui);

    const {
        isSuccessOpen
    } = useSelector(state => state.ui);

    const {
        isNow
    } = useSelector(state => state.ui);

    const {
        isPedidoOpen
    } = useSelector(state => state.ui);

    const {
        total
    } = useSelector(state => state.ui);

    const saveTotal = (Total) => {
        dispatch(onTotal(Total))
    }

    const openRutaModal = () => {
        dispatch(onOpenRuta())
    }

    const closeRutaModal = () => {
        dispatch(onCloseRuta())
    }

    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }

    const openPedidoModal = () => {
        dispatch(onOpenPedido())
    }

    const closePedidoModal = () => {
        dispatch(onClosePedido())
    }

    const OpenSuccess = () => {
        dispatch(onOpenSuccess())
    }

    const CloseSuccess = () => {
        dispatch(onCloseSuccess())
    }

    const updateNow = (data) => {
        dispatch(onUpdateNow(data))
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal();
    }



    return {
        //* Propiedades
        isDateModalOpen,
        isSuccessOpen,
        isNow,
        isPedidoOpen,
        isRutaOpen,
        total,

        //* Métodos
        closeDateModal,
        openDateModal,
        toggleDateModal,
        updateNow,
        OpenSuccess,
        CloseSuccess,
        openPedidoModal,
        closePedidoModal,
        openRutaModal,
        closeRutaModal,
        saveTotal
    }

}