import React, { useState, useEffect } from 'react'
import '../public/StatusBanner.css'

// TODO
// Implement the StatusBannerProps interface.
interface StatusBannerProps {
    message: string;
    onClose: () => void;
}

const StatusBanner: React.FC<StatusBannerProps> = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true)

    //TODO
    // If there is a message to be shown, display it for 5 seconds and then close the banner.
    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    return (
        <>
            {!isVisible && <></>}
            {isVisible && (
                <div className="status-banner">
                    <p>{message}</p>
                    <button
                        onClick={() => {
                            setIsVisible(false)
                            onClose()
                        }}
                    >
                        ×
                    </button>
                </div>
            )}
        </>
    )
}

export default StatusBanner;
