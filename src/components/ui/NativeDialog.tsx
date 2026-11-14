"use client";

import React, { useCallback, useEffect, useRef } from "react";

let cachedDiscreteDisplaySupport: boolean | null = null;

function supportsTopLayerDiscreteTransition(): boolean {
  if (cachedDiscreteDisplaySupport !== null) return cachedDiscreteDisplaySupport;
  if (typeof document === "undefined" || !document.body) return false;

  const probe = document.createElement("div");
  probe.style.display = "block";
  probe.style.transition = "display 0.1s allow-discrete";
  document.body.appendChild(probe);
  probe.getBoundingClientRect();
  probe.style.display = "none";
  cachedDiscreteDisplaySupport = getComputedStyle(probe).display !== "none";
  probe.remove();
  return cachedDiscreteDisplaySupport;
}

function isEventOutsideDialogBox(dialog: HTMLDialogElement, e: PointerEvent): boolean {
  if (e.target !== dialog) return false;
  if (e.clientX === 0 && e.clientY === 0) return false;
  const rect = dialog.getBoundingClientRect();
  return (
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom
  );
}

export interface NativeDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  dismissible?: boolean;
}

/**
 * Fenêtre modale accessible basée sur `<dialog>` natif (`showModal()` + top-layer + `closedby="any"`),
 * avec verrouillage natif du scroll via `dialog::backdrop` et repli JS de fermeture discrète.
 */
export function NativeDialog({
  open,
  onClose,
  children,
  ariaLabel,
  ariaLabelledBy,
  className = "",
  dismissible = true,
}: NativeDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const onCloseRef = useRef(onClose);
  const pointerDownOutsideRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);

  onCloseRef.current = onClose;

  const clearClosingTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const performCloseWithFallback = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open) return;

    clearClosingTimer();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || supportsTopLayerDiscreteTransition()) {
      dialog.removeAttribute("data-closing");
      dialog.close();
      return;
    }

    dialog.setAttribute("data-closing", "");
    const finish = () => {
      clearClosingTimer();
      dialog.removeEventListener("transitionend", onTransitionEnd);
      dialog.removeAttribute("data-closing");
      if (dialog.open) dialog.close();
    };
    const onTransitionEnd = (ev: TransitionEvent) => {
      if (ev.target === dialog) finish();
    };
    dialog.addEventListener("transitionend", onTransitionEnd);
    closeTimerRef.current = window.setTimeout(finish, 240);
  }, [clearClosingTimer]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.setAttribute("closedby", dismissible ? "any" : "closerequest");
  }, [dismissible]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      clearClosingTimer();
      dialog.removeAttribute("data-closing");
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      performCloseWithFallback();
    }
  }, [open, clearClosingTimer, performCloseWithFallback]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      clearClosingTimer();
      dialog.removeAttribute("data-closing");
      onCloseRef.current();
    };

    const handleCancel = (e: Event) => {
      if (!dismissible) {
        e.preventDefault();
      }
    };

    // Repli light-dismiss pour les navigateurs sans support natif de `closedby="any"` :
    // exige que l'appui ET le relâchement aient lieu en dehors du panneau (drag de sélection texte sûr).
    const supportsClosedBy = "closedBy" in HTMLDialogElement.prototype;

    const handlePointerDown = (e: PointerEvent) => {
      pointerDownOutsideRef.current = isEventOutsideDialogBox(dialog, e);
    };

    const handlePointerUp = (e: PointerEvent) => {
      const wasOutside = pointerDownOutsideRef.current;
      pointerDownOutsideRef.current = false;
      if (!supportsClosedBy && dismissible && wasOutside && isEventOutsideDialogBox(dialog, e)) {
        onCloseRef.current();
      }
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("pointerdown", handlePointerDown);
    dialog.addEventListener("pointerup", handlePointerUp);

    return () => {
      clearClosingTimer();
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("pointerdown", handlePointerDown);
      dialog.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dismissible, clearClosingTimer]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={`hl-native-dialog ${className}`.trim()}
    >
      {children}
    </dialog>
  );
}

export default NativeDialog;
