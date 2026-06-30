import { memo, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaQrcode, FaTimes } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  const [open, setOpen] = useState(false);
  const url = window.location.href;

  return (
    <footer className={styles.footer}>
      <p>Made with ❤️ only for Dinara.</p>
      <button className={styles.qrButton} type="button" onClick={() => setOpen(true)} aria-label="Open QR code">
        <FaQrcode />
      </button>
      {open && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Website QR code">
          <div className={styles.dialog}>
            <button className={styles.close} type="button" onClick={() => setOpen(false)} aria-label="Close QR code">
              <FaTimes />
            </button>
            <QRCodeCanvas value={url} size={220} fgColor="#34111d" bgColor="#fff8f0" includeMargin />
            <p>Scan to open this page</p>
          </div>
        </div>
      )}
    </footer>
  );
}

export default memo(Footer);
