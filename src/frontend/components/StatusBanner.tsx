import React, { useState, useEffect } from 'react'
import '../public/StatusBanner.css'

// TODO
// Implement the StatusBannerProps interface.
interface StatusBannerProps {}

const StatusBanner: React.FC<StatusBannerProps> = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true)

    //TODO
    // If there is a message to be shown, display it for 5 seconds and then close the banner.
    useEffect(() => {}, [])

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

export default StatusBanner
