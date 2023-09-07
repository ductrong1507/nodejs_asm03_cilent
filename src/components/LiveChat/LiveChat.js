import React, { useState } from "react";
import styles from "./LiveChat.module.css";

export default function LiveChat() {
  const [isShowChat, setIsShowChat] = useState(false);

  // Xử lý đóng mở khi click icon chat
  const clickChatHandle = () => {
    setIsShowChat((prevState) => !prevState);
  };

  return (
    <>
      <div onClick={clickChatHandle} className={styles.chat_icon}>
        <i className="fa-solid fa-headset" />
      </div>
      <section
        style={{ display: isShowChat ? "block" : "none" }}
        id={styles.live_chat}
      >
        {/* Phần header pop up chat */}
        <header className={styles.live_chat_header}>
          <h3>Customer Support</h3>
          <button>Let's Chat App</button>
        </header>

        {/* Phần nội dung pop up chat */}
        <div className={styles.live_chat_content}>
          {/* Phần người dùng chat */}
          <div className={styles.live_chat_content_customer}>
            <p>Xin chào!</p>
          </div>
          <div className={styles.live_chat_content_customer}>
            <p>Làm thế nào để xem các sản phẩm</p>
          </div>

          {/* Phần người nhân viên chat */}
          <div className={styles.live_chat_content_bot}>
            <img
              alt="Avatar"
              src="https://robohash.org/a620d889aac6b1d2177a4c7f289357c3?set=set1&bgset=bg2&size=200x200"
            />
            <p>ADMIN. Chào bạn</p>
          </div>
          <div className={styles.live_chat_content_bot}>
            <img
              alt="Avatar"
              src="https://robohash.org/a620d889aac6b1d2177a4c7f289357c3?set=set1&bgset=bg2&size=200x200"
            />
            <p>ADMIN. Bạn có thể vào mục Shop để xem các sản phẩm</p>
          </div>
        </div>

        {/* Phần footer pop up chat */}
        <footer className={styles.live_chat_footer}>
          <div className={styles.live_chat_avatar}>
            <img
              alt="Avatar"
              src="https://robohash.org/a620d889aac6b1d2177a4c7f289357c3?set=set1&bgset=bg2&size=200x200"
            />
          </div>
          <div className={styles.form_group}>
            <input
              type="text"
              placeholder="Enter Message!"
              className={styles.form_control}
            />
          </div>
          <div className={styles.live_chat_btn}>
            <button>
              <i className="fa-solid fa-paperclip" />
            </button>
            <button>
              <i className="fa-solid fa-face-smile" />
            </button>
            <button className={styles.live_chat_btn_send}>
              <i className="fa-solid fa-paper-plane" />
            </button>
          </div>
        </footer>
      </section>
    </>
  );
}
