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

    const openNewEquipmentModal = useCallback(() => {
        setIsNewEquipmentModalOpen(true);
    }, []);

    const closeNewEquipmentModal = useCallback(() => {
        setIsNewEquipmentModalOpen(false);
    }, []);

    const value = {
        isNewEquipmentModalOpen,
        openNewEquipmentModal,
        closeNewEquipmentModal,
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContext;
