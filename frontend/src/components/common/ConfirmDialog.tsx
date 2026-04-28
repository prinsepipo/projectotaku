import { useEffect } from "react";
import ReactDOM from "react-dom";
import { AlertTriangle } from "lucide-react";
import Button from "./Button";
import "./ConfirmDialog.css";

interface IProps {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  title,
  message,
  confirmLabel = "Remove",
  onConfirm,
  onCancel,
}: IProps) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return ReactDOM.createPortal(
    <div
      className="confirm-dialog-overlay"
      onMouseDown={onCancel}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div
        className="confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-desc"
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="confirm-dialog__icon">
          <AlertTriangle size={20} />
        </div>

        <h6 id="confirm-dialog-title" className="confirm-dialog__title">
          {title}
        </h6>
        <p id="confirm-dialog-desc" className="confirm-dialog__message">
          {message}
        </p>

        <div className="confirm-dialog__actions">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ConfirmDialog;
