import React, { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext();

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

export const ModalProvider = ({ children }) => {
    const [isNewEquipmentModalOpen, setIsNewEquipmentModalOpen] = useState(false);
    const [isNewWorkOrderModalOpen, setIsNewWorkOrderModalOpen] = useState(false);
    const [isNewInspectionModalOpen, setIsNewInspectionModalOpen] = useState(false);
    const [isNewPartModalOpen, setIsNewPartModalOpen] = useState(false);
    const [isNewPurchaseOrderModalOpen, setIsNewPurchaseOrderModalOpen] = useState(false);

    const openNewEquipmentModal = useCallback(() => {
        setIsNewEquipmentModalOpen(true);
    }, []);

    const closeNewEquipmentModal = useCallback(() => {
        setIsNewEquipmentModalOpen(false);
    }, []);

    const openNewWorkOrderModal = useCallback(() => {
        setIsNewWorkOrderModalOpen(true);
    }, []);

    const closeNewWorkOrderModal = useCallback(() => {
        setIsNewWorkOrderModalOpen(false);
    }, []);

    const openNewInspectionModal = useCallback(() => {
        setIsNewInspectionModalOpen(true);
    }, []);

    const closeNewInspectionModal = useCallback(() => {
        setIsNewInspectionModalOpen(false);
    }, []);

    const openNewPartModal = useCallback(() => {
        setIsNewPartModalOpen(true);
    }, []);

    const closeNewPartModal = useCallback(() => {
        setIsNewPartModalOpen(false);
    }, []);

    const openNewPurchaseOrderModal = useCallback(() => {
        setIsNewPurchaseOrderModalOpen(true);
    }, []);

    const closeNewPurchaseOrderModal = useCallback(() => {
        setIsNewPurchaseOrderModalOpen(false);
    }, []);

    const value = {
        isNewEquipmentModalOpen,
        openNewEquipmentModal,
        closeNewEquipmentModal,
        isNewWorkOrderModalOpen,
        openNewWorkOrderModal,
        closeNewWorkOrderModal,
        isNewInspectionModalOpen,
        openNewInspectionModal,
        closeNewInspectionModal,
        isNewPartModalOpen,
        openNewPartModal,
        closeNewPartModal,
        isNewPurchaseOrderModalOpen,
        openNewPurchaseOrderModal,
        closeNewPurchaseOrderModal,
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContext;


