import { useState } from "react"
import { Button } from "./ui/button"


type Props = {
    action: () => void
    actionName: string
    options: { A: string, B: string }
    item: string
}

export default function ConfirmBtn({ action, actionName, options, item }: Props) {

    const [isConfirming, setIsConfirming] = useState(false)

    const handleInitialClick = () => {
        setIsConfirming(true)
    }

    const handleCancel = () => {
        setIsConfirming(false)
    }

    const handleConfirm = () => {
        setIsConfirming(false)
        action()
    }

    if (isConfirming) {
        return (
            <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#333' }}>
                    Are you sure you want to delete {item}?
                </span>
                <button
                    onClick={handleConfirm}
                    style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                >
                    {options.A}
                </button>
                <button
                    onClick={handleCancel}
                    style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                >
                    {options.B}
                </button>
            </div>
        )
    }

    return (
        <Button
            onClick={handleInitialClick}
            style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
        >
            {actionName}
        </Button>
    )

}
